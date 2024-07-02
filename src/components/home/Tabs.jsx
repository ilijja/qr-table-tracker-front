import { useEffect, useContext, useState } from "react";
import RightContainer from "../RightContainer";
import MapView from "../map/MapView";
import { useNavigate, useSubmit } from "react-router-dom";
import UserProgressContext from "../../store/UserProgressContext";
import MapContext from "../../store/MapContext";
import Modal from "../Modal";
import OrderQuickview from "../user/OrderQuickview";
import { CirclePlus } from "lucide-react";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Tabs = () => {
  const {
    currentTab,
    setCurrentTab,
    currentTable,
    setCurrentTable,
    showOrdersModal,
  } = useContext(UserProgressContext);
  const { maps } = useContext(MapContext);

  const submit = useSubmit();
  const navigate = useNavigate()

  useEffect(() => {
    if (!maps.length) return;

    const updatedCurrentTab = currentTab
      ? maps.find((map) => map._id === currentTab._id) || maps[0]
      : maps[0];

    setCurrentTab(updatedCurrentTab);
    if (currentTab) {
      const tableIdx = currentTab.tables.findIndex(
        (table) => table._id === currentTable?._id
      );
      if (tableIdx !== -1) {
        setCurrentTable(currentTab.tables[tableIdx]);
      }
    }
  }, [maps, currentTab, setCurrentTab]);

  const onClickItem = (table) => {
    setCurrentTable(table);
    showOrdersModal();
  };

  const handleAddMap = () => {
    navigate('/maps')
  }

  return (
    <>
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="overflow-hidden sm:rounded-lg pb-3">
          <nav
            className="isolate flex divide-x divide-gray-200 rounded-lg shadow"
            aria-label="Tabs"
          >
            {maps.map((map) => (
              <button
                key={map._id}
                onClick={() => setCurrentTab(map)}
                className={classNames(
                  map._id === currentTab?._id
                    ? "text-gray-900"
                    : "text-gray-500 hover:text-gray-700",
                  "group relative min-w-0 flex-1 overflow-hidden bg-white py-4 px-4 text-center text-sm font-medium hover:bg-gray-50 focus:z-10"
                )}
                aria-current={map._id === currentTab?._id ? "page" : undefined}
              >
                {map.name}
                <span
                  aria-hidden="true"
                  className={classNames(
                    map._id === currentTab?._id
                      ? "bg-indigo-500"
                      : "bg-transparent",
                    "absolute inset-x-0 bottom-0 h-0.5"
                  )}
                />
              </button>
            ))}
          </nav>
        </div>
      </div>

      {maps.length > 0 && (
        <RightContainer className="bg-floor-pattern flex justify-center">
          {currentTab && (
            <MapView tables={currentTab.tables} onClickItem={onClickItem} />
          )}
        </RightContainer>
      )}

      {maps.length === 0 && (
        <RightContainer>
          <div className="gap-2 w-full h-64 rounded-lg border border-dashed border-gray-200 items-center justify-center">
            <div className="flex flex-col items-center justify-center gap-2  h-full w-full bg-gray-100 rounded-lg">
              <CirclePlus size={32} className=" text-gray-500"/>
              <p className="text-gray-800 text-md mt-2 font-medium">No maps added</p>
              <p className="text-gray-500 text-sm font-light mb-2">You have not added any map. Add one below.</p>
              <button
                type="button"
                onClick={handleAddMap}
                className="flex p-3 w-32 justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Add Map
              </button>
            </div>
          </div>
        </RightContainer>
      )}

      <OrderQuickview />
    </>
  );
};

export default Tabs;
