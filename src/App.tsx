import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./App.css";

import ChatRoom from "./pages/chat/chatroom";
// import MainLayout from "./components/layout";

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <MainLayout />,
//     children: [
//       {
//         path: "chat",
//         element: <ChatRoom />,
//       },
//     ],
//   },
// ]);

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
