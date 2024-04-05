const MenuItem = (props) => {
  return (
    <>
      <div className="px-2 py-2 sm:px-6 cursor-pointer block hover:bg-gray-50 rounded-lg" onClick={props.onClick} key={props.menuId}>
        <div className="flex items-center justify-between">
          <div className="truncate text-sm font-medium text-indigo-1000">
            {props.menuName}
          </div>
          <div className="ml-2 flex flex-shrink-1">
            <span className="inline-flex items-center rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
              Active
            </span>
          </div>
        </div>
        <div className="mt-2 flex justify-between">
          <div className="sm:flex">
            <div className="flex items-center text-sm text-gray-500">
              Description
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MenuItem;
