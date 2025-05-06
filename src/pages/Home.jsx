import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchAll } from "../features/shoppingList/shoppingListSlice";
import BackgroundLayout from "../components/BackgroudLayout";
import Header from "../components/Header";
import {
  openDetails,
  closeDetails,
} from "../features/shoppingList/detailsSlice";

function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  const { shoppingLists } = useSelector((state) => state.shoppingList);

  // Modal state for details
  const { showDetailsModal, selectedItem } = useSelector(
    (state) => state.details
  );

  // Handle Delete logic
  const handleDelete = (id) => {
    // Implement the delete logic here
    console.log("Deleting item with id:", id);
    // Example: dispatch(deleteCategory(id));
  };

  useEffect(() => {
    if (user) {
      dispatch(fetchAll(user.id));
    }
  }, [dispatch, user]);

  console.log("user data", user);
  console.log("list data", shoppingLists);

  return (
    <BackgroundLayout bgImage="/img/homebg.jpg">
      <Header />
      <div className="flex justify-end">
        <button
          onClick={() => navigate("/home/list")}
          className="px-4 py-1 bg-gradient-to-r from-green-400 to-gray-400 rounded-lg font-semibold"
        >
          Add New List
        </button>
      </div>
      <div className="flex justify-center">
        <div className="flex flex-col items-center bg-stone-200 rounded-lg m-4 w-fit">
          {/* Details Modal */}
          {showDetailsModal && selectedItem ? (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
              <div className="bg-white p-6 rounded-lg w-96 relative">
                <button
                  onClick={() => dispatch(closeDetails())}
                  className="absolute top-2 right-2 text-gray-500 hover:text-black text-xl font-bold"
                >
                  ×
                </button>
                <h2 className="text-lg font-semibold mb-4">List Details</h2>

                {/* Check if there are items */}
                {selectedItem.items && selectedItem.items.length > 0 ? (
                  <div className="space-y-2">
                    {selectedItem.items.map((item, index) => (
                      <div key={index} className="flex items-center gap-4">
                        <input
                          type="checkbox"
                          id={`item-${index}`}
                          className="h-5 w-5"
                        />
                        <div className="flex gap-4">
                          <p className="text-sm">
                            <strong>Item:</strong> {item.itemName}
                          </p>
                          <p className="text-sm">
                            <strong>Quantity:</strong> {item.quantity}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  // If no items, display the message inside the modal
                  <p>No items available for this list.</p>
                )}

                <button
                  className="mt-4 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                  onClick={() => alert("Add Category logic here")}
                >
                  Save
                </button>
              </div>
            </div>
          ) : null}

          {/* Shopping List */}
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
              <div className="bg-gray-300 rounded-lg px-2 py-1 text-center w-[85px]">
                STATUS
              </div>
              <div className="bg-gray-300 rounded-lg px-2 py-1 text-center w-[70px]">
                DETAILS
              </div>
              <div className="bg-gray-300 rounded-lg px-2 py-1 text-center w-[77px]">
                ACTION
              </div>
            </li>

            {user &&
            Array.isArray(shoppingLists) &&
            shoppingLists.length > 0 ? (
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
                    className="shadow-lg shadow-gray-400/50 bg-white rounded-lg px-2 py-1 text-center w-auto"
                    style={{ width: `${list.status.length + 3}ch` }}
                  />
                  <input
                    type="button"
                    readOnly
                    value="Details"
                    onClick={() => dispatch(openDetails(list))}
                    className="shadow-lg shadow-gray-400/50 bg-white rounded-lg px-2 py-1 text-center w-auto text-blue-500"
                    style={{ width: `${list.status.length + 1}ch` }}
                  />
                  <button
                    onClick={() => handleDelete(list.id)}
                    className="shadow-lg shadow-gray-400/50 px-4 py-1 bg-gradient-to-r from-red-400 to-gray-400 rounded-lg font-semibold"
                  >
                    Delete
                  </button>
                </li>
              ))
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
