import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import TaskItem from './TaskItem';

const TaskList = () => {
  const tasks = useSelector(state => state.tasks);

  useEffect(() => {
    // Simulate fetching tasks (if needed) and cleanup
    return () => {
      // Perform cleanup (if needed)
    };
  }, []);

  return (
    <ul>
      {tasks.map(task => (
        <TaskItem key={task.id} task={task} />
      ))}
    </ul>
  );
};

export default TaskList;
