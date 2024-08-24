import { Metadata } from 'next';
import TasksPage from '../../../../components/tasks/Tasks';

export const metadata: Metadata = {
  title: "Tasks | Todo App",
  description: "Manage your tasks here. Add, update, or delete tasks and see your progress.",
  openGraph: {
    title: "Tasks | Todo App",
    description: "Manage your tasks here. Add, update, or delete tasks and see your progress.",
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_APP_URL}/images/tasks-og.png`,
        alt: "Tasks",
      },
    ],
    url: `${process.env.NEXT_PUBLIC_APP_URL}/tasks`,
    type: "website",
  },
};

const TasksPageWithMetadata = () => {
  return (
    <div>
      <TasksPage />
    </div>
  );
};

export default TasksPageWithMetadata;