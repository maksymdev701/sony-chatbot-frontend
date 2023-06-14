import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./App.css";

import ChatRoom from "./pages/chat/ChatRoom";

const router = createBrowserRouter([
  {
    path: "/chat",
    element: <ChatRoom />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
