import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { AuthProvider } from '../context/authContext'
import { useEffect } from 'react'
import axios from '../lib/axios'

function MyApp({ Component, pageProps }: AppProps) {

  useEffect(() => {
    const access_token = localStorage.getItem("access_token");
    if (access_token) {
      (axios.defaults as any).headers["Authorization"] = "Bearer " + access_token;
    }
  }, []);
  return <AuthProvider>
    <ToastContainer
      position="bottom-left"
      autoClose={5000}
      hideProgressBar
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
    />
    <Component {...pageProps} />
  </AuthProvider>
}

export default MyApp
