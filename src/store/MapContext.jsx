import { createContext, useReducer, useCallback, useState } from "react";

const MapContext = createContext({
  maps: [],
  currentMap: null,
  test: '',
  setMaps: () => {},
  setContextTables: () => {},
  setCurrentMap: () => {},
  clearCurrentMap: () => {},
  setTest: () => {},
  setTable: () => {},
});

function mapReducer(state, action) {
  switch (action.type) {
    case "SET_TABLE":
        // console.log(state.maps);
        // console.log(action.table);
        const mapsUpdated = state.maps.map((map) => {
            const updatedTables = map.tables.map(table => {
                if(table._id === action.table._id){
                    return {...table, ...action.table}
                }
                return table
            })
            return {...map, tables: updatedTables}
        })
        
        const newState = {...state, maps: mapsUpdated}
        return newState
    case "SET_TABLES":
      const updatedMaps = state.maps.map((map) => {
        if (map._id === action.mapId) {
          return { ...map, tables: action.tables };
        }
        return map;
      });
      return { ...state, maps: updatedMaps };
    case "SET_MAPS":
        const result = {...state, maps: action.maps}
      return result
    default:
      return state;
  }
}


export function MapContextProvider({ children }) {
  const [mapState, dispatchMap] = useReducer(mapReducer, { maps: [] });
  const [currentMap, setMap] = useState(null);

  const setMaps = (maps) => {
      dispatchMap({ type: "SET_MAPS", maps: maps });
    }

  const setContextTables = (mapId, tables) => {
      dispatchMap({ type: "SET_TABLES", tables: tables, mapId: mapId });
    }

  const setCurrentMap = (id) => {
    setMap(id);
  };

  const clearCurrentMap = () => {
    setMap(null);
  };

  const setTable = (table) => {
    dispatchMap({type: "SET_TABLE", table: {...table}})
  }

  const mapContext = {
    maps: mapState.maps,
    currentMap: currentMap,

    setMaps,
    setCurrentMap,
    clearCurrentMap,
    setContextTables,
    setTable,
  };

  return (
    <MapContext.Provider value={mapContext}>{children}</MapContext.Provider>
  );
}

export default MapContext;
