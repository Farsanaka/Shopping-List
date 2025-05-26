import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAll,
  addCategory,
  setCode,
  setCategory,
  updateCategory,
  deleteCategory,
} from "../redux/categorySlice";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function Category() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { categories, error, status, code, category } = useSelector(
    (state) => state.category
  );
  //
  const currentUser = useSelector((state) => state.auth.user);
  //
  const [editIndex, setEditIndex] = useState(null);
  const [editData, setEditData] = useState({ code: "", category: "" });

  useEffect(() => {
    if (currentUser?.id) {
      dispatch(fetchAll(currentUser.id));
    }
  }, [dispatch, currentUser]);

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (status === "failed") {
    return <p className="text-red-500">Error: {error}</p>;
  }

  const handleAdd = () => {
    if (category.trim()) {
      const newCategory = { code, category, userId: currentUser.id };
      dispatch(addCategory(newCategory));
      dispatch(setCategory(""));
      dispatch(setCode(""));

      Swal.fire({
        icon: "success",
        title: "Success!",
        text: "Category added successfully!",
        showConfirmButton: false,
        showCloseButton: true,
        allowOutsideClick: false,
        allowEscapeKey: true,
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Validation Error",
        text: "Category name cannot be empty!",
        confirmButtonText: "OK",
      });
    }
  };

  const handleDelete = (id) => {
    dispatch(deleteCategory(id));
  };

  return (
    <div>
      {/* Back Button */}
      <div className="flex justify-center mr-[var(--spacing-3xl)] mt-[var(--spacing-xl)] font-bold">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 px-[var(--spacing-md)] py-[var(--spacing-xs)] text-[var(--color-bg-light)] bg-[var(--color-gray-700)] rounded hover:bg-gray-800"
        >
          <FontAwesomeIcon icon={faArrowLeft} />
          Back
        </button>
      </div>

      {/* Category Container */}
      <div className="flex justify-center">
        <div className="bg-[var(--color-gray-300)] rounded-[var(--radius-lg)] m-[var(--spacing-md)] w-fit shadow-md">
          <p className="p-[var(--spacing-sm)] text-center font-bold text-[var(--text-xl)]">
            CATEGORY LIST
          </p>

          {/* Input and Add Button */}
          <div className="flex justify-center m-[var(--spacing-md)] border border-gray-400 p-[var(--spacing-md)] rounded-[var(--radius-lg)] shadow-lg">
            <input
              type="text"
              placeholder="Code"
              value={code}
              onChange={(e) => dispatch(setCode(e.target.value))}
              className="bg-[var(--color-bg-light)] rounded-[var(--radius-lg)] text-center mx-[var(--spacing-md)] shadow-lg shadow-gray-400/50 focus:outline-none focus:ring-2 focus:ring-gray-400 px-3 py-1"
              style={{ width: "120px" }}
            />
            <input
              type="text"
              placeholder="Name"
              value={category}
              onChange={(e) => dispatch(setCategory(e.target.value))}
              className="bg-[var(--color-bg-light)] rounded-[var(--radius-lg)] text-center mx-[var(--spacing-md)] shadow-lg shadow-gray-400/50 focus:outline-none focus:ring-2 focus:ring-gray-400 px-3 py-1"
              style={{ width: "180px" }}
            />
            <button
              onClick={handleAdd}
              className="px-[var(--spacing-md)] py-[var(--spacing-xs)] mx-[var(--spacing-md)] bg-gradient-to-r from-[var(--color-green-400)] to-[var(--color-gray-300)] rounded-[var(--radius-lg)] shadow-lg shadow-gray-400/50 font-semibold"
            >
              Add
            </button>
          </div>

          {/* Category List */}
          <ul className="m-[var(--spacing-md)] mt-[var(--spacing-xl)]">
            {/* List Header */}
            <li className="flex gap-4 mb-2">
              <div className="bg-[var(--color-gray-200)] rounded-[var(--radius-lg)] px-2 py-1 text-center w-[200px] font-semibold">
                CODE
              </div>
              <div className="bg-[var(--color-gray-200)] rounded-[var(--radius-lg)] px-2 py-1 text-center w-[200px] font-semibold">
                CATEGORY NAME
              </div>
            </li>

            {/* Category Items */}
            {categories
              .filter((cat) => cat.userId === currentUser.id)
              .map((cat, index) => (
                <li key={cat.id} className="flex gap-4 mb-2 items-center">
                  {editIndex === index ? (
                    <>
                      <input
                        type="text"
                        value={editData.code}
                        onChange={(e) =>
                          setEditData({ ...editData, code: e.target.value })
                        }
                        className="shadow-lg shadow-gray-400/50 bg-[var(--color-bg-light)] rounded-[var(--radius-lg)] px-2 py-1 text-center w-[200px]"
                      />
                      <input
                        type="text"
                        value={editData.category}
                        onChange={(e) =>
                          setEditData({ ...editData, category: e.target.value })
                        }
                        className="shadow-lg shadow-gray-400/50 bg-[var(--color-bg-light)] rounded-[var(--radius-lg)] px-2 py-1 text-center w-[200px]"
                      />
                      <div className="w-[90px] flex items-center justify-center">
                        <button
                          onClick={() => {
                            dispatch(
                              updateCategory({ ...editData, id: cat.id })
                            );
                            setEditIndex(null);
                          }}
                          className="shadow-lg shadow-gray-400/50 px-4 py-1 bg-gradient-to-r from-green-400 to-[var(--color-gray-300)] rounded-[var(--radius-lg)] font-semibold"
                        >
                          Save
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      <input
                        type="text"
                        readOnly
                        value={cat.code}
                        className="shadow-lg shadow-gray-400/50 bg-[var(--color-bg-light)] rounded-[var(--radius-lg)] px-2 py-1 text-center w-[200px]"
                      />
                      <input
                        type="text"
                        readOnly
                        value={cat.category}
                        className="shadow-lg shadow-gray-400/50 bg-[var(--color-bg-light)] rounded-[var(--radius-lg)] px-2 py-1 text-center w-[200px]"
                      />
                      <button
                        onClick={() => {
                          setEditIndex(index);
                          setEditData(cat);
                        }}
                        className="shadow-lg shadow-gray-400/50 px-4 py-1 bg-gradient-to-r from-amber-400 to-[var(--color-gray-300)] rounded-[var(--radius-lg)] font-semibold"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(cat.id)}
                        className="shadow-lg shadow-gray-400/50 px-4 py-1 bg-gradient-to-r from-[var(--color-red-800)] to-[var(--color-secondary)]  rounded-[var(--radius-lg)] font-semibold"
                      >
                        Delete
                      </button>
                    </>
                  )}
                </li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Category;
