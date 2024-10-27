import { useEffect, useState } from "react";
import liff from "@line/liff";
import axios from "axios";
import "./App.css";
import { useQuery } from "@tanstack/react-query";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_APP_SERVER_ENDPOINT,
});

function App() {
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    liff
      .init({
        liffId: import.meta.env.VITE_APP_LIFF_ID,
      })
      .then(() => {
        console.log("LIFF init succeeded.");
        if (!liff.isLoggedIn()) {
          console.log("LINE is not logged in.");
          liff.login();
        }
        console.log("LINE is logged in.");
        const token = liff.getIDToken();
        console.log("LINE ID token:", token);
        setToken(token);
      })
      .catch((e: Error) => {
        setMessage("LIFF init failed.");
        setError(`${e}`);
      });
  });

  const { data: helloMessage, isLoading: isLoadingHelloApi } = useQuery({
    queryKey: ["message"],
    queryFn: () => axiosInstance.get("/api/hello").then((res) => res.data),
  });

  const { data: userPoint, isLoading: isLoadingNotionApi } = useQuery({
    queryKey: ["point", token],
    queryFn: () =>
      axiosInstance.get("/api/notion?token=" + token).then((res) => res.data),
    enabled: !!token,
  });

  return (
    <>
      {isLoadingHelloApi ? "Loading..." : helloMessage}
      {isLoadingNotionApi
        ? "Loading..."
        : `${userPoint?.userId ?? "anonymous"}: ${userPoint?.point ?? 0}`}
      {message && <p>{message}</p>}
      {error && (
        <p>
          <code>{error}</code>
        </p>
      )}
    </>
  );
}

export default App;
