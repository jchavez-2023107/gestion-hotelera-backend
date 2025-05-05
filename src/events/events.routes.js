import { Router } from "express"
import {
  createEvent,
  getEvents,
  updateEvent,
  deleteEvent,
} from "../events/events.controller.js";
import { validateJWT, validateRoles } from "../../middlewares/validate.jwt.js"

const api = Router();
    
api.post("/", [validateJWT, validateRoles('Admin')],createEvent);
api.get("/", [validateJWT, validateRoles('Admin')],getEvents);
api.put("/:id", [validateJWT, validateRoles('Admin','Employee')],updateEvent);
api.delete("/:id", [validateJWT, validateRoles('Admin')],deleteEvent);

export default api;
