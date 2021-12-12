import Bug from "../models/bug.model";
import errorHandler from "./helpers/dbErrorHandler";
import _ from "lodash";

const create = (req, res, next) => {
  const bugs = new Bug(req.body);
  bugs.save((err, result) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler.getErrorMessage(err),
      });
    }
    res.status(200).json({
      message: "Successfully added a bug!",
    });
  });
};

const listBugs = (req, res) => {
  Bug.find((err, result) => {
    if (err) {
      console.log(err);
    }
    res.status(200).json(result);
  });
};

const bugsById = (req, res, next, id) => {
  Bug.findById(id).exec((err, bugs) => {
    if (err || !bugs) return res.status("400").json({ error: "Bug not found" });
    req.profile = bugs;
    next();
  });
};

const read = (req, res) => {
  req.profile.hashed_password = undefined;
  req.profile.salt = undefined;
  res.status(200).json(req.profile);
};

const update = (req, res, next) => {
  let bugs = req.profile;
  bugs = _.extend(bugs, req.body);
  bugs.created = Date.now();
  bugs.save((err) => {
    if (err) {
      return res.status(400).json({ error: errorHandler.getErrorMessage(err) });
    }
    res.json(bugs);
  });
};

const removeBug = (req, res, next) => {
  let bug = req.profile;
  bug.remove((err, deletedBug) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler.getErrorMessage(err),
      });
    }
    res.json(deletedBug);
  });
};

export default { create, listBugs, bugsById, read, removeBug, update };
