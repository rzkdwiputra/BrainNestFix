import express from "express";
import {
  activateUser,
  deleteUser,
  getAllUsers,
  getUserInfo,
  loginUser,
  logoutUser,
  registrationUser,
  socialAuth,
  updateAccesstoken,
  updatePassword,
  updateProfilePicture,
  updateUserInfo,
  updateUserRole,
} from "../controllers/user.controller";
import { authorizeRoles, isAuthenticated } from "../middleware/auth";
const userRouter = express.Router();

userRouter.post("/registration", registrationUser);

userRouter.post("/activate-user", activateUser);

userRouter.post("/login", loginUser);

userRouter.get("/logout", isAuthenticated, logoutUser);

userRouter.get("/refresh", updateAccesstoken);

userRouter.get("/me", updateAccesstoken, isAuthenticated, getUserInfo);

userRouter.post("/social-auth", socialAuth);

userRouter.put("/update-user-info", updateAccesstoken, isAuthenticated, updateUserInfo);

userRouter.put("/update-user-password", updateAccesstoken, isAuthenticated, updatePassword);

userRouter.put("/update-user-avatar", updateAccesstoken, isAuthenticated, updateProfilePicture);

userRouter.get("/get-users", updateAccesstoken, isAuthenticated, authorizeRoles("admin"), getAllUsers);

userRouter.put("/update-user", updateAccesstoken, isAuthenticated, authorizeRoles("admin"), updateUserRole);

userRouter.delete("/delete-user/:id", updateAccesstoken, isAuthenticated, authorizeRoles("admin"), deleteUser);

export default userRouter;
