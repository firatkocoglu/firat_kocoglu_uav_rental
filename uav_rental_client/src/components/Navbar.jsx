import { useContext } from 'react';
import { Nav } from 'react-bootstrap';
import { GlobalContext } from '../context/Context';
import Cookies from 'universal-cookie';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Navbar = () => {
  const logout_url = 'http://127.0.0.1:8000/api/logout/';

  //CONSUME GLOBAL CONTEXT
  const { session, setSession } = useContext(GlobalContext);

  const navigate = useNavigate();

  const logout = async () => {
    axios
      .get(logout_url, {
        withCredentials: true,
        headers: {
          'X-CSRFToken': session,
        },
      })
      .then((response) => {
        console.log(response);

        //DELETE CSRF COOKIES
        let cookies = new Cookies();
        cookies.remove('csrftoken');

        //RESET SESSION INFO
        setSession('');

        //NAVIGATE TO LOGIN PAGE
        navigate('/login');
      })
      .catch((error) => console.log(error));
  };
  return (
    <Nav className='justify-content-end m-3' defaultActiveKey='/home' as='ul'>
      <Nav.Item as='li'>
        <Nav.Link onClick={logout}>Logout</Nav.Link>
      </Nav.Item>
    </Nav>
  );
};

export default Navbar;
