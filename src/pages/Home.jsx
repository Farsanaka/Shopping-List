<<<<<<< HEAD
import React, { useEffect, useState } from "react";
=======
import { useEffect, useState } from "react";
>>>>>>> f3f139daf45bc9e7138d1c8a0e932d4f32447d4a
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import Swal from "sweetalert2";
import {
  fetchAll,
  deleteList,
} from "../features/shoppingList/shoppingListSlice";

function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);
  const { shoppingLists, status, error } = useSelector(
    (state) => state.shoppingList
  );

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(7); // Default: 7 items per page
  const [showDropdown, setShowDropdown] = useState(false); // For toggling the dropdown visibility

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

<<<<<<< HEAD
  // Pagination logic
=======
>>>>>>> f3f139daf45bc9e7138d1c8a0e932d4f32447d4a
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems =
    shoppingLists?.slice(indexOfFirstItem, indexOfLastItem) || [];

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const handleNextPage = () => {
    if (indexOfLastItem < shoppingLists.length)
      setCurrentPage((prev) => prev + 1);
  };

  const handleItemsPerPage = (num) => {
    setItemsPerPage(num);
    setCurrentPage(1);
    setShowDropdown(false); // Hide dropdown after selection
  };

  return (
    <div>
<<<<<<< HEAD
      {/* Add List Button */}
      <div className="flex justify-center ml-190 mt-10">
        <button
          onClick={() => navigate("/home/list")}
          className="px-4 py-1 bg-gradient-to-r from-green-400 to-gray-400 rounded-lg font-semibold"
        >
          Add New List
        </button>
      </div>

      {/* Show Limit Button with Dropdown */}
      <div className="flex  mt-6 ml-55">
        <div className="relative inline-block text-left">
          <button
            onClick={() => setShowDropdown(!showDropdown)} // Toggle dropdown visibility
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md"
          >
            Show
          </button>
          {showDropdown && (
            <div className="absolute right-0 mt-2 w-40 bg-white border rounded-md shadow-lg">
              {[5, 10, 20].map((num) => (
                <button
                  key={num}
                  onClick={() => handleItemsPerPage(num)}
                  className="w-full text-left px-4 py-2 hover:bg-gray-200"
                >
                  Show {num}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Shopping List Table */}
=======
      <div className="flex justify-center  mt-10">
        <div className="relative inline-block text-left mr-180">
          <button
            onClick={() => setShowDropdown(!showDropdown)} // Toggle dropdown visibility
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md"
          >
            Show
          </button>
          {showDropdown && (
            <div className="absolute right-0 mt-2 w-40 bg-white border rounded-md shadow-lg">
              {[5, 10, 20].map((num) => (
                <button
                  key={num}
                  onClick={() => handleItemsPerPage(num)}
                  className="w-full text-left px-4 py-2 hover:bg-gray-200"
                >
                  Show {num}
                </button>
              ))}
            </div>
          )}
        </div>
        <div>
          <button
            onClick={() => navigate("/home/list")}
            className="px-4 py-1 bg-gradient-to-r from-green-400 to-gray-400 rounded-lg font-semibold"
          >
            Add New List
          </button>
        </div>
      </div>

      <div className="flex  mt-6 ml-55"></div>

>>>>>>> f3f139daf45bc9e7138d1c8a0e932d4f32447d4a
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
            ) : currentItems.length === 0 ? (
              <p>You do not have any lists yet!</p>
            ) : (
              currentItems.map((list) => (
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

<<<<<<< HEAD
          {/* Pagination Controls */}
=======
>>>>>>> f3f139daf45bc9e7138d1c8a0e932d4f32447d4a
          {shoppingLists.length > itemsPerPage && (
            <div className="flex justify-center mt-4 gap-4 mb-4">
              <button
                onClick={handlePrevPage}
                disabled={currentPage === 1}
                className="px-4 py-1 bg-gray-300 rounded-md disabled:opacity-50"
              >
                Previous
              </button>
              <button
                onClick={handleNextPage}
                disabled={indexOfLastItem >= shoppingLists.length}
                className="px-4 py-1 bg-gray-300 rounded-md disabled:opacity-50"
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
