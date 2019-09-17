import {RequestHandler} from 'express';
// import {getAllTasks} from '../models/taskModel'; -> cara 1
import * as taskModel from '../models/taskModel';

let db = {
  tasks: [
    {
      id: 1,
      name: 'masak nasi',
    },
    {
      id: 2,
      name: 'masak air',
    },
  ],
};

export let getTasks: RequestHandler = async (req, res) => {
  let result = await taskModel.getAllTasks();
  res.send(result);
};

export let getTaskById: RequestHandler = async (req, res) => {
  let id = req.params.id;
  let result = await taskModel.getTaskById(id);
  res.send(result);
};

export let createNewTask: RequestHandler = (req, res) => {
  let body = req.body;

  res.json(body);
  db.tasks.push(body);
};
