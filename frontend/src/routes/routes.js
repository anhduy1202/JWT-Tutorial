import { Navigate } from "react-router-dom";
import HomePage from "../Components/Home/HomePage";

const routes = (isLoggedIn) => [
  {
    path: "/",
    element: isLoggedIn ? <HomePage /> : <Navigate to="/login" />,
  },
];

export default routes;
