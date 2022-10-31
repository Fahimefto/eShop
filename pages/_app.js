import { SessionProvider, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { StoreProvider } from "../hooks/Store";
import "../styles/globals.css";
import { useState } from "react";
import HashLoader from "react-spinners/HashLoader";
import Router from "next/router";

const override = {
  position: "absolute",
  color: "#31877c",
  left: "50%",
  top: "40%",
  width: "100vw",
  height: "100vh",
  backRoundColor: "white",
  transform: "translate(-50%, -50%)",
};

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  let [loading, setLoading] = useState(false);

  Router.events.on("routeChangeStart", () => {
    console.log("Router changing");
    setLoading(true);
  });
  Router.events.on("routeChangeComplete", () => {
    console.log("finised changing");
    setLoading(false);
  });

  return (
    <>
      {loading && (
        <HashLoader
          color="#0a6434"
          loading={loading}
          cssOverride={override}
          size={80}
        />
      )}
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
    </>
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
