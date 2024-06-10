import { apiSlice } from "../api/apiSlice";

export const courseApi = apiSlice.injectEndpoints({
  endpoints: (builder: any) => ({
    createCourse: builder.mutation({
      query: (data: any) => ({
        // Removed the wrapping object
        url: "create-course",
        method: "POST",
        body: data, // Send data directly
        credentials: "include" as const,
      }),
    }),
    getAllCourses: builder.query({
      query: () => ({
        url: "get-admin-courses",
        method: "GET",
        credentials: "include" as const,
      }),
    }),
    deleteCourse: builder.mutation({
      query: (id: any) => ({
        url: `delete-course/${id}`,
        method: "DELETE",
        credentials: "include" as const,
      }),
    }),
    editCourse: builder.mutation({
      query: ({ id, data }: any) => ({
        url: `edit-course/${id}`,
        method: "PUT",
        body: data,
        credentials: "include" as const,
      }),
    }),
    getUsersAllCourses: builder.query({
      query: () => ({
        url: "get-courses",
        method: "GET",
        credentials: "include" as const,
      }),
    }),
    getCoursesDetails: builder.query({
      query: (id: String) => ({
        url: `get-course/${id}`,
        method: "GET",
        credentials: "include" as const,
      }),
    }),
    getCourseContent: builder.query({
      query:(id:any) => ({
        url:`get-course-content/${id}`,
        method:"GET",
        credentials: "include" as const
      })
    })
  }),
});

export const { useCreateCourseMutation, useGetAllCoursesQuery, useDeleteCourseMutation, useEditCourseMutation, useGetUsersAllCoursesQuery, useGetCoursesDetailsQuery, useGetCourseContentQuery } = courseApi;
