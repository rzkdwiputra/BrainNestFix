import express from "express";
import { authorizeRoles, isAuthenticated } from "../middleware/auth";
import { getNotifications, updateNotification } from "../controllers/notification.controller";
import { updateAccesstoken } from "../controllers/user.controller";
const notificationRoute = express.Router();

notificationRoute.get("/get-all-notifications", updateAccesstoken,isAuthenticated, authorizeRoles("admin"), getNotifications);
notificationRoute.put("/update-notification/:id",updateAccesstoken,isAuthenticated, authorizeRoles("admin"), updateNotification);

export default notificationRoute;
