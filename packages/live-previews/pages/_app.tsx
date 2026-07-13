import type { AppProps } from "next/app";
import "@/src/styles/global.css";

function App({ Component, pageProps }: AppProps): React.JSX.Element {
  return <Component {...pageProps} />;
}

export default App;
