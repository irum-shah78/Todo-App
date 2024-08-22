import { Metadata } from 'next';
import EditListPage from '../../../../components/editlist/editList';

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


// import Head from 'next/head';
// import EditListPage from '../../../../components/editlist/editList';

// const EditListPageWithMetadata = () => {
//   return (
//     <>
//       <Head>
//         <title>Edit List | Todo App</title>
//         <meta name="description" content="Edit the details of an existing list, including name and theme." />
//         <meta property="og:title" content="Edit List | Todo App" />
//         <meta property="og:description" content="Edit the details of an existing list, including name and theme." />
//         <meta property="og:image" content={`${process.env.NEXT_PUBLIC_APP_URL}/images/edit-list-og.png`} />
//         <meta property="og:url" content={`${process.env.NEXT_PUBLIC_APP_URL}/edit-list`} />
//         <meta property="og:type" content="website" />
//       </Head>
//       <div>
//         <EditListPage />
//       </div>
//     </>
//   );
// };

// export default EditListPageWithMetadata;
