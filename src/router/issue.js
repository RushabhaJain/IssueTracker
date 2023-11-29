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
    const issue = await createIssue(req.body);
    res.send({
      success: true,
      data: {
        issue,
      },
    });
  } catch (error) {
    console.dir(typeof error);
    console.dir(error.errors);
    
    res
      .send({
        success: false,
        error: error.message,
      })
      .status(400);
  }
});

router.delete("/:id", async (req, res) => {
  await deleteIssue(req.params.id);
  res.send({
    success: true,
  });
});

router.put("/:id", async (req, res) => {
  const issue = await updateIssue(req.params.id, req.body);
  res.send({
    success: true,
    data: {
      issue,
    },
  });
});

export default router;
