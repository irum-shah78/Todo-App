import { Metadata } from 'next';
import AddListPage from '../../../components/addlist/addList';

export const metadata: Metadata = {
  title: "Add List | Todo App",
  description: "Create a new list and select a theme.",
  openGraph: {
    title: "Add List | Todo App",
    description: "Create a new list and select a theme.",
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_APP_URL}/images/add-list-og.png`,
        alt: "Add List",
      },
    ],
    url: `${process.env.NEXT_PUBLIC_APP_URL}/add-list`,
    type: "website",
  },
};

const AddListPageWithMetadata = () => {
  return (
    <div>
      <AddListPage />
    </div>
  );
};

export default AddListPageWithMetadata;
