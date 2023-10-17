import "./login.scss";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../context/authContext";;

function Login() {
  const { loggin, currentUser } = useContext(AuthContext);
  //console.log('login rendered');

  const [inputs, setInputs] = useState({
    usernameOrEmail: '',
    password: '',
  });
  const [err, setErr] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [msg, setMsg] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    currentUser && navigate("/");
  }, [currentUser]);

  const handleChange = (e) => {
    setInputs(prev => ({ ...prev, [e.target.name]: e.target.value }));
  }

  const handleLogin = async (e) => {
    try {
      e.preventDefault();
      if(!inputs.usernameOrEmail || !inputs.password){
        throw new Error("Please fill all the fields");
      }
      setIsLoading(true);
      await loggin(inputs);
    } catch (err) {
      setErr(true);
      const message = err.response?.data?.message || err?.message;
      setMsg(message);
    }finally{
      setIsLoading(false);
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
            <button onClick={handleLogin} disabled={isLoading}> {isLoading ? 'Loading...' : 'Login'} </button>
          </form>
            <p className={err?'error':'success'}>{msg}</p>
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
