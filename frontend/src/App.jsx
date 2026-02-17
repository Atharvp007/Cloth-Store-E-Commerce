import { BrowserRouter, Routes, Route } from "react-router-dom";
import User from "./components/Layout/User.jsx";
import Home from "./pages/Home.jsx";


const App = () => {
  return (
    <BrowserRouter>
   
      <Routes>
        <Route path="/" element={<User />}>
          <Route index element={<Home />} />
        </Route>

        {/* Admin Layout */}
        <Route path="/admin" element={<div>Admin</div>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
