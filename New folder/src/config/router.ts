import {Router} from 'express';
import {
  getTasks,
  createNewTask,
  getTaskById,
} from '../controllers/taskController';

export let mainRoute = Router();

mainRoute.get('/task', getTasks);
mainRoute.get('/task/:id', getTaskById);
mainRoute.post('/task', createNewTask);
