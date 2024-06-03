const express = require("express");
const router = express.Router();
const TaskBusiness = require("../business/taskBusiness");
const isAuthenticated = require("../middleware/authentication");
const session = require("express-session");
const schemaValidator = require("../middleware/schemaValidator");
const schemas = require("../schema");
const config_data = require("../../config.json");

router.post(
  "/tasks",
  isAuthenticated,
  [schemaValidator(schemas.tasks)],
  async (req, res, next) => {
    let result;
    try {
      let payload = req.body;
      //getting userID from payload
      let userId = payload[0].user_id;

      //if not take from user login session
      if (!userId) {
        userId = req.session.user_id;
      }
      if (userId) {
        const taskBusiness = new TaskBusiness();
        result = await taskBusiness.insertTasks(userId, req.params, req.body);
        res.status(result.status).send(result);
      } else {
        //authentication error
        const error = {
          status: 403,
        };
        next(error);
      }
    } catch (err) {
      //multiple error can occur regarding syntax or DB insertions
      const error = {
        message: err,
        status: 400,
      };
      next(error);
    }
  }
);
router.patch(
  "/task/:id",
  isAuthenticated,
  [schemaValidator(schemas.updateTasks)],
  async (req, res, next) => {
    let response;

    try {
      //check for userID in payload, otherwise get it from session on login
      let payload = req.body;
      let userId = payload.user_id;
      if (!userId) {
        userId = req.session.user_id;
      }

      if (userId) {
        const taskBusiness = new TaskBusiness();
        response = await taskBusiness.updateTask(userId, req.params, req.body);
        if (response.result != undefined) {
          res.status(response.status).send(response);
        } else {
          //nothing got updated
          const error = {
            message: "NoChange",
            status: 400,
          };
          next(error);
        }
      } else {
        //authorization error
        const error = {
          status: 403,
        };
        next(error);
      }
    } catch (err) {
      const error = {
        message: err,
        status: 400,
      };
      next(error);
    }
  }
);
router.delete("/task/:id", isAuthenticated, async (req, res, next) => {
  //check for user id in payload, otherwise get it from session login
  let payload = req.body;
  let userId = payload.user_id;
  if (!userId) {
    userId = req.session.user_id;
  }
  let response;
  try {
    if (userId) {
      const taskBusiness = new TaskBusiness();
      response = await taskBusiness.deleteTask(userId, req.params);
      if (response.result != undefined || response.result > 0) {
        res.status(response.status).send(response);
      } else {
        const error = {
          //nothing was updated
          message: "NoChange",
          status: 400,
        };
        next(error);
      }
    } else {
      //authorization error
      const error = {
        message: err,
        status: 403,
      };
      next(error);
    }
  } catch (err) {
    const error = {
      message: err,
      status: 400,
    };
    next(error);
  }
});
router.get("/tasks", isAuthenticated, async (req, res, next) => {
  let payload = req.body;
  let userId = payload.user_id;
  if (!userId) {
    userId = req.session.user_id;
  }
  let response;
  try {
    if (userId) {
      const taskBusiness = new TaskBusiness();
      response = await taskBusiness.getAllTasks(req.query);
      if (response && response.result.length > 0) {
        res.status(response.status).send(response);
      } else {
        const error = {
          message: err,
          status: 400,
        };
        next(error);
      }
    } else {
    }
    const error = {
      status: 403,
    };
    next(error);
  } catch (err) {
    const error = {
      message: err,
      status: 400,
    };
    next(error);
  }
});
router.get("/task/:id", isAuthenticated, async (req, res, next) => {
  let payload = req.body;
  let userId = payload.user_id;
  if (!userId) {
    userId = req.session.user_id;
  }
  let response;
  try {
    if (userId) {
      const taskBusiness = new TaskBusiness();
      response = await taskBusiness.getOneTask(req.params, req.query);
      if (response.result && response.result.length > 0) {
        res.status(response.status).send(response);
      } else {
        const error = {
          //id not present
          message: "NoChange",
          status: 400,
        };
        next(error);
      }
    } else {
      const error = {
        status: 403,
      };
      next(error);
    }
  } catch (err) {
    const error = {
      message: err,
      status: 400,
    };
    next(error);
  }
});
module.exports = router;
