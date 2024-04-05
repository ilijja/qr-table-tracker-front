import React, { Fragment } from "react";
import RightContainer from "../RightContainer";
import { useContext } from "react";
import UserProgressContext from "../../store/UserProgressContext";
import MapEditorContainer from "./MapEditorContainer";
import MapList from "./MapList";
import MapContext from "../../store/MapContext";

const MapEditor = () => {

  const userProgressCtx = useContext(UserProgressContext)
  const {setCurrentMap, currentMap, maps, clearCurrentMap} = useContext(MapContext)
  
  const addMapHandler = () => {
    clearCurrentMap()
    userProgressCtx.showAddMap();
  };

  const onClickMapHandler = (mapId) => {
    setCurrentMap(mapId)
    userProgressCtx.showAddMap()
  }
  
  const map = maps.find(map => map._id === currentMap);

  return (
    <Fragment>
      <RightContainer>
      <div className="border-b border-gray-200 bg-white px-4 py-5 sm:px-6">
        <div className="-ml-4 -mt-4 flex flex-wrap items-center justify-between sm:flex-nowrap">
          <div className="ml-4 mt-4">
            <h1 className="text-2xl font-semibold leading-1 text-gray-900">
              Maps
            </h1>
            <p className="mt-1 text-sm text-gray-500"></p>
          </div>
          <div className="ml-4 mt-4 flex-shrink-0">
            <button
              type="button"
              onClick={addMapHandler}
              className="relative inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Add Map
            </button>
          </div>
        </div>
      </div>

      
      <MapList onClickMapHandler={onClickMapHandler}/>
    </RightContainer>

       <MapEditorContainer data={map}/>
    </Fragment>
  );
};

export default MapEditor;
