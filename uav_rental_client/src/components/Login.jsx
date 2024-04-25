import { Button, Container, Form } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { FaUserAlt, FaLock } from 'react-icons/fa';
import { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { GlobalContext } from '../context/Context';
import Cookie from 'universal-cookie';

const Login = () => {
  //UPDATE CREDENTIALS STATE
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
  });

  //DESTRUCT STATE OBJECT
  const { username, password } = credentials;

  //IF AN ERROR OCCURS DURING LOGIN PROCESS, SAVE ERROR MESSAGE IN A STATE.
  const [message, setMessage] = useState('');

  //CONSUME GLOBAL CONTEXT
  const { session, setSession } = useContext(GlobalContext);

  //IF A USER HAS ALREADY LOGGED IN REDIRECT TO HOME PAGE
  useEffect(() => {
    if (session) {
      navigate('/home');
    }
  }, []);

  const navigate = useNavigate();

  const login_url = 'http://127.0.0.1:8000/api/login/';

  //HANDLE INPUT CHANGE
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  //THIS FUNCTION RUNS WHEN USER SUBMITS LOGIN FORM
  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios
      .post(
        login_url,
        { username: username, password: password },
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        }
      )
      .then((response) => {
        //SET GLOBAL SESSION TOKEN
        setSession(new Cookie().get('csrftoken'));
        //CLEAR CREDENTIALS INPUT FIELDS AFTER SUCCESSFUL LOGIN
        setCredentials({
          username: '',
          password: '',
        });

        //RESET ERROR MESSAGES IF THERE ARE ANY
        setMessage('');

        //NAVIGATE HOME PAGE
        navigate('/home');
      })
      .catch((error) => {
        console.log(error);
        //SHOW ERROR MESSAGE IF THERE ARE ANY ERRORS
        setMessage(error.response.data.detail);
      });
  };

  return (
    <Container className='login-register-container'>
      <Form className='login-register-form' onSubmit={handleSubmit}>
        <h1 className='mb-3'>Login to your account.</h1>
        {message && <div className='mb-3'>{message}</div>}
        <Form.Group className='mb-3' style={{ display: 'flex', gap: '10px' }}>
          <Form.Label>
            <FaUserAlt size={24} />
          </Form.Label>
          <Form.Control
            placeholder='Username'
            type='text'
            name='username'
            id='username'
            required
            value={credentials.username}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className='mb-3' style={{ display: 'flex', gap: '10px' }}>
          <Form.Label>
            <FaLock size={24} />
          </Form.Label>
          <Form.Control
            placeholder='Password'
            type='password'
            name='password'
            id='password'
            required
            value={credentials.password}
            onChange={handleChange}
          />
        </Form.Group>
        <Button type='submit' className='mb-3'>
          Login
        </Button>
        <div className='register-sign-in'>
          <p>
            Don't have an account? <Link to='/register'>Register</Link>.
          </p>
        </div>
      </Form>
    </Container>
  );
};

export default Login;
