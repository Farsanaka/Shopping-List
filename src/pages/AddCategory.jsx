import { useState } from "react";
import BackgroundLayout from "../components/BackgroudLayout";
import Header from "../components/Header";

function AddCategory() {
  const [code, setCode] = useState("");
  const [name, setName] = useState("");
  const [items, setItems] = useState([]);

  const handleAdd = () => {
    if (code && name) {
      setItems([...items, { code, name }]);
      setCode("");
      setName("");
    }
  };

  const handleDelete = (id) => {
    setItems(items.filter((_, i) => i !== id));
  };

  return (
    <BackgroundLayout bgImage="/img/homebg.jpg">
      <Header />
      <div className="flex justify-center">
        <div className="bg-stone-300 rounded-lg m-4 w-fit">
          <p className="p-2 text-center font-bold text-lg">ADD CATEGORY</p>

          <div className="flex justify-center gap-5 px-1">
            <input
              type="text"
              placeholder="Code"
              className="bg-white m-4 text-center rounded-lg"
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />
            <input
              type="text"
              placeholder="Name"
              className="bg-white m-4 px-5 h-7 text-center rounded-lg"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <button
              className="px-4 py-1 bg-gradient-to-r from-green-400 to-gray-400 rounded-lg font-semibold h-7  mt-4"
              onClick={handleAdd}
            >
              Add
            </button>
          </div>
          {items.length > 0 && (
            <div className="m-4">
              <p className="p-2 text-center font-bold text-lg">ADDED ITEMS</p>

              <ul>
                {items.map((item, id) => (
                  <li
                    key={id}
                    className="flex justify-between items-center mb-2"
                  >
                    {/* Code input */}
                    <input
                      type="text"
                      readOnly
                      value={item.code}
                      className="bg-white rounded-lg px-1 py-1 mr-2 text-center"
                    />

                    {/* Name input */}
                    <input
                      type="text"
                      readOnly
                      value={item.name}
                      className="bg-white rounded-lg px-1 py-1 mr-4 text-center "
                    />

                    <button
                      className="px-4 py-1 bg-gradient-to-r from-red-400 to-gray-400 rounded-lg font-semibold text-white "
                      onClick={() => handleDelete(id)}
                    >
                      Delete
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </BackgroundLayout>
  );
}

export default AddCategory;
