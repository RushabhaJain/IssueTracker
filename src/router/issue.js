import express from "express";
import {
  getIssues,
  createIssue,
  updateIssue,
  deleteIssue,
} from "../services/issue.js";
import { validateCreateIssueRequest } from "../middlewares/validationMiddleware.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const issues = await getIssues();
    res.send({
      success: true,
      data: {
        issues,
      },
    });
  } catch (error) {
    res
      .send({
        success: false,
        error: error.message,
      })
      .status(400);
  }
});

router.post("/", validateCreateIssueRequest, async (req, res) => {
  try {
    req.body.createdBy = req.user._id;
    const issue = await createIssue(req.body);
    return res.send({
      success: true,
      data: {
        issue,
      },
    });
  } catch (error) {
    return res
      .send({
        success: false,
        error: error.message,
      })
      .status(400);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await deleteIssue(req.params.id);
    return res.send({
      success: true,
    });
  } catch (error) {
    if (error.name === "NotFoundError") {
      return res.status(404).send({
        success: false,
        error: error.message,
      });
    } else {
      return res.status(400).send({
        success: false,
        error: error.message,
      });
    }
  }
});

router.put("/:id", async (req, res) => {
  try {
    const issue = await updateIssue(req.params.id, req.body);
    return res.send({
      success: true,
      data: {
        issue,
      },
    });
  } catch (error) {
    if (error.name === "NotFoundError") {
      return res.status(404).send({
        success: false,
        error: error.message,
      });
    } else {
      return res.status(400).send({
        success: false,
        error: error.message,
      });
    }
  }
});

export default router;
