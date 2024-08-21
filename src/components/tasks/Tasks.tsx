'use client';
import React from 'react';
import useTasksPage from './useTasks';
import Header from '@/components/header/Header';
import toast, { Toaster } from 'react-hot-toast';
import Loader from '@/components/loader/Loader';

const TasksPage: React.FC = () => {
  const { taskName, setTaskName, todoName, theme, tasks, error, status, handleToggleComplete, handleAddTask, handleDeleteTask } = useTasksPage();

  if (status === 'loading') return <Loader />;

  const themeClassPrefix = (theme.name as string).toLowerCase().replace(/\s+/g, '-');

  return (
    <div className={`min-h-screen flex flex-col font-paragraph bg-${themeClassPrefix}-background text-${themeClassPrefix}-primary dotted-background overflow-hidden`}>
      <Header theme={theme} />
      <div className="flex-grow flex flex-col items-center justify-center bg-center p-4 sm:p-6">
        <h1 className={`text-6xl sm:text-6xl lg:text-8xl font-footerText text-${themeClassPrefix}-primary`}>
          {todoName}<span className={`text-${themeClassPrefix}-primary`}>.</span>
        </h1>
        <div className="mt-8 w-full max-w-xs sm:max-w-md">
          <div className="mb-4 flex flex-col sm:flex-row sm:items-center gap-3">
            <input
              type="text"
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
              placeholder="[task]"
              className={`w-full sm:w-2/3 p-2 border-4 rounded-3xl focus:outline-none focus:ring-1 placeholder:text-xl placeholder:ps-4 border-${themeClassPrefix}-accent bg-${themeClassPrefix}-background text-${themeClassPrefix}-primary`}
            />
            <button
              onClick={handleAddTask}
              className={`w-full sm:w-auto px-2 py-2 font-semibold rounded-3xl focus:outline-none focus:ring-1 text-lg sm:text-xl bg-${themeClassPrefix}-accent text-${themeClassPrefix}-background border-4 border-${themeClassPrefix}-accent`}>
              Add Task
            </button>
          </div>

          {Array.isArray(tasks) && tasks.length > 0 ? (
            tasks.map((task) => (
              <div key={task.id} className="flex justify-between items-center py-2">
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <input
                      type="checkbox"
                      checked={task.completed}
                      onChange={() => handleToggleComplete(task.id)}
                      className={`appearance-none h-6 w-6 p-b-1 bg-${themeClassPrefix}-background border-2 border-${themeClassPrefix}-accent rounded focus:outline-none focus:ring-1 focus:ring-${themeClassPrefix}-accent cursor-pointer`}
                    />
                    {task.completed && (
                      <span className={`absolute inset-0 flex items-center justify-center text-${themeClassPrefix}-accent`}>
                        ✔
                      </span>
                    )}
                  </div>
                  <span
                    className={`ml-2 text-xl sm:text-3xl font-bold cursor-pointer underline ${task.completed ? `text-${themeClassPrefix}-accent` : `text-${themeClassPrefix}-primary`}`}
                    onClick={() => handleToggleComplete(task.id)}>
                    {task.name}
                  </span>
                </div>
                <button
                  onClick={() => handleDeleteTask(task.id)}
                  className="px-2 py-1 bg-red-600 text-white font-semibold border-4 border-red-600 rounded-3xl focus:outline-none focus:ring-1 focus:ring-red-500 text-lg sm:text-xl">
                  Delete
                </button>
              </div>
            ))
          ) : (
            <p className={`text-lg sm:text-xl text-${themeClassPrefix}-primary`}>{error ? error : 'No tasks available'}</p>
          )}
        </div>
      </div>
      <div className="flex justify-end mb-4">
        <p className={`font-footerText text-4xl sm:text-6xl lg:text-7xl text-${themeClassPrefix}-primary`}>
          tasks<span className={`text-4xl sm:text-6xl lg:text-8xl text-${themeClassPrefix}-primary`}>.</span>
        </p>
      </div>
      <Toaster position="top-center" reverseOrder={false} />
    </div>


  );
};

export default TasksPage;
