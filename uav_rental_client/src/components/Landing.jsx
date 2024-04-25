import { Container, Row, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Landing = () => {
  return (
    <Container className='mt-5'>
      <Row className='mb-5'>
        <h1>Welcome to UAV Rental Project </h1>
        <p>
          This project is built by Fırat Koçoğlu as requested by Baykar
          Technologies as a part of technical evaluation process of Back End
          Developer Position.
        </p>
      </Row>
      <Row className='mb-5'>
        <h4>If you do not have an account please register first.</h4>
        <Link to='/register'>
          <Button>Register</Button>
        </Link>
      </Row>
      <Row className='mb-5'>
        <h4>If you already have an account please login to get started.</h4>
        <Link to='/login'>
          <Button>Login</Button>
        </Link>
      </Row>
      <Row className='mb-5'>
        <h4>
          For further information about the project and to see documentations
          please visit{' '}
          <Link
            to='https://github.com/firatkocoglu/firat_kocoglu_uav_rental'
            target='_blank'
          >
            GitHub page
          </Link>{' '}
          of the project and browse README.md file.
        </h4>
      </Row>
      <Row>
        <h4>
          You can also visit{' '}
          <Link to='https://firatkocoglu.com' target='_blank'>
            My Personal Porftolio Website
          </Link>{' '}
          to learn more about my resume, skills, previous projects, socials and
          contact channels.{' '}
        </h4>
      </Row>
    </Container>
  );
};

export default Landing;
