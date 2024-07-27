import { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import store  from '../store';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;


// // src/pages/_app.tsx
// import { AppProps } from 'next/app';
// import { ThemeProvider } from '@/libs/ThemeContext';
// import { Provider } from 'react-redux';
// import store  from '../store';

// function MyApp({ Component, pageProps }: AppProps) {
//   return (
//     <Provider store={store}>
//     <ThemeProvider>
//       <Component {...pageProps} />
//     </ThemeProvider>
//     </Provider>
//   );
// }

// export default MyApp;

// // src/pages/_app.tsx
// import { ThemeProvider } from '../libs/ThemeContext';
// import '../styles/globals.css';

// function MyApp({ Component, pageProps }) {
//   return (
//     <ThemeProvider>
//       <Component {...pageProps} />
//     </ThemeProvider>
//   );
// }

// export default MyApp;


