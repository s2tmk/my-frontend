import { useEffect, useState } from "react";
import liff from "@line/liff";
import axios from "axios";
import "./App.css";
import { useQuery } from "@tanstack/react-query";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_APP_SERVER_ENDPOINT,
});

function App() {
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    liff
      .init({
        liffId: import.meta.env.VITE_APP_LIFF_ID,
      })
      .then(() => {
        setMessage("LIFF init succeeded.");
      })
      .catch((e: Error) => {
        setMessage("LIFF init failed.");
        setError(`${e}`);
      });
  });

  const { data, isLoading } = useQuery({
    queryKey: ["message"],
    queryFn: () => axiosInstance.get("/api/hello").then((res) => res.data),
  });

  return (
    <>
      {isLoading ? "Loading..." : data}
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
