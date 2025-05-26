import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import Swal from "sweetalert2";
import { fetchAll, deleteList } from "../redux/shoppingListSlice";

function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);
  const { shoppingLists, status, error } = useSelector(
    (state) => state.shoppingList
  );

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(7);
  const [showDropdown, setShowDropdown] = useState(false);

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
    setShowDropdown(false);
  };

  return (
    <div
      className="
        fontFamily-[var(--font-primary)],
        fontWeight-[var(--font-weight-regular)],
    "
    >
      <div className="flex justify-center mt-[var(--spacing-xl)]">
        <div className="relative inline-block text-left mr-[var(--spacing-45xl)]">
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            className="px-[var(--spacing-md)] py-[var(--spacing-sm)] bg-[var(--color-secondary)] text-[var(--color-gray-900)] rounded-[var(--radius-sm)] shadow-[var(--shadow-light)]"
          >
            Show
          </button>
          {showDropdown && (
            <div className="absolute right-0 mt-[var(--spacing-sm)] w-[var(--width-40)] bg-[var(--color-bg-light)] border border-[var(--color-gray-300)] rounded-[var(--radius-sm)] shadow-[var(--shadow-light)]">
              {[5, 10, 20].map((num) => (
                <button
                  key={num}
                  onClick={() => handleItemsPerPage(num)}
                  className="w-full text-left px-[var(--spacing-md)] py-[var(--spacing-sm)] hover:bg-[var(--color-gray-300)]"
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
            className="px-[var(--spacing-md)] py-[var(--spacing-xs)] bg-gradient-to-r from-[var(--color-green-400)] to-[var(--color-secondary)] rounded-[var(--radius-sm)] font-semibold text-[var(--color-bg-light)] shadow-[var(--shadow-light)]"
          >
            Add New List
          </button>
        </div>
      </div>

      <div className="flex mt-[var(--spacing-l)] ml-[var(--spacing-13xl)]"></div>

      <div className="flex justify-center">
        <div className="flex flex-col items-center bg-[var(--color-gray-200)] rounded-[var(--radius-sm)] m-[var(--spacing-md)] w-fit p-[var(--spacing-sm)] shadow-[var(--shadow-medium)]">
          <ul>
            <li className="flex gap-2 m-[var(--spacing-sm)] font-semibold">
              <div className="bg-[var(----color-border)] rounded-[var(--radius-sm)] px-[var(--spacing-xs)] py-[var(--spacing-xs)] text-center w-[var(--width-198)]">
                DATE
              </div>
              <div className="bg-[var(--color-gray-300)] rounded-[var(--radius-sm)] px-[var(--spacing-xs)] py-[var(--spacing-xs)] text-center w-[var(--width-188)]">
                CATEGORY
              </div>
              <div className="bg-[var(--color-gray-300)] rounded-[var(--radius-sm)] px-[var(--spacing-xs)] py-[var(--spacing-xs)] text-center w-[var(--width-198)]">
                NAME
              </div>
              <div className="bg-[var(--color-gray-300)] rounded-[var(--radius-sm)] px-[var(--spacing-xs)] py-[var(--spacing-xs)] text-center w-[var(--width-100)]">
                STATUS
              </div>
              <div className="bg-[var(--color-gray-300)] rounded-[var(--radius-sm)] px-[var(--spacing-sm)] py-[var(--spacing-xs)] text-center w-[var(--width-100)]">
                DETAILS
              </div>
              <div className="bg-[var(--color-gray-300)] rounded-[var(--radius-sm)] px-[var(--spacing-xs)] py-[var(--spacing-xs)] text-center w-[var(--width-77)]">
                ACTION
              </div>
            </li>

            {status === "loading" || status === "idle" ? (
              <p>Loading...</p>
            ) : status === "failed" ? (
              <p className="text-[var(--color-red-500)]">Error: {error}</p>
            ) : !user ? (
              <p>Please login to view your shopping lists.</p>
            ) : currentItems.length === 0 ? (
              <p>You do not have any lists yet!</p>
            ) : (
              currentItems.map((list) => (
                <li key={list.id} className="flex gap-2 m-[var(--spacing-sm)]">
                  <input
                    type="text"
                    readOnly
                    value={list.date}
                    className="shadow-[var(--shadow-light)] bg-[var(--color-bg-light)] rounded-[var(--radius-sm)] px-[var(--spacing-sm)] py-[var(--spacing-xs)] text-center w-auto"
                  />
                  <input
                    type="text"
                    readOnly
                    value={list.category}
                    className="shadow-[var(--shadow-light)] bg-[var(--color-bg-light)] rounded-[var(--radius-sm)] px-[var(--spacing-xs)] py-[var(--spacing-xs)] text-center w-auto"
                  />
                  <input
                    type="text"
                    readOnly
                    value={list.name}
                    className="shadow-[var(--shadow-light)] bg-[var(--color-bg-light)] rounded-[var(--radius-sm)] px-[var(--spacing-sm)] py-[var(--spacing-xs)] text-center w-auto"
                  />
                  <input
                    type="text"
                    readOnly
                    value={list.status}
                    className="shadow-[var(--shadow-light)] bg-[var(--color-bg-light)] rounded-[var(--radius-sm)] px-[var(--spacing-sm)] py-[var(--spacing-xs)] text-center w-[var(--width-100)]"
                  />
                  <Link
                    to={`/home/list/${list.id}`}
                    className="w-fit shadow-[var(--shadow-light)] bg-[var(--color-bg-light)] rounded-[var(--radius-sm)] px-[var(--spacing-sm)] py-[var(--spacing-xs)] text-center text-[var(--color-blue-500)] cursor-pointer inline-block"
                  >
                    View Details
                  </Link>
                  <button
                    onClick={() => handleDelete(list.id)}
                    className="shadow-[var(--shadow-light)] px-[var(--spacing-md)] py-[var(--spacing-xs)] bg-gradient-to-r from-[var(--color-red-800)] to-[var(--color-secondary)] rounded-[var(--radius-sm)] font-semibold text-[var(--color-bg-light)]"
                  >
                    Delete
                  </button>
                </li>
              ))
            )}
          </ul>

          {shoppingLists.length > itemsPerPage && (
            <div className="flex justify-center mt-[var(--spacing-md)] gap-[var(--spacing-sm)] mb-[var(--spacing-md)]">
              <button
                onClick={handlePrevPage}
                disabled={currentPage === 1}
                className="px-[var(--spacing-md)] py-[var(--spacing-xs)] bg-[var(--color-gray-300)] rounded-[var(--radius-sm)] disabled:opacity-50"
              >
                Previous
              </button>
              <button
                onClick={handleNextPage}
                disabled={indexOfLastItem >= shoppingLists.length}
                className="px-[var(--spacing-md)] py-[var(--spacing-xs)] bg-[var(--color-gray-300)] rounded-[var(--radius-sm)] disabled:opacity-50"
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
