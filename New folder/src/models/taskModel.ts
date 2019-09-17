import {client} from '../config/db';

export let getAllTasks = async () => {
  let result = await client.query(
    'SELECT tasks.id, tasks.task_name, users. "name" FROM "tasks" INNER JOIN users ON tasks.user_id = user_id',
  );

  return result.rows;
};

export let getTaskById = async (id: string) => {
  let result = await client.query({
    text: 'SELECT * FROM users WHERE id=$1', // $1 === data pertama / variable pertama dari values
    values: [id],
  });

  return result.rows[0];
};
