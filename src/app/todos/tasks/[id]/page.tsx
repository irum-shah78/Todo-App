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



// import Head from 'next/head';
// import TasksPage from '../../../../components/tasks/Tasks';

// const TasksPageWithMetadata = () => {
//   return (
//     <>
//       <Head>
//         <title>Tasks | Todo App</title>
//         <meta name="description" content="Manage your tasks here. Add, update, or delete tasks and see your progress." />
//         <meta property="og:title" content="Tasks | Todo App" />
//         <meta property="og:description" content="Manage your tasks here. Add, update, or delete tasks and see your progress." />
//         <meta property="og:image" content={`${process.env.NEXT_PUBLIC_APP_URL}/images/tasks-og.png`} />
//         <meta property="og:url" content={`${process.env.NEXT_PUBLIC_APP_URL}/tasks`} />
//         <meta property="og:type" content="website" />
//       </Head>
//       <div>
//         <TasksPage />
//       </div>
//     </>
//   );
// };

// export default TasksPageWithMetadata;
