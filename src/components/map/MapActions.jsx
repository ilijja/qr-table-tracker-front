const MapActions = ({addCircleTable, addRectTable, deleteTable, selectedId, nameInputHandler}) => {
  return (
    <span className="isolate inline-flex rounded-md shadow-sm">
      <button
        type="button"
        onClick={addRectTable}
        className="relative inline-flex items-center rounded-l-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10"
      >
        Rect
      </button>
      <button
        type="button"
        onClick={addCircleTable}
        className="relative -ml-px inline-flex items-center bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10"
      >
        Circle
      </button>
      <button
        type="button"
        onClick={deleteTable}
        className="relative -ml-px inline-flex items-center rounded-r-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10"
      >
        Delete
      </button>

      {selectedId && <div>
      <label htmlFor="email" className="sr-only">
        Number
      </label>
      <input
        type="text"
        onChange={nameInputHandler}
        defaultValue={''}
        name="text"
        id="text"
        className="block max-w-fit rounded-md border-0 ml-2 p-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        placeholder="Table name"
      />
    </div>}
    </span>
  );
};

export default MapActions;
