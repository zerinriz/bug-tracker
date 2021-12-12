import express from "express";
import bugCtrl from "../controllers/bug.controller";
import authCtrl from "../controllers/auth.controller";

const router = express.Router();

router.route("/api/bugs").get(bugCtrl.listBugs).post(bugCtrl.create);

router
  .route("/api/bugs/:bugId")
  .get(authCtrl.requireSignin, bugCtrl.read)
  .delete(bugCtrl.removeBug)
  .put(authCtrl.requireSignin, bugCtrl.update);

router.param("bugId", bugCtrl.bugsById);

export default router;
