import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import {
  fetchListById,
  updateListStatus,
  updateItemsCompletedStatus,
  toggleItemCompletion,
} from "../redux/shoppingListSlice";

const ListDetails = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();
  const currentList = useSelector((state) => state.shoppingList.currentList);
  const [itemStates, setItemStates] = useState([]);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (id) dispatch(fetchListById(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (currentList?.items) {
      setItemStates(
        currentList.items.map((item) => ({
          ...item,
          completed: item.completed || false,
        }))
      );
    }
  }, [currentList]);

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

  const handleEdit = () => setIsEditing(true);

  const handleCancelEdit = () => {
    setItemStates(
      currentList.items.map((item) => ({
        ...item,
        completed: item.completed || false,
      }))
    );
    setIsEditing(false);
  };

  const handleSave = () => {
    const updatedStatus = itemStates.every((item) => item.completed)
      ? "Completed"
      : "Pending";

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
        category: currentList.category,
      })
    );

    dispatch(fetchListById(currentList.id));
    setIsEditing(false);

    Swal.fire({
      icon: "success",
      title: "Saved",
      text: "Edited Successfully",
      showConfirmButton: false,
      timer: 1500,
    });
  };

  const handleMarkAsComplete = () => {
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
      <div className="flex justify-center mr-[var(--spacing-78)] mt-[var(--spacing-10xl)] font-bold">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-[var(--spacing-sm)] px-[var(--spacing-2sm)] py-[var(--spacing-sm)] text-[var(--color-bg-light)] bg-transparent hover:bg-[var(--color-gray-800)] rounded-lg font-semibold transition duration-300"
        >
          <FontAwesomeIcon icon={faArrowLeft} />
          Back
        </button>
      </div>

      <div className="flex justify-center">
        <div className="flex flex-col bg-[var(--color-stone-200)] rounded-lg m-[var(--spacing-2sm)] w-fit p-[var(--spacing-10xl)]">
          <h2 className="text-xl font-bold mb-[var(--spacing-2sm)] text-center">
            {currentList.name}
          </h2>

          <p>
            Date: <strong>{currentList.date}</strong>
          </p>
          <p>
            Category: <strong>{currentList.category}</strong>
          </p>
          <p>
            Status: <strong>{currentList.status}</strong>
          </p>

          <p className="mt-4 font-semibold">Items List:</p>
          {itemStates.length > 0 ? (
            <ul className="list-none">
              {itemStates.map((item, index) => (
                <li
                  key={index}
                  className="flex items-center gap-[var(--spacing-sm)] my-[var(--spacing-xs)]"
                >
                  <input
                    type="checkbox"
                    checked={item.completed || false}
                    onChange={(e) =>
                      handleCheckboxChange(index, e.target.checked)
                    }
                  />
                  <span>
                    <strong>Item {index + 1}</strong>:{" "}
                    {isEditing ? (
                      <>
                        <input
                          type="text"
                          value={item.itemName}
                          onChange={(e) =>
                            handleItemChange(index, "itemName", e.target.value)
                          }
                          className="border border-[var(--color-gray-400)] rounded px-[var(--spacing-sm)] py-[var(--spacing-xs)] mr-[var(--spacing-sm)]"
                        />
                        Quantity:{" "}
                        <input
                          type="number"
                          value={item.quantity}
                          onChange={(e) =>
                            handleItemChange(index, "quantity", e.target.value)
                          }
                          className="border border-[var(--color-gray-400)] rounded px-[var(--spacing-sm)] py-[var(--spacing-xs)] w-[var(--spacing-2xl)]"
                        />
                      </>
                    ) : (
                      <>
                        {item.itemName}, Quantity:{" "}
                        <strong>{item.quantity}</strong>
                      </>
                    )}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p>No items listed.</p>
          )}

          <div className="flex gap-[var(--spacing-2sm)] mt-[var(--spacing-l)] justify-center">
            {!isEditing ? (
              <>
                <button
                  onClick={handleEdit}
                  className="px-[var(--spacing-2sm)] py-[var(--spacing-xs)] bg-gradient-to-r from-[var(--color-red-400)] to-[var(--color-gray-400)]  rounded-lg font-semibold"
                >
                  Edit
                </button>
                <button
                  onClick={handleMarkAsComplete}
                  className="px-[var(--spacing-2sm)] py-[var(--spacing-xs)] bg-gradient-to-r from-[var(--color-green-400)] to-[var(--color-gray-400)] rounded-lg font-semibold"
                >
                  Mark All Complete
                </button>
                <button
                  onClick={handleSave}
                  className="px-[var(--spacing-2sm)] py-[var(--spacing-xs)] bg-gradient-to-r from-[var(--color-green-400)] to-[var(--color-gray-400)] rounded-lg font-semibold"
                >
                  Save
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={handleSave}
                  className="px-[var(--spacing-2sm)] py-[var(--spacing-xs)] bg-gradient-to-r from-[var(--color-green-400)] to-[var(--color-gray-400)] rounded-lg font-semibold"
                >
                  Save
                </button>
                <button
                  onClick={handleCancelEdit}
                  className="px-[var(--spacing-2sm)] py-[var(--spacing-xs)] bg-gradient-to-r from-[var(--color-red-400)] to-[var(--color-gray-400)] rounded-lg font-semibold"
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
