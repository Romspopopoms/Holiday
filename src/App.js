import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar';
import Home from "./pages/HomePage"
import Inscriptions from "./pages/Inscriptions"
import Affichage from './pages/Affichage';

const App = () => {
  return (
        <Router>
            <Navbar />
          <div className="flex flex-col xl:gap-y-12 w-full">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/inscriptions" element={<Inscriptions />} />
              <Route path="/affichage" element={<Affichage />} />

            </Routes>
          </div>
        </Router>
  );
}

export default App;