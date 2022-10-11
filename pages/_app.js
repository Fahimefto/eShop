import { SessionProvider, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { StoreProvider } from "../hooks/Store";
import "../styles/globals.css";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <StoreProvider>
        {Component.auth ? (
          <Auth>
            <Component {...pageProps} />
          </Auth>
        ) : (
          <Component {...pageProps} />
        )}
      </StoreProvider>
    </SessionProvider>
  );
}

function Auth({ children }) {
  const router = useRouter();
  const { status } = useSession({
    required: true,
    onUnauthenticated() {
      router.push("unauthorized?messsage=youHaveToLogin");
    },
  });
  if (status === "loading") {
    return <div>loading</div>;
  }
  return children;
}

export default MyApp;
