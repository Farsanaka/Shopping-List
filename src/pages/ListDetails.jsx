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
  const auth = useSelector((state) => state.auth);
  const user = auth?.user;

 
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

  //
  useEffect(() => {
    if (user?.id) {
      dispatch(fetchAll(user.id));
    }
  }, [dispatch]);
  //

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
      ? "Completed"
      : "Pending";

    const updatedCategory = formCategory || editableCategory;

    dispatch(
      updateItemsCompletedStatus({
        listId: currentList.id,
        items: itemStates,
      })
    );

    dispatch(
      updateListStatus({
        listId: currentList.id,
        status: updatedStatus,
        category: updatedCategory,
      })
    );

    dispatch(fetchListById(currentList.id));

   
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
  
  const handleCancelEdit = () => {
    
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
    dispatch(updateListStatus({ listId: currentList.id, status: "Completed" }));
    dispatch(fetchListById(currentList.id));
   
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
          
            <strong>{currentList.category}</strong>
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
                  className="shadow-lg shadow-gray-400/50 px-4 py-1 bg-gradient-to-r from-red-400 to-gray-400 rounded-lg font-semibold"
                >
                  Edit
                </button>

                <button
                  onClick={handleMarkAsComplete}
                  className="px-4 py-1 bg-gradient-to-r from-green-400 to-gray-400 rounded-lg font-semibold"
                >
                  Mark All Complete
                </button>

                <button
                  onClick={handleSave}
                  className="px-4 py-1 bg-gradient-to-r from-green-400 to-gray-400 rounded-lg font-semibold"
                >
                  Save
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={handleSave}
                  className="px-4 py-1 bg-gradient-to-r from-green-400 to-gray-400 rounded-lg font-semibold"
                >
                  Save
                </button>
                <button
                  onClick={handleCancelEdit}
                  className="shadow-lg shadow-gray-400/50 px-4 py-1 bg-gradient-to-r from-red-400 to-gray-400 rounded-lg font-semibold"
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
