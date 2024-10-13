import { Metadata } from 'next';
import EditListPage from '../../../../components/editlist/EditList';

export const metadata: Metadata = {
  title: "Edit List | Todo App",
  description: "Edit the details of an existing list, including name and theme.",
  openGraph: {
    title: "Edit List | Todo App",
    description: "Edit the details of an existing list, including name and theme.",
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_APP_URL}/images/edit-list-og.png`,
        alt: "Edit List",
      },
    ],
    url: `${process.env.NEXT_PUBLIC_APP_URL}/edit-list`,
    type: "website",
  },
};

const EditListPageWithMetadata = () => {
  return (
    <div>
      <EditListPage />
    </div>
  );
};

export default EditListPageWithMetadata;