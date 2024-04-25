import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUserAlt, FaEnvelope, FaLock } from 'react-icons/fa';
import axios from 'axios';
import { Button, Container, Form } from 'react-bootstrap';

const Register = () => {
  const [user, setUser] = useState({
    username: '',
    email: '',
    password: '',
  });

  const [message, setMessage] = useState('');

  const navigate = useNavigate();

  const register_url = 'http://127.0.0.1:8000/auth/users/';

  const { username, email, password } = user;

  const handleChange = (e) => {
    const { name: targetName, value } = e.target;
    setUser({ ...user, [targetName]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    axios
      .post(
        register_url,
        {
          username: username,
          email: email,
          password: password,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        }
      )
      .then((response) => {
        console.log(response);
        setUser({ username: '', email: '', password: '' });
        setMessage('');
        navigate('/login');
      })
      .catch((error) => {
        console.log(error);
        setMessage(error);
      });
  };

  return (
    <Container className='login-register-container'>
      <Form className='login-register-form' onSubmit={handleSubmit}>
        <h1 className='mb-3'>Create an account to get started</h1>
        {message && <div className='message'>{message}</div>}
        <Form.Group className='mb-3' style={{ display: 'flex', gap: '10px' }}>
          <Form.Label htmlFor='name'>
            <FaUserAlt size={24} />
          </Form.Label>
          <Form.Control
            type='text'
            name='username'
            id='username'
            required
            placeholder='Username'
            value={user.username}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className='mb-3' style={{ display: 'flex', gap: '10px' }}>
          <Form.Label htmlFor='email'>
            <FaEnvelope size={24} />
          </Form.Label>
          <Form.Control
            type='email'
            name='email'
            id='email'
            required
            placeholder='Your Email'
            value={user.email}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className='mb-3' style={{ display: 'flex', gap: '10px' }}>
          <Form.Label htmlFor='password'>
            <FaLock size={24} />
          </Form.Label>
          <Form.Control
            type='password'
            name='password'
            id='password'
            required
            placeholder='Type a password'
            value={user.password}
            onChange={handleChange}
          />
        </Form.Group>
        <Button type='submit' className='mb-3'>
          Register
        </Button>
        <div className='register-sign-in'>
          <p>
            Already have an account? <Link to='/login'>Sign in</Link>.
          </p>
        </div>
      </Form>
    </Container>
  );
};

export default Register;
