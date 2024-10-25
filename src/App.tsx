import axios from "axios";
import "./App.css";
import { useQuery } from "@tanstack/react-query";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_APP_SERVER_ENDPOINT,
});

function App() {
  const { data, isLoading } = useQuery({
    queryKey: ["message"],
    queryFn: () => axiosInstance.get("/api/hello").then((res) => res.data),
  });

  return <>{isLoading ? "Loading..." : data}</>;
}

export default App;
