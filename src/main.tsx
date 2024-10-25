import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { createSyncStoragePersister } from "@tanstack/query-sync-storage-persister";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});
const persistOptions = {
  persister: createSyncStoragePersister({
    storage: window.localStorage,
  }),
};

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={new QueryClient()}>
      <PersistQueryClientProvider
        client={queryClient}
        persistOptions={persistOptions}
      >
        <App />
      </PersistQueryClientProvider>
    </QueryClientProvider>
  </StrictMode>
);
