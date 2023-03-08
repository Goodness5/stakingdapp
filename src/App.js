import Navbar from "./components/Navbar";
import './App.css';
import StakingForm from "./pages/admin.jsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import TokenList from "./pages/home.jsx";

function App() {


  return (
    <div className="App">
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<TokenList />} />
      </Routes>
    </BrowserRouter>

    <StakingForm />
    </div>
  );
}

export default App;
