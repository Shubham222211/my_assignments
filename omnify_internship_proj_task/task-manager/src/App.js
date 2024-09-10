import React, { Suspense, lazy, useState } from 'react';
import { Provider } from 'react-redux';
import store from './redux/store';

const TaskForm = lazy(() => import('./components/TaskForm'));
const TaskList = lazy(() => import('./components/TaskList'));

function App() {
  const [showTasks, setShowTasks] = useState(false);

  const toggleTasks = () => {
    setShowTasks(prevState => !prevState);
  };

  return (
    <Provider store={store}>
      <div>
        <h1>Task Manager</h1>
        <TaskForm />
        <button onClick={toggleTasks}>
          {showTasks ? 'Hide Tasks' : 'Show Tasks'}
        </button>
        {showTasks && (
          <Suspense fallback={<div>Loading...</div>}>
            <TaskList />
          </Suspense>
        )}
      </div>
    </Provider>
  );
}

export default App;
