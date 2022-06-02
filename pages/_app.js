import AppLayout from "../components/layouts/AppLayout/index";
import UserProvider from "../context/UserProvider";

function MyApp({ Component, pageProps }) {
  return (
    <UserProvider>
      <AppLayout>
        <Component {...pageProps} />
      </AppLayout>
    </UserProvider>
  );
}

export default MyApp;
