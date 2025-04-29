import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchAll } from "../features/shoppingList/shoppingListSlice";
import BackgroundLayout from "../components/BackgroudLayout";
import Header from "../components/Header";

function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  const { lists } = useSelector((state) => state.shoppingList);

  useEffect(() => {
    if (user) {
      dispatch(fetchAll(user.id));
    }
  }, [dispatch, user]);

  return (
    <BackgroundLayout bgImage="/img/homebg.jpg">
      <Header />
      <div className="flex justify-end">
        <button
          onClick={() => navigate("/home/addlist")}
          className="px-4 py-1 bg-gradient-to-r from-green-400  to-gray-400 rounded-lg font-semibold"
        >
          Add New List
        </button>
      </div>
      <div className="flex justify-center">
        <div className="flex flex-col items-center bg-stone-200 rounded-lg m-4 w-fit">
          <ul>
            {user && lists.length > 0 ? (
              lists.map((list) => <li key={list.id}>{list.name}</li>)
            ) : (
              <p>Please Login to view the Shopping List.</p>
            )}
          </ul>
        </div>
      </div>
    </BackgroundLayout>
  );
}

export default Home;

/////////V1

// import { NavLink, Outlet } from "react-router-dom";
// import BackgroundLayout from "../components/BackgroudLayout";
// import Header from "../components/Header";
// import { useNavigate } from "react-router-dom";
// import { useEffect, useState } from "react";
// import { fetchShoppingLists } from "../services/api";
// import { isUserLoggedIn, getLoggedInUser } from "../services/auth";

// function Home() {
//   const [lists, setLists] = useState([]);
//   const navigate = useNavigate();
//   const userLoggedIn = isUserLoggedIn();
//   const user = userLoggedIn ? getLoggedInUser() : null;

//   useEffect(() => {
//     async function getLists() {
//       const data = await fetchShoppingLists();
//       if (!userLoggedIn) return;
//       {
//         const userList = data.filter((list) => list.userid == user.id);
//         setLists(userList || []);
//       }
//       getLists();
//     }

//     getLists();
//   }, [userLoggedIn, user]);

//   return (
//     <BackgroundLayout bgImage="/img/homebg.jpg">
//       <Header />
//       <div className="flex justify-end">
//         <button
//           onClick={() => navigate("/home/addlist")}
//           className="px-4 py-1 bg-gradient-to-r from-green-400  to-gray-400 rounded-lg font-semibold"
//         >
//           Add New List
//         </button>
//       </div>
//       <div className="flex justify-center">
//         <div className="flex flex-col items-center  bg-stone-200 rounded-lg m-4 w-fit ">
//           <ul>
//             {lists.length > 0 ? (
//               lists.map((list) => <li key={list.id}>{list.name}</li>)
//             ) : (
//               <p>Please Login to view the Shopping List.</p>
//             )}
//           </ul>
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

// export default Home;
