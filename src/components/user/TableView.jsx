import { useNavigate } from "react-router-dom";
import logoImg from "../../assets/bg/icon.png";

const TableView = ({ tableId }) => {

  const navigate = useNavigate();

  const payNowHandler = () => {
    navigate(`/payment/${tableId}`)
  };

  const viewMenuHandler = () => {
    navigate(`/menu/${tableId}`)
  };

  return (
    <>
      <div className="flex flex-col h-screen w-screen overflow-hidden">
        <div className="w-full h-full img bg-menu-pattern"></div>

        <div
          className={`transition-all ease-in-out duration-500 absolute top-1/3 h-2/3 w-full bg-black bg-opacity-70`}
          style={{
            borderTopLeftRadius: "100% 10%",
            borderTopRightRadius: "100% 10%",
          }}
        >
          <div className="relative bottom-16">
            <div className="flex justify-center">
              <div className="w-32 h-32 bg-transparent">
                <img src={logoImg} alt="" />
              </div>
            </div>
          </div>

          <div className="flex flex-row justify-center -mt-10">
            <h1 className="text-white text-2xl">Kafeterija</h1>
          </div>

          <div
            className={`relative top-16 flex flex-col gap-3 overflow-y-auto p-3 bg-transparent h-5/6"`}
          >
            <div className="flex flex-col justify-between gap-3">
              <button
                type="button"
                onClick={payNowHandler}
                className="rounded-full w-full bg-indigo-600 px-3 py-3 text-lg font-semibold text-white shadow-sm hover:bg-indigo-500"
              >
                Pay Now
              </button>

              <button
                type="button"
                onClick={viewMenuHandler}
                className="rounded-full w-full bg-indigo-100 px-3 py-3 text-lg font-semibold text-indigo-600 shadow-sm focus-visible:outline focus-visible:outline-indigo-600 focus-visible:outline-offset-2 hover:bg-indigo-200"
              >
                View Menu
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TableView;
