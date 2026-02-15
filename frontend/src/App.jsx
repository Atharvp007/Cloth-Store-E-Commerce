import React from 'react'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import User from './components/layout/user';

const router = createBrowserRouter([
  {
    path: "/",
    element: <User />
  },
]);

const App = () => {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;