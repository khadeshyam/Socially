import "./login.scss";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../context/authContext";;

function Login() {
  const { loggin, currentUser } = useContext(AuthContext);

  const [inputs, setInputs] = useState({
    usernameOrEmail: '',
    password: '',
  });
  const [err, setErr] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    currentUser && navigate("/");
  }, [currentUser]);

  const handleChange = (e) => {
    setInputs(prev => ({ ...prev, [e.target.name]: e.target.value }));
  }

  const handleLogin = (e) => {
    try {
      e.preventDefault();
      loggin(inputs);
    } catch (err) {
      console.log(err);
      setErr(true);
    }
  };
  return (
    <div className="login">
      <div className="card">
        <div className="left">
          <h1>Hello world</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam
            tempore dolor eveniet ea ullam aut possimus mollitia iusto
          </p>
          <span>Don't you have an account?</span>
          <Link to="/register">
            <button>Register</button>
          </Link>
        </div>
        <div className="right">
          <h1>Login</h1>
          <form>
            <input type="text" placeholder="Username or Email" name="usernameOrEmail" onChange={handleChange} />
            <input type="password" placeholder="Password" name="password" onChange={handleChange} />
            <button onClick={handleLogin}>Login</button>
          </form>
          <div>
            <span>Don't have an account?</span>
            <Link to='/register'>Register
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
