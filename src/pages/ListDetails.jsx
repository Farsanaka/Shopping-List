import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import {
  fetchListById,
  updateListStatus,
  updateItemsCompletedStatus,
  fetchAll as fetchAllLists,
  toggleItemCompletion,
} from "../features/shoppingList/shoppingListSlice";
//
import { fetchAll } from "../features/category/categorySlice";
//

const ListDetails = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const currentList = useSelector((state) => state.shoppingList.currentList);
  const [editableCategory, setEditableCategory] = useState("");
  //
  const [formCategory, setFormCategory] = useState("");
  //

  const [itemStates, setItemStates] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();
  const userId = useSelector((state) => state.auth.userId);

  const categories = useSelector((state) => state.category.categories);

  useEffect(() => {
    if (id) {
      dispatch(fetchListById(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    dispatch(fetchAllLists(userId));
  }, [userId]);

  useEffect(() => {
    if (currentList && currentList.items) {
      setItemStates(
        currentList.items.map((item) => ({
          ...item,
          completed: item.completed || false,
        }))
      );
    }
  }, [currentList]);

  useEffect(() => {
    if (currentList && currentList.items) {
      setItemStates(
        currentList.items.map((item) => ({
          ...item,
          completed: item.completed || false,
        }))
      );
      setEditableCategory(currentList.category || "");
    }
  }, [currentList]);

  useEffect(() => {
    dispatch(fetchAll());
  }, [dispatch]);

  const handleItemChange = (index, field, value) => {
    const updatedItems = [...itemStates];
    updatedItems[index][field] = value;
    setItemStates(updatedItems);
  };

  const handleCheckboxChange = (index, checked) => {
    const updatedItems = currentList.items.map((item, i) =>
      i === index ? { ...item, completed: checked } : item
    );
    dispatch(
      toggleItemCompletion({ listId: currentList.id, items: updatedItems })
    );
  };
  const handleEdit = () => {
    //
    setFormCategory(currentList.category || "");
    //
    setIsEditing(true);
  };

  const handleSave = () => {
    //
    const updatedStatus = itemStates.every((item) => item.completed)
      ? "completed"
      : "in-progress";

    const updatedCategory = formCategory || editableCategory;

    // ✅ Update items (names, quantities, completed) in DB
    dispatch(
      updateItemsCompletedStatus({
        listId: currentList.id,
        items: itemStates,
      })
    );

    // ✅ Update category and status
    dispatch(
      updateListStatus({
        listId: currentList.id,
        status: updatedStatus,
        category: formCategory || editableCategory,
      })
    );

    dispatch(fetchListById(currentList.id));

    setEditableCategory(updatedCategory);
    setFormCategory("");
    setIsEditing(false);
    Swal.fire({
      icon: "success",
      title: "Saved",
      text: "Edited Successfully",
      showConfirmButton: false,
      timer: 1500,
    });
  };

  //
  const handleCancelEdit = () => {
    // Restore item states and category from currentList
    if (currentList && currentList.items) {
      setItemStates(
        currentList.items.map((item) => ({
          ...item,
          completed: item.completed || false,
        }))
      );
      setEditableCategory(currentList.category || "");
      setFormCategory(currentList.category || "");
    }

    setIsEditing(false);
  };

  const handleMarkAsComplete = async () => {
    const updatedItems = itemStates.map((item) => ({
      ...item,
      completed: true,
    }));
    setItemStates(updatedItems);
    dispatch(
      updateItemsCompletedStatus({
        listId: currentList.id,
        items: updatedItems,
      })
    );
    dispatch(updateListStatus({ listId: currentList.id, status: "completed" }));
    dispatch(fetchListById(currentList.id));
    // alert("List marked as complete!");
    Swal.fire({
      icon: "success",
      title: "Success!",
      text: "List Marked as Complete",
      showConfirmButton: false,
      timer: 1500,
    });
  };

  if (!currentList) return <p>Loading...</p>;

  return (
    <div>
      <div className="flex justify-center mr-78 mt-10 font-bold">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 px-4 py-2 text-white bg-gray-700 rounded hover:bg-gray-800"
        >
          <FontAwesomeIcon icon={faArrowLeft} />
          Back
        </button>
      </div>
      <div className="flex justify-center">
        <div className="flex flex-col bg-stone-200 rounded-lg m-4 w-fit p-10">
          <h2 className="text-xl font-bold mb-4 text-center">
            {currentList.name}
          </h2>

          <p>
            Date: <strong>{currentList.date}</strong>
          </p>
          <p>
            Category:{" "}
            {isEditing ? (
              <select
                value={formCategory || editableCategory}
                onChange={(e) => setFormCategory(e.target.value)}
                className="bg-white rounded-lg text-center"
              >
                <option value="">Choose Category</option>
                {categories.map((cat) => (
                  <option key={cat.code} value={cat.category}>
                    {cat.category}
                  </option>
                ))}
              </select>
            ) : (
              <strong>{currentList.category}</strong>
            )}
          </p>
          <p>
            Status: <strong>{currentList.status}</strong>
          </p>

          <p className="mt-4 font-semibold">Items List:</p>
          {itemStates.length > 0 ? (
            <ul className="list-none">
              {itemStates.map((item, index) => (
                <li key={index} className="flex items-center gap-2 my-1">
                  <input
                    type="checkbox"
                    checked={item.completed || false}
                    onChange={(e) =>
                      handleCheckboxChange(index, e.target.checked)
                    }
                  />

                  <span
                    className={`${
                      item.completed ? "line-through text-gray-500" : ""
                    }`}
                  >
                    <strong>Item {index + 1}</strong>:{" "}
                    {isEditing ? (
                      <input
                        type="text"
                        value={item.itemName}
                        onChange={(e) =>
                          handleItemChange(index, "itemName", e.target.value)
                        }
                        className="border border-gray-400 rounded px-2 py-1 mr-2"
                      />
                    ) : (
                      item.itemName
                    )}
                    , Quantity:{" "}
                    {isEditing ? (
                      <input
                        type="number"
                        value={item.quantity}
                        onChange={(e) =>
                          handleItemChange(index, "quantity", e.target.value)
                        }
                        className="border border-gray-400 rounded px-2 py-1 w-16"
                      />
                    ) : (
                      <strong>{item.quantity}</strong>
                    )}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p>No items listed.</p>
          )}

          <div className="flex gap-4 mt-6 justify-center">
            {!isEditing ? (
              <>
                <button
                  onClick={handleEdit}
                  className="bg-blue-500 text-white px-4 py-1 rounded-lg shadow-md hover:bg-blue-600"
                >
                  Edit
                </button>

                <button
                  onClick={handleMarkAsComplete}
                  className="bg-green-500 text-white px-4 py-1 rounded-lg shadow-md hover:bg-green-600"
                >
                  Mark All Complete
                </button>

                <button
                  onClick={handleSave}
                  className="bg-gray-600 text-white px-4 py-1 rounded-lg shadow-md hover:bg-gray-700"
                >
                  Save
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={handleSave}
                  className="bg-purple-600 text-white px-4 py-1 rounded-lg shadow-md hover:bg-purple-700"
                >
                  Save Changes
                </button>
                <button
                  onClick={handleCancelEdit}
                  className="bg-red-500 text-white px-4 py-1 rounded-lg shadow-md hover:bg-red-600"
                >
                  Cancel
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListDetails;
