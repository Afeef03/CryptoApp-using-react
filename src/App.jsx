import './App.css';
import Navbar from './components/Navbar';
import Card from './components/Card';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from './components/Home';
import Coin from './components/Coin';
import UpToTopButton from './components/UpToTopButton';
import CoinsDetails from './components/CoinsDetails';

function App() {

  return (
    <>
      <Router>
        <Navbar />
        <UpToTopButton />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/exchanges' element={<Card />} />
          <Route path='/coin' element={<Coin />} />
          <Route path='/coins/:id' element={<CoinsDetails />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
