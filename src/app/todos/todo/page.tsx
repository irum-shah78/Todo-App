// import { Metadata } from 'next';
// import TodosPage from '../../../components/todo/Todo'; 

// export const metadata: Metadata = {
//   title: "Todo Lists | Todo App",
//   description: "View and manage your todo lists here. Add, update, or delete lists as needed.",
//   openGraph: {
//     title: "Todo Lists | Todo App",
//     description: "View and manage your todo lists here. Add, update, or delete lists as needed.",
//     url: `${process.env.NEXT_PUBLIC_APP_URL}/todos`,
//     type: "website",
//   },
// };

// const TodosPageWithMetadata = () => {
//   return (
//     <div>
//       <TodosPage />
//     </div>
//   );
// };

// export default TodosPageWithMetadata;


import Head from 'next/head';
import TodosPage from '../../../components/todo/Todo'; 

const TodosPageWithMetadata = () => {
  return (
    <div>
      <Head>
        <title>Todo Lists | Todo App</title>
        <meta name="description" content="View and manage your todo lists here. Add, update, or delete lists as needed." />
        <meta property="og:title" content="Todo Lists | Todo App" />
        <meta property="og:description" content="View and manage your todo lists here. Add, update, or delete lists as needed." />
        <meta property="og:url" content={`${process.env.NEXT_PUBLIC_APP_URL}/todos`} />
        <meta property="og:type" content="website" />
      </Head>
      <TodosPage />
    </div>
  );
};

export default TodosPageWithMetadata;
