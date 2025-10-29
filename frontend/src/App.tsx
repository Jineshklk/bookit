import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Details from "./pages/Details";
import Checkout from "./pages/Checkout";
import Result from "./pages/Result";

import SearchResults from "./pages/SearchResults";

// inside <Routes>


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/experience/:id" element={<Details />} />            // Select Date
        
        <Route path="/checkout" element={<Checkout />} />                 // Checkout
        <Route path="/result" element={<Result />} />       
        <Route path="/search" element={<SearchResults />} />              // Confirmation

      </Routes>
    </Router>
  );
}

export default App;
