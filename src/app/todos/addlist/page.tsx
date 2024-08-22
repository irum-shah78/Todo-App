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


// import Head from 'next/head';
// import AddListPage from '../../../components/addlist/addList';

// const AddListPageWithMetadata = () => {
//   return (
//     <>
//       <Head>
//         <title>Add List | Todo App</title>
//         <meta name="description" content="Create a new list and select a theme." />
//         <meta property="og:title" content="Add List | Todo App" />
//         <meta property="og:description" content="Create a new list and select a theme." />
//         <meta property="og:image" content={`${process.env.NEXT_PUBLIC_APP_URL}/images/add-list-og.png`} />
//         <meta property="og:url" content={`${process.env.NEXT_PUBLIC_APP_URL}/add-list`} />
//         <meta property="og:type" content="website" />
//       </Head>
//       <div>
//         <AddListPage />
//       </div>
//     </>
//   );
// };

// export default AddListPageWithMetadata;
