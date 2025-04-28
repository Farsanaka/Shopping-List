import { NavLink, Outlet } from "react-router-dom";
import BackgroundLayout from "../components/BackgroudLayout";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";

import { useEffect, useState } from "react";
import { fetchShoppingLists } from "../service/api";

function Home() {
  const [lists, setLists] = useState([]);

  useEffect(() => {
    async function getLists() {
      const data = await fetchShoppingLists();
      setLists(data || []);
    }
    getLists();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Shopping Lists</h1>
      <ul>
        {lists.length > 0 ? (
          lists.map((list) => <li key={list.id}>{list.name}</li>)
        ) : (
          <p>No lists found.</p>
        )}
      </ul>
    </div>
  );
}

// function Home() {
//   const navigate = useNavigate();

//   return (
//     <BackgroundLayout bgImage="/img/homebg.jpg">
//       <Header />
//       <div className="flex justify-end">
//         <div className="flex flex-col justify-center bg-stone-200 rounded-lg m-4 w-fit center">
//           <button
//             onClick={() => navigate("/home/addlist")}
//             className="px-4 py-1 bg-gradient-to-r from-green-400  to-gray-400 rounded-lg font-semibold"
//           >
//             Add New List
//           </button>
//         </div>
//       </div>

//       {/* <div className="bg-stone-200 rounded-lg m-4">
//         <nav className="flex gap-4">
//           <NavLink to="/home/addlist">Add List</NavLink>
//           <NavLink to="/home/addcategory">Add Category</NavLink>
//         </nav>
//       </div> */}
//       {/* <Outlet /> */}
//     </BackgroundLayout>
//   );
// }

export default Home;
