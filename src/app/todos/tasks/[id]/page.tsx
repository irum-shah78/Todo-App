'use client';
import React from 'react';
import useTasksPage from './useTask';
import Header from '@/components/header/Header';
import toast, { Toaster } from 'react-hot-toast';
import Loader from '@/components/loader/Loader';

const TasksPage: React.FC = () => {
  const { taskName, setTaskName, todoName, currentTheme, tasks, error, status, handleToggleComplete, handleAddTask, handleDeleteTask, } = useTasksPage();
  if (status === 'loading') return <div><Loader /></div>;

  return (
    <div style={{ backgroundColor: currentTheme.background, color: currentTheme.primary }} className="min-h-screen flex flex-col font-paragraph dotted-background overflow-hidden">
      <Header theme={currentTheme} />
      <div className="flex-grow flex flex-col items-center justify-center bg-center p-6">
        <h1 className="text-8xl font-footerText" style={{ color: currentTheme.primary }}>
          {todoName}<span style={{ color: currentTheme.primary }}>.</span>
        </h1>
        <div className="mt-8 w-full max-w-md">
          <div className="mb-4 flex items-center gap-3">
            <input type="text" value={taskName} onChange={(e) => setTaskName(e.target.value)} placeholder="[task]"
              style={{
                backgroundColor: currentTheme.background,
                color: currentTheme.primary,
                borderColor: currentTheme.accent,
              }}
              className="w-2/3 p-2 border-4 rounded-3xl focus:outline-none focus:ring-1 placeholder-text-xl placeholder:ps-4"
            />
            <button onClick={handleAddTask}
              style={{
                backgroundColor: currentTheme.accent,
                color: currentTheme.background,
                borderColor: currentTheme.accent,
              }}
              className={`px-2 py-2 font-semibold rounded-3xl focus:outline-none focus:ring-1 text-xl`}
            >
              Add Task
            </button>
          </div>

          {Array.isArray(tasks) && tasks.length > 0 ? (
            tasks.map((task) => (
              <div key={task.id} className="flex justify-between items-center">
                <div className="flex items-center gap-2 relative">
                  <div className="relative">
                    <input type="checkbox" checked={task.completed} onChange={() => handleToggleComplete(task.id)}
                      className={`appearance-none h-6 w-6 mt-2 p-b-1 bg-[${currentTheme.background}] border-2 border-[${currentTheme.accent}] rounded focus:outline-none focus:ring-1 focus:ring-[${currentTheme.accent}] cursor-pointer`}
                    />
                    {task.completed && (
                      <span className={`absolute inset-0 flex items-center justify-center text-[${currentTheme.accent}] `}>
                        ✔
                      </span>
                    )}
                  </div>
                  <span className={`ml-2 text-2xl font-bold cursor-pointer underline ${task.completed ? `text-[${currentTheme.accent}] underline` : 'text-primary'}`} style={{ color: currentTheme.primary }} onClick={() => handleToggleComplete(task.id)} >
                    {task.name}
                  </span>
                </div>
                <button
                  onClick={() => handleDeleteTask(task.id)}
                  className="px-2 py-1 mt-4 bg-red-600 text-white font-semibold border-4 border-red-600 rounded-3xl focus:outline-none focus:ring-1 focus:ring-red-500 text-xl"
                >
                  Delete
                </button>
              </div>
            ))
          ) : (
            <p className="text-lg">{error ? error : 'No tasks available'}</p>
          )}
        </div>
      </div>
      <div className="flex justify-end mb-4">
        <p className="font-footerText text-7xl lg:text-8xl md:text-3xl sm:text-2xl">
          tasks<span className="text-8xl" style={{ color: currentTheme.primary }}>.</span>
        </p>
      </div>
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
};

export default TasksPage;