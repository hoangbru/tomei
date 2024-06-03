import type { AppProps } from "next/app";
import { FormProvider, useForm } from "react-hook-form";
import { LazyMotion, domAnimation } from "framer-motion";

import "@/styles/globals.scss";
import "swiper/css";

import Layout from "@/components/layout";

import { AppContextProvider } from "@/context/appContext";
import ThemeProvider from "@/context/themeContext";
import GlobalContextProvider from "@/context/globalContext";
import { SWRProvider } from "@/providers/swr-provider";

export default function App({ Component, pageProps }: AppProps) {
  const methods = useForm();
  return (
    <SWRProvider>
      <AppContextProvider>
        <ThemeProvider>
          <GlobalContextProvider>
            <FormProvider {...methods}>
              <LazyMotion features={domAnimation}>
                <Layout>
                  <Component {...pageProps} />
                </Layout>
              </LazyMotion>
            </FormProvider>
          </GlobalContextProvider>
        </ThemeProvider>
      </AppContextProvider>
    </SWRProvider>
  );
}
