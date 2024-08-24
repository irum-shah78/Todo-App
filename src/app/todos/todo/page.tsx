import { Metadata } from 'next';
import TodosPage from '../../../components/todo/Todo'; 

export const metadata: Metadata = {
  title: "Todo Lists | Todo App",
  description: "View and manage your todo lists here. Add, update, or delete lists as needed.",
  openGraph: {
    title: "Todo Lists | Todo App",
    description: "View and manage your todo lists here. Add, update, or delete lists as needed.",
    url: `${process.env.NEXT_PUBLIC_APP_URL}/todos`,
    type: "website",
  },
};

const TodosPageWithMetadata = () => {
  return (
    <div>
      <TodosPage />
    </div>
  );
};

export default TodosPageWithMetadata;