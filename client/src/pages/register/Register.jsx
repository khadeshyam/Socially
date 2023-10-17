import './register.scss';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { makeRequest } from '../../axios';

function Register() {

  const [inputs, setInputs] = useState({
    username: '',
    email: '',
    password: '',
    name: '',
  });
  const [err, setErr] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setInputs(prev => ({ ...prev, [e.target.name]: e.target.value }));
  }

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      if(!inputs.username || !inputs.email || !inputs.password || !inputs.name){
        throw new Error("Please fill all the fields");
      }
      await makeRequest.post('/auth/register', inputs);
      setInputs({ username: '', email: '', password: '', name: '' });
      navigate('/login');
    } catch (err) {
        setErr(true);
        const message = err.response?.data?.message || err?.message;
        setMsg(message);
    }finally {
      setIsLoading(false);
    }
  }

  return (
    <div className='register'>
      <div className='card'>
        <div className='left'>
          <h1>Dev Socially</h1>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam tempore dolor eveniet ea ullam aut possimus mollitia iusto</p>
          <span>Do you have an account?</span>
          <Link to='/login'>
            <button>Login</button>
          </Link>
        </div>
        <div className='right'>
          <h1>Register</h1>
          <form>
            <input type='text' placeholder='Username' name='username' onChange={handleChange} />
            <input type='email' placeholder='Email' name='email' onChange={handleChange} />
            <input type='password' placeholder='Password' name='password' onChange={handleChange} />
            <input type='text' placeholder='Name' name='name' onChange={handleChange} />
            <button onClick={handleClick} disabled={isLoading}> {isLoading ? 'Loading...' : 'Register'} </button>
          </form>
            <p className={err?'error':'success'}>{msg}</p>
          <div>
            <span>Have an account?</span>
            <Link to='/login'>Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register