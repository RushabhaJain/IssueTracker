import express from 'express';
import { createUser, getUsers } from '../services/user.js';

const router = express.Router();

router.post('/', async (req, res) => {
    const user = await createUser(req.body);
    res.send({
        success: true,
        data: {
            user
        }
    });
});

router.get('/', async (req, res) => {
    const users = await getUsers();
    res.send({
        success: true,
        data: {
            users
        }
    });
});

router.get('/:id/issues', async (req, res) => {
    const issues = await getIssuesCreatedByUser(req.params.id);
    res.send({
        success: true,
        data: {
            issues
        }
    });
});

export default router