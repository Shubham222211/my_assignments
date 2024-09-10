import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteTask } from '../redux/actions';

const TaskItem = ({ task }) => {
  const dispatch = useDispatch();

  return (
    <li>
      {task.name}
      <button onClick={() => dispatch(deleteTask(task.id))}>DELETE</button>
    </li>
  );
};

export default TaskItem;
