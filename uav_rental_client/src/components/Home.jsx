import { useContext, useEffect } from 'react';
import { GlobalContext } from '../context/Context';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import { Container } from 'react-bootstrap';
import UAV from './UAV';
import Rentals from './Rentals';

const Home = () => {
  const { session } = useContext(GlobalContext);

  const navigate = useNavigate();

  //IF USER HAS NOT LOGGED IN REDIRECT TO LOGIN PAGE
  useEffect(() => {
    if (!session) {
      navigate('/login');
    }
  }, []);

  return (
    <Container style={{ height: '100vh' }}>
      <Navbar></Navbar>
      <UAV></UAV>
      <Rentals></Rentals>
    </Container>
  );
};

export default Home;
