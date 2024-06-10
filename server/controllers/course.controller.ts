import { NextFunction, Request, Response } from "express";
import { CatchAsyncError } from "../middleware/catchAsyncErrors";
import ErrorHandler from "../utils/ErrorHandler";
import cloudinary from "cloudinary";
import { createCourse, getAllCoursesService } from "../services/course.service";
import CourseModel from "../models/course.model";
import { redis } from "../utils/redis";
import mongoose from "mongoose";
import path from "path";
import ejs from "ejs";
import sendMail from "../utils/sendMail";
import NotificationModel from "../models/notification.Model";
import axios from "axios";

// upload course
export const uploadCourse = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = req.body;
    console.log(req.body);
    const thumbnail = data.thumbnail;
    if (thumbnail) {
      const myCloud = await cloudinary.v2.uploader.upload(thumbnail, {
        folder: "courses",
      });

      data.thumbnail = {
        public_id: myCloud.public_id,
        url: myCloud.secure_url,
      };
    }
    createCourse(data, res, next);
  } catch (error: any) {
    return next(new ErrorHandler(error.message, 500));
  }
});

// edit course
export const editCourse = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = req.body;

    const thumbnail = data.thumbnail;

    const courseId = req.params.id;

    const courseData = (await CourseModel.findById(courseId)) as any;

    if (thumbnail && !thumbnail.startsWith("https")) {
      await cloudinary.v2.uploader.destroy(courseData.thumbnail.public_id);

      const myCloud = await cloudinary.v2.uploader.upload(thumbnail, {
        folder: "courses",
      });

      data.thumbnail = {
        public_id: myCloud.public_id,
        url: myCloud.secure_url,
      };
    }

    if (thumbnail.startsWith("https")) {
      data.thumbnail = {
        public_id: courseData?.thumbnail.public_id,
        url: courseData?.thumbnail.url,
      };
    }

    const course = await CourseModel.findByIdAndUpdate(
      courseId,
      {
        $set: data,
      },
      {
        new: true,
      }
    );

    res.status(201).json({
      success: true,
      course,
    });
  } catch (error: any) {
    return next(new ErrorHandler(error.message, 500));
  }
});

// get single course without purchasing
export const getSingleCourse = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
  try {
    const courseId = req.params.id;

    const isCacheExist = await redis.get(courseId);

    if (isCacheExist) {
      const course = JSON.parse(isCacheExist);
      res.status(200).json({
        success: true,
        course,
      });
    } else {
      const course = await CourseModel.findById(req.params.id).select("-courseData.videoUrl -courseData.suggestion -courseData.questions -courseData.links");

      await redis.set(courseId, JSON.stringify(course), "EX", 6040800);

      res.status(200).json({
        success: true,
        course,
      });
    }
  } catch (error: any) {
    return next(new ErrorHandler(error.message, 500));
  }
});

// get all course without purchasing
export const getAllCourses = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
  try {
    const courseId = req.params.id;

    const isCacheExist = await redis.get(courseId);

    const courses = await CourseModel.find().select("-courseData.videoUrl -courseData.suggestion -courseData.questions -courseData.links");

    res.status(200).json({
      success: true,
      courses,
    });
  } catch (error: any) {
    return next(new ErrorHandler(error.message, 500));
  }
});

// get course content (for valid users)
export const getCourseByUser = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userCourseList = req.user?.courses; // Ensure req.user is populated correctly
    const courseId = req.params.id;

    console.log("Course ID:", courseId);
    console.log("User Courses:", userCourseList);

    const courseExists = userCourseList?.find((course: any) => course._id.toString() === courseId);

    if (!courseExists) {
      console.log("Course does not exist in user courses");
      return next(new ErrorHandler("You are not eligible to access this course", 404));
    }

    const course = await CourseModel.findById(courseId);

    if (!course) {
      console.log("Course not found in database");
      return next(new ErrorHandler("Course not found", 404));
    }

    const content = course.courseData;

    res.status(200).json({
      success: true,
      course: {
        ...course.toObject(),
        courseData: content, // Include course data if needed
      },
    });
  } catch (error: any) {
    console.error("Error fetching course:", error);
    return next(new ErrorHandler(error.message, 500));
  }
});

interface IAddQuestionData {
  question: string;
  courseId: string;
  contentId: string;
}

// add question in course
export const addQuestion = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { question, courseId, contentId }: IAddQuestionData = req.body;
    const course = await CourseModel.findById(courseId);

    if (!mongoose.Types.ObjectId.isValid(contentId)) {
      return next(new ErrorHandler("Invalid content id", 400));
    }

    const courseContent = course?.courseData?.find((item: any) => item._id.equals(contentId));

    if (!courseContent) {
      return next(new ErrorHandler("Invalid content id", 400));
    }

    // create new question object
    const newQuestion: any = {
      user: req.user,
      question,
      questionReplies: [],
    };

    // add question to course content
    courseContent.questions.push(newQuestion);

    await NotificationModel.create({
      user: req.user?._id,
      title: "New Question Recived",
      message: `You have a new question in ${courseContent.title}`,
    });

    // save the updated course data
    await course?.save();

    res.status(200).json({
      success: true,
      course,
    });
  } catch (error: any) {
    return next(new ErrorHandler(error.message, 500));
  }
});

interface IAddAnswerData {
  answer: string;
  courseId: string;
  contentId: string;
  questionId: string;
}

// add answer in course question
export const addAnswer = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { answer, courseId, contentId, questionId }: IAddAnswerData = req.body;
    const course = await CourseModel.findById(courseId);

    if (!mongoose.Types.ObjectId.isValid(contentId)) {
      return next(new ErrorHandler("Invalid content id", 400));
    }

    const courseContent = course?.courseData?.find((item: any) => item._id.equals(contentId));

    if (!courseContent) {
      return next(new ErrorHandler("Invalid content id", 400));
    }

    const question = courseContent?.questions?.find((item: any) => item._id.equals(questionId));

    if (!question) {
      return next(new ErrorHandler("Invalid question id", 400));
    }

    // create new answer object
    const newAnswer: any = {
      user: req.user,
      answer,
    };

    // add question to course content
    question.questionReplies?.push(newAnswer);

    await course?.save();

    if (req.user?._id === question._id) {
      // create a notification
      await NotificationModel.create({
        user: req.user?._id,
        title: "New Question Reply Recived",
        message: `You have a new question reply in ${courseContent.title}`,
      });
    } else {
      const data = {
        name: question.user.name,
        title: courseContent.title,
      };

      const html = await ejs.renderFile(path.join(__dirname, "../mails/question-reply.ejs"), data);

      try {
        await sendMail({
          email: question.user.email,
          subject: "Question Reply",
          template: "question-reply.ejs",
          data,
        });
      } catch (error: any) {
        return next(new ErrorHandler(error.message, 500));
      }
    }

    res.status(200).json({
      success: true,
      course,
    });
  } catch (error: any) {
    return next(new ErrorHandler(error.message, 500));
  }
});

interface IAddReviewData {
  review: string;
  rating: string;
  userId: string;
}

// add review in course
export const addReview = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userCourseList = req.user?.courses;
    const courseId = req.params.id;

    // check if course id already exist
    const courseExists = userCourseList?.some((course: any) => course._id.toString() === courseId.toString());

    if (!courseExists) {
      return next(new ErrorHandler("You are not eligible to access this course", 404));
    }

    const course = await CourseModel.findById(courseId);

    const { review, rating } = req.body as IAddReviewData;

    const reviewData: any = {
      user: req.user,
      rating,
      comment: review,
    };

    course?.reviews.push(reviewData);

    let avg = 0;

    course?.reviews.forEach((r: any) => {
      avg += r.rating;
    });

    if (course) {
      course.ratings = avg / course?.reviews.length;
    }

    await course?.save();

    const notification = {
      title: "New Review Received",
      message: `%(req.user?.name) has given a review in %(course?.name)`,
    };

    // create notification

    res.status(200).json({
      success: true,
      course,
    });
  } catch (error: any) {
    return next(new ErrorHandler(error.message, 500));
  }
});

interface IAddReviewData {
  comment: string;
  courseId: string;
  reviewId: string;
}

// add reply in review
export const addReplyToReview = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { comment, courseId, reviewId } = req.body as IAddReviewData;

    const course = await CourseModel.findById(courseId);

    if (!course) {
      return next(new ErrorHandler("Course not found!", 404));
    }

    const review = course?.reviews?.find((rev: any) => rev._id.toString() === reviewId);

    if (!review) {
      return next(new ErrorHandler("Review not found!", 404));
    }

    const replyData: any = {
      user: req.user,
      comment,
    };

    if (!review.commentReplies) {
      review.commentReplies = [];
    }

    review.commentReplies.push(replyData);

    await course?.save();

    res.status(200).json({
      success: true,
      course,
    });
  } catch (error: any) {
    return next(new ErrorHandler(error.message, 500));
  }
});

// get all courses -- only admin
export const getAdminAllCourses = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
  try {
    getAllCoursesService(res);
  } catch (error: any) {
    return next(new ErrorHandler(error.message, 400));
  }
});

// deleted course -- only admin
export const deleteCourse = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    const course = await CourseModel.findById(id);

    if (!course) {
      return next(new ErrorHandler("User not found", 404));
    }

    await course.deleteOne({ id });

    await redis.del(id);

    res.status(200).json({
      success: true,
      message: "Course deleted successfully",
    });
  } catch (error: any) {
    return next(new ErrorHandler(error.message, 400));
  }
});

// generate video url
export const generateVideoUrl = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { videoId } = req.body;
    const response = await axios.post(
      `https://dev.vdocipher.com/api/videos/${videoId}/otp`,
      { ttl: 300 },
      {
        headers: {
          Accept: "application/json",
          Authorization: `Apisecret ${process.env.VDOCIPHER_API_SECRET}`,
        },
      }
    );

    res.json(response.data);
  } catch (error: any) {
    return next(new ErrorHandler(error.message, 400));
  }
});
