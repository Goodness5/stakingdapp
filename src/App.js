import Navbar from "./components/Navbar";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Stake from "./pages/stake.jsx";
import TokenList from "./pages/home.jsx";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />

        <Routes>
          <Route path="/" element={<TokenList />} />
          <Route path="/stake" element={<Stake />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
