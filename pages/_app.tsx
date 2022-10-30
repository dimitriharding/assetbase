import "../styles/globals.css";
import type { AppProps } from "next/app";
import { SaasProvider } from "@saas-ui/react";
import { theme } from "../theme";
import MainShell from "../components/MainShell";
import { QueryClientProvider } from "../services/db";

function App({ Component, pageProps }: AppProps) {
  return (
    <SaasProvider theme={theme}>
      <QueryClientProvider>
        <MainShell>
          <Component {...pageProps} />
        </MainShell>
      </QueryClientProvider>
    </SaasProvider>
  );
}

export default App;
