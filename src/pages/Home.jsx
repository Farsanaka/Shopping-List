import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import {
  fetchAll,
  deleteList,
  fetchListById, // Make sure this action exists and is imported
} from "../features/shoppingList/shoppingListSlice";

function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);
  const { shoppingLists, status, error } = useSelector(
    (state) => state.shoppingList
  );

  useEffect(() => {
    if (!user) {
      navigate("/login");
    } else {
      dispatch(fetchAll(user.id));
    }
  }, [dispatch, user, navigate]);

  const handleDelete = (idToDelete) => {
    dispatch(deleteList(idToDelete));
    Swal.fire({
      icon: "success",
      title: "Deleted!",
      text: "Deleted successfully!",
      showConfirmButton: false,
      timer: 1500,
    });
  };

  const handleViewDetails = (id) => {
    dispatch(fetchListById(id));
    navigate(`/listdetails/${id}`);
  };

  return (
    <div>
      <div className="flex justify-center ml-190 mt-10">
        <button
          onClick={() => navigate("/home/list")}
          className="px-4 py-1 bg-gradient-to-r from-green-400 to-gray-400 rounded-lg font-semibold"
        >
          Add New List
        </button>
      </div>

      <div className="flex justify-center">
        <div className="flex flex-col items-center bg-stone-200 rounded-lg m-4 w-fit">
          <ul>
            <li className="flex gap-2 m-2">
              <div className="bg-gray-300 rounded-lg px-2 py-1 text-center w-[198px]">
                DATE
              </div>
              <div className="bg-gray-300 rounded-lg px-2 py-1 text-center w-[188px]">
                CATEGORY
              </div>
              <div className="bg-gray-300 rounded-lg px-2 py-1 text-center w-[198px]">
                NAME
              </div>
              <div className="bg-gray-300 rounded-lg px-2 py-1 text-center w-[100px]">
                STATUS
              </div>
              <div className="bg-gray-300 rounded-lg px-2 py-1 text-center w-[70px]">
                DETAILS
              </div>
              <div className="bg-gray-300 rounded-lg px-2 py-1 text-center w-[77px]">
                ACTION
              </div>
            </li>

            {status === "loading" || status === "idle" ? (
              <p>Loading...</p>
            ) : status === "failed" ? (
              <p className="text-red-500">Error: {error}</p>
            ) : !user ? (
              <p>Please login to view your shopping lists.</p>
            ) : Array.isArray(shoppingLists) && shoppingLists.length === 0 ? (
              <p>You do not have any lists yet!</p>
            ) : (
              shoppingLists.map((list) => (
                <li key={list.id} className="flex gap-2 m-2">
                  <input
                    type="text"
                    readOnly
                    value={list.date}
                    className="shadow-lg shadow-gray-400/50 bg-white rounded-lg px-2 py-1 text-center w-auto"
                  />
                  <input
                    type="text"
                    readOnly
                    value={list.category}
                    className="shadow-lg shadow-gray-400/50 bg-white rounded-lg px-1 py-1 text-center w-auto"
                  />
                  <input
                    type="text"
                    readOnly
                    value={list.name}
                    className="shadow-lg shadow-gray-400/50 bg-white rounded-lg px-2 py-1 text-center w-auto"
                  />
                  <input
                    type="text"
                    readOnly
                    value={list.status}
                    className="shadow-lg shadow-gray-400/50 bg-white rounded-lg px-2 py-1 text-center w-[100px]"
                  />
                  {/* <input
                    type="button"
                    readOnly
                    value="Details"
                    onClick={() => handleViewDetails(list.id)}
                    className="w-fit shadow-lg shadow-gray-400/50 bg-white rounded-lg px-2 py-1 text-center text-blue-500 cursor-pointer"
                  /> */}
                  <Link
                    to={`/home/list/${list.id}`}
                    className="w-fit shadow-lg shadow-gray-400/50 bg-white rounded-lg px-2 py-1 text-center text-blue-500 cursor-pointer inline-block"
                  >
                    View Details
                  </Link>
                  <button
                    onClick={() => handleDelete(list.id)}
                    className="shadow-lg shadow-gray-400/50 px-4 py-1 bg-gradient-to-r from-red-400 to-gray-400 rounded-lg font-semibold"
                  >
                    Delete
                  </button>
                </li>
              ))
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Home;
