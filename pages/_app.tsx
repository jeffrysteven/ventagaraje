import "../styles/globals.css";
import type { AppProps } from "next/app";
import { createContext, useState } from "react";

export const ProductContext = createContext({});

function MyApp({ Component, pageProps }: AppProps) {
  const [product, setProduct] = useState({});

  return (
    <ProductContext.Provider value={{ product, setProduct }}>
      <Component {...pageProps} />
    </ProductContext.Provider>
  );
}

export default MyApp;
