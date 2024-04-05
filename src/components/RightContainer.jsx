const RightContainer = ({ children, className, bg }) => {
  return (
    <>
      <div className="px-4 sm:px-6 lg:px-8 ">
        <div className={`overflow-hidden bg-white rounded-lg sm:shadow p-3 ${className || ''}`}>
            {children}
        </div>
      </div>
    </>
  );
};

export default RightContainer;
