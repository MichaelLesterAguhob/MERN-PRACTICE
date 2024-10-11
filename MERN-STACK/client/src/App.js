import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import User from './getUser/User';
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import { AddUser } from "./addUser/AddUser";
import Update from './updateUser/UpdateUser';

function App() {

  const route = createBrowserRouter ([
    {
      path: "/",
      element: <User/>,
    },
    {
      path: "/add",
      element: <AddUser />,
    },
    {
      path: "/update/:id",
      element: <Update />,
    },
  ])
  return (
    <div className="App">
        <RouterProvider router={route}></RouterProvider>
    </div>
  );
}

export default App;
