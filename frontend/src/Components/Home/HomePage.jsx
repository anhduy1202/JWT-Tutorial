import axios from "axios";
import { useEffect } from "react";
import jwt_decode from "jwt-decode";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "universal-cookie";
import { deleteUser, getAllUsers } from "../../redux/apiRequests";
import "./home.css";
import authSlice, { loginSuccess } from "../../redux/authSlice";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const user = useSelector((state) => state.auth.login?.currentUser);
  const token = user?.accessToken;
  const cookies = new Cookies();
  const userList = useSelector((state) => state.user?.users);
  const allUsers = userList?.allUsers;
  const navigate = useNavigate();
  const error = userList?.error;
  const errorMsg = useSelector((state) => state.user?.msg);
  const dispatch = useDispatch();

  const refreshToken = async () => {
    try {
      const res = await axios.post("/v1/auth/refresh", {
        withCredentials: true,
      });

      return res.data;
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = (id) => {
    deleteUser(id, dispatch, token);
  };

  let axiosJWT = axios.create();
  axiosJWT.interceptors.request.use(
    async (config) => {
      let currentDate = new Date();
      const decodedToken = jwt_decode(token);
      if (decodedToken.exp * 1000 < currentDate.getTime()) {
        const data = await refreshToken();
        const refresh = {
          ...user,
          accessToken: data.accessToken,
          refreshToken: data.refreshToken,
        };
        console.log(refresh);
        dispatch(loginSuccess(refresh));
        config.headers["token"] = "Bearer " + data.accessToken;
      }
      return config;
    },
    (err) => {
      return Promise.reject(err);
    }
  );
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
    if (token) {
      getAllUsers(token, dispatch, axiosJWT);
    }
  }, []);

  return (
    <main className="home-container">
      <div className="home-title">User List</div>
      <div className="home-role">
        {`Your role: ${user?.isAdmin ? `Admin` : `User`}`}
      </div>
      <div className="home-userlist">
        {allUsers?.map((user) => {
          return (
            <div className="user-container" key={user._id}>
              <div className="home-user">{user.username}</div>
              <div
                className="delete-user"
                onClick={() => handleDelete(user._id)}
              >
                {" "}
                Delete{" "}
              </div>
            </div>
          );
        })}
      </div>
      {error && user ? (
        <div className="errorMsg"> {errorMsg}</div>
      ) : !error && user ? (
        <div className="errorMsg"> {errorMsg}</div>
      ) : (
        <></>
      )}
    </main>
  );
};

export default HomePage;
