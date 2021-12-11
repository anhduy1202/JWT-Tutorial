import "./login.css";
import { Link } from "react-router-dom";
const Login = () => {
    return ( 
        <section className="login-container">
            <div className="login-title"> Log in</div>
            <form>
                <label>USERNAME</label>
                <input type="text" placeholder="Enter your username" />
                <label>PASSWORD</label>
                <input type="password" placeholder="Enter your password" />
                <button type="submit"> Continue </button>
            </form>
            <div className="login-register"> Don't have an account yet? </div>
            <Link className="login-register-link" to="/register">Register one for free </Link>
        </section>
     );
}
 
export default Login;