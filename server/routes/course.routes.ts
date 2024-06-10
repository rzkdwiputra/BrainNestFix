import express from "express";
import { authorizeRoles, isAuthenticated } from "../middleware/auth";
import { addAnswer, addQuestion, addReplyToReview, addReview, deleteCourse, editCourse, generateVideoUrl, getAdminAllCourses, getAllCourses, getCourseByUser, getSingleCourse, uploadCourse } from "../controllers/course.controller";
import { updateAccesstoken } from "../controllers/user.controller";
const courseRouter = express.Router();

courseRouter.post("/create-course", uploadCourse);

courseRouter.put("/edit-course/:id", updateAccesstoken, isAuthenticated, authorizeRoles("admin"), editCourse);

courseRouter.get("/get-course/:id", getSingleCourse);

courseRouter.get("/get-courses", getAllCourses);

courseRouter.get("/get-course-content/:id", updateAccesstoken, isAuthenticated, getCourseByUser);

courseRouter.put("/add-question", updateAccesstoken, isAuthenticated, addQuestion);

courseRouter.put("/add-answer", updateAccesstoken, isAuthenticated, addAnswer);

courseRouter.put("/add-review/:id", updateAccesstoken, isAuthenticated, addReview);

courseRouter.put("/add-reply", updateAccesstoken, isAuthenticated, authorizeRoles("admin"), addReplyToReview);

courseRouter.put("/add-courses", isAuthenticated, authorizeRoles("admin"), getAllCourses);

courseRouter.get("/get-admin-courses", isAuthenticated, authorizeRoles("admin"), getAdminAllCourses);

courseRouter.post("/getVdoCipherOTP", generateVideoUrl);

courseRouter.delete("/delete-course/:id", updateAccesstoken, isAuthenticated, authorizeRoles("admin"), deleteCourse);

export default courseRouter;
