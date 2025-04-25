import { NavLink, Outlet } from "react-router-dom";
// import styles from "./Home.module.css";
import BackgroundLayout from "../components/BackgroudLayout";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
function Home() {
  const navigate = useNavigate();
  return (
    <BackgroundLayout bgImage="/img/homebg.jpg">
      <Header />
      <div className="flex justify-center">
        <div className="flex flex-col justify-center bg-stone-200 rounded-lg m-4 w-fit center">
          <button
            onClick={() => navigate("/home/addlist")}
            className="px-4 py-1 bg-gradient-to-r from-green-400  to-gray-400 rounded-lg font-semibold"
          >
            Add New List
          </button>
          <p>sample</p>
        </div>
      </div>
      {/* <div className="bg-stone-200 rounded-lg m-4">
        <nav className="flex gap-4">
          <NavLink to="/home/addlist">Add List</NavLink>
          <NavLink to="/home/addcategory">Add Category</NavLink>
        </nav>
      </div> */}
      {/* <Outlet /> */}
    </BackgroundLayout>
  );
}

export default Home;
