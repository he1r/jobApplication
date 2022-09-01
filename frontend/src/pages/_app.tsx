import type { AppProps } from "next/app";
import Head from "next/head";
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react'
import { Persistor } from '@utils/redux/store'
import store from "@utils/redux/store"
import "@styles/globals.scss"
import { ToastContainer } from "react-toastify";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={Persistor}>
        <ToastContainer
          style={{ width: "30vw", textAlign: "center" }}
          toastStyle={{ backgroundColor: "black", color: "white" }}
          position="top-center"
          autoClose={5000}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          draggable
        />
        <Head>
          <title>{"Lufthansa"}</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Component {...pageProps} />
      </PersistGate>
    </Provider>
  );
}

export default MyApp;
