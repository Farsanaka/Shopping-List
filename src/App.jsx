import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import AddList from "./pages/AddList";
import AddCategory from "./pages/AddCategory";
import Login from "./pages/Login";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/home/addlist" element={<AddList />} />
        <Route path="/home/addcategory" element={<AddCategory />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
