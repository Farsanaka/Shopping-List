import BackgroundLayout from "../components/BackgroudLayout";
import Logo from "../components/Logo";
import Header from "../components/Header";

function AddList() {
  return (
    <BackgroundLayout bgImage="/img/homebg.jpg">
      <Header />
      <div className="flex justify-center">
        <div className="flex flex-col justify-center bg-stone-300 rounded-lg m-4 w-fit center">
          <p className="p-2 text-center font-bold text-lg">ADD NEW LIST</p>

          <div className="flex justify-center gap-15 mx-6 my-4">
            <input
              type="text"
              placeholder="Name"
              className="bg-white rounded-lg text-center"
            />
            <select>
              <option value="someOption">Choose Category</option>
              <option value="otherOption">Other option</option>
            </select>
            <button className="px-4 py-1 bg-gradient-to-r from-green-400  to-gray-400 rounded-lg font-semibold">
              Add List
            </button>
            <button className="px-4 py-1 bg-gradient-to-r from-fuchsia-300  to-gray-400 rounded-lg font-semibold">
              Add Category
            </button>
          </div>
          <div className="flex  gap-15 mx-6 my-4">
            <input
              type="text"
              placeholder="Quantity"
              className="bg-white rounded-lg text-center"
            />
            <input
              type="text"
              placeholder="Item Name / Description"
              className="bg-white rounded-lg text-center px-3"
            />
            <button className="px-4 py-1 bg-gradient-to-r from-green-400  to-gray-400 rounded-lg font-semibold">
              Add Item
            </button>
          </div>
        </div>
      </div>
    </BackgroundLayout>
  );
}

export default AddList;
