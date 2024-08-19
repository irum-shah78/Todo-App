import { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import store  from '../store/store';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;


// import { AppProps } from 'next/app';
// import { Provider } from 'react-redux';
// import store from '../store/store';
// import { Stint_Ultra_Condensed, IBM_Plex_Mono } from '@next/font/google';

// const stintUltraCondensed = Stint_Ultra_Condensed({
//   subsets: ['latin'],
//   weight: '400',
// });

// const ibmPlexMono = IBM_Plex_Mono({
//   subsets: ['latin'],
//   weight: '400',
// });

// function MyApp({ Component, pageProps }: AppProps) {
//   return (
//     <Provider store={store}>
//       <style jsx global>{`
//         :root {
//           --font-footerText: ${stintUltraCondensed.style.fontFamily}, cursive, serif;
//           --font-paragraph: ${ibmPlexMono.style.fontFamily}, monospace;
//         }
//       `}</style>
//       <Component {...pageProps} />
//     </Provider>
//   );
// }

// export default MyApp;