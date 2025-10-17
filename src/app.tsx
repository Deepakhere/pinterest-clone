import { QueryClient, QueryClientProvider } from "react-query";
import toast, { Toaster } from "react-hot-toast";
import { Gallery } from "./pages";
import { useEffect } from "react";

const queryClient = new QueryClient();

function App() {
  useEffect(() => {
    window.addEventListener("offline", () => {
      toast.error("Please check your network connection and try again.");
    });
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <Gallery />
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
