import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "./register.css";
import { register } from "../../redux/apiRequests";
const Register = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const registerSelector = useSelector((state) => state.auth.register);

  const handleRegister = (e) => {
    e.preventDefault();
    const newUser = {
      username: username,
      email: email,
      password: password,
    };
    register(newUser, dispatch, navigate);
  };
  return (
    <section className="register-container">
      <div className="register-title"> Sign up </div>
      <form onSubmit={handleRegister}>
        <label>EMAIL</label>
        <input
          onChange={(e) => setEmail(e.target.value)}
          type="text"
          placeholder="Enter your email"
        />
        <label>USERNAME</label>
        <input
          onChange={(e) => setUsername(e.target.value)}
          type="text"
          placeholder="Enter your username"
        />
        <label>PASSWORD</label>
        <input
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Enter your password"
        />
        <button type="submit"> Create account </button>
        {registerSelector.error && (
          <p className="register-error"> {registerSelector.errorMsg} </p>
        )}
      </form>
    </section>
  );
};

export default Register;
