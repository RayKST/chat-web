import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Chats } from "./pages/chat";
import { Login } from "./pages/login";

const queryClient = new QueryClient();

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route element={<Login/>} index/>
          <Route element={<Chats/>} path="/chats/"/>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  )
}

