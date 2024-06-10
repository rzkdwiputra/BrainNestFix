import express from "express";
import { authorizeRoles, isAuthenticated } from "../middleware/auth";
import { createLayout, editLayout, getLayoutByType } from "../controllers/layout.controller";
import { updateAccesstoken } from "../controllers/user.controller";
const layoutRouter = express.Router();

layoutRouter.post("/create-layout", updateAccesstoken,isAuthenticated,authorizeRoles("admin"),createLayout);

layoutRouter.put("/update-layout", updateAccesstoken,isAuthenticated,authorizeRoles("admin"),editLayout);

layoutRouter.get("/get-layout/:type", getLayoutByType);

export default layoutRouter;