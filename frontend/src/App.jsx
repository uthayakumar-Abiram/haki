import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route  path="/"  element={<Home />} />
          {/* <Route  path="*"  element={<PageNotFound />} /> */}
        </Routes>
      </Router>    
    </div>
  );
}

export default App;
