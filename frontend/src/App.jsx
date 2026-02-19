import { BrowserRouter, Routes, Route } from "react-router-dom";
import User from "./components/Layout/User.jsx";
import Home from "./pages/Home.jsx";
import { Toaster } from "react-hot-toast";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Profile from "./pages/Profile.jsx";
import Collections from "./pages/Collections.jsx";


const App = () => {
  return (
    <BrowserRouter>
    <Toaster/>
      <Routes>
        <Route path="/" element={<User />}>
          <Route index element={<Home />} />
          <Route path="Login" element={<Login />} />
          <Route path="Register" element={<Register />} />
          <Route path="Profile" element={<Profile />} />
          <Route path="collections/:collections" element={<Collections />} />
        </Route>

        {/* Admin Layout */}
        <Route path="/admin" element={<div>Admin</div>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
