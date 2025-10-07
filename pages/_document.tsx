// pages/_document.tsx
import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <script
          id="termly-cmp"
          src="https://app.termly.io/resource-blocker/1842f9f9-468d-4578-a354-2933902e853b?autoBlock=on"
        ></script>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
