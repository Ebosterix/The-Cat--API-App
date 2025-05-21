import { getTitle, searchByBreed } from "../contoller/controller.js";
import { Router } from "express";
const router = Router();
router.get("/", getTitle);
router.get("/:imput", searchByBreed); //  const response = await fetch(`api/cat/${breed}`);in cats.js.

export default router;