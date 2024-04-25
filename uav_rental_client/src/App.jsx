import Register from './components/Register';
import Login from './components/Login';
import Home from './components/Home';
import Landing from './components/Landing';
import { Routes, Route } from 'react-router-dom';
import { GlobalContextProvider } from './context/Context';

function App() {
  return (
    <>
      <GlobalContextProvider>
        <Routes>
          <Route path='/' element={<Landing />} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/home' element={<Home />} />
        </Routes>
      </GlobalContextProvider>
    </>
  );
}

export default App;
