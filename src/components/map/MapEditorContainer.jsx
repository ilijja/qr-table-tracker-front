import React, { Fragment, useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { Stage, Layer, Rect, Transformer, Circle } from "react-konva";
import Rectangle from "./Rectangle";
import RightContainer from "../RightContainer";
import Table from "./Table";
import { useSubmit } from "react-router-dom";
import { useContext } from "react";
import UserProgressContext from "../../store/UserProgressContext";
import Modal from "../Modal";
import { Dialog } from "@headlessui/react";
import MapActions from "./MapActions";
import MapContext from "../../store/MapContext";

const MapEditorContainer = ({ data }) => {
  const userProgressCtx = useContext(UserProgressContext);
  const {currentMap, maps, setMaps, setContextTables} = useContext(MapContext);

  const submit = useSubmit();

  const [tables, setTables] = useState([]);
  const [selectedId, selectShape] = useState(null);
  const [currentTable, setCurrentTable] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [tableName, setCurrentTableName] = useState('')

  useEffect(() => {
    setTables(data ? data.tables : []);
  }, [data, setTables]);

  const checkDeselect = (e) => {
    const clickedOnEmpty = e.target === e.target.getStage();
    setCurrentTable(null);
    if (clickedOnEmpty) {
      selectShape(null);
    }
  };

  const handleMouseMove = (e) => {
    if (!currentTable) return;
    setIsDragging(true);
    const stage = e.target.getStage();
    const pointerPosition = stage.getPointerPosition();

    let x = pointerPosition.x - 30;
    let y = pointerPosition.y - 30;

    if (currentTable.shape === "circle") {
      x = x + 25;
      y = y + 25;
    }

    setCurrentTable({
      ...currentTable,
      x: x,
      y: y,
    });
  };

  const handleStageClick = (e) => {
    if (!currentTable) return;

    setTables((tables) => {
      return [
        ...tables,
        {
          ...currentTable,
          fill: "#228B22",
          _id: `table${Math.random()}`,
        },
      ];
    });

    setIsDragging(false);
    selectShape(null);
    setCurrentTable(null);
  };

  const addCircleTable = () => {
    setCurrentTable({ x: 0, y: 0, width: 50, height: 50, shape: "circle" });
  };

  const addRectTable = () => {
    setCurrentTable({ x: 0, y: 0, width: 50, height: 50, shape: "rect" });
  };

  const handleInputName = (e) => {
    setCurrentTableName(e.target.value)
  }

  const setNameHandler = () => {
    const table = tables.find(table => table._id === selectedId)
    table.name = tableName;
    setCurrentTableName('')
  }

  const deleteTableHandler = () => {
    const newTables = tables.filter(table => table._id !== selectedId);
    setTables(newTables);
    if (currentMap) {
      setContextTables(currentMap, newTables);
    }
  };
  

  const onSaveMapHandler = () => {
    const formData = new FormData();

    formData.append("tables", JSON.stringify(tables));
    formData.append("mapName", JSON.stringify("test"));

    submit(formData, { method: "POST" });
    closeModalMenu();
  };

  const onEditMapHandler = () => {

    const updatedMaps = maps.map(map => {
      if (map._id === currentMap) {
        return { ...map, tables: [...tables] };
      }
      return map;
    });

    setMaps(updatedMaps);
    
    const formData = new FormData();
    const updatedMap = updatedMaps.find(map => map._id === currentMap);
    formData.append("map", JSON.stringify(updatedMap));
  
    submit(formData, { method: "PUT" });
    closeModalMenu();
  }

  const addBarHandler = () => {};

  const handleTableChange = (newAttrs) => {
    const updatedTables = tables.map((table) => {
      if (table._id === newAttrs._id) {
        return { ...table, ...newAttrs };
      }
      return table;
    });
    setTables(updatedTables);
  };

  const closeModalMenu = () => {
    userProgressCtx.hideAddMap();
    selectShape(null)
  };

  return (
    <Modal open={userProgressCtx.progress === "map"} onClose={closeModalMenu}>
      <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-4xl sm:p-6">
        <RightContainer className="bg-floor-pattern">
          <Stage
            width={768}
            height={420}
            onMouseDown={handleStageClick}
            onTouchStart={checkDeselect}
            onMouseMove={handleMouseMove}
            onClick={checkDeselect}
          >
            <Layer>
              {tables.map((table) => {
                return (
                  <Table
                    key={table._id}
                    shape={table.shape}
                    table={table}
                    name={table.name}
                    selectedId={selectedId}
                    onSelect={selectShape}
                    onChange={handleTableChange}
                  />
                );
              })}

              {currentTable && isDragging && currentTable.shape === "rect" && (
                <Rect
                  x={currentTable.x}
                  y={currentTable.y}
                  width={currentTable.width}
                  height={currentTable.height}
                  fill={"#ddd"}
                  opacity={0.5}
                />
              )}

              {currentTable &&
                isDragging &&
                currentTable.shape === "circle" && (
                  <Circle
                    x={currentTable.x}
                    y={currentTable.y}
                    width={currentTable.width}
                    height={currentTable.height}
                    fill={"#ddd"}
                    opacity={0.5}
                  />
                )}
            </Layer>
          </Stage>

          <div className="flex justify-center">
            <MapActions
              nameInputHandler={handleInputName}
              addRectTable={addRectTable}
              addCircleTable={addCircleTable}
              deleteTable={deleteTableHandler}
              selectedId={selectedId}
            />

          </div>
        </RightContainer>
        <div className="flex justify-center gap-1">
          <button
            type="button"
            onClick={currentMap? onEditMapHandler : onSaveMapHandler}
            className="rounded-md bg-indigo-600 mt-5 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            {currentMap? "Edit" : "Save"}
          </button>
          <button
            type="button"
            onClick={setNameHandler}
            className="rounded-md bg-indigo-600 mt-5 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Set name
          </button>
        </div>
      </Dialog.Panel>
    </Modal>
  );
};

export default MapEditorContainer;
