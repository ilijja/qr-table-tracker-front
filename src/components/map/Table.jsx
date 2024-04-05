import CircleTable from "./Circle";
import RectangleTable from "./Rectangle";


const Table = ({ shape, table, onChange, selectedId, onSelect }) => {

  return (
    <>
      {shape === "rect" && (
        <RectangleTable
          shapeProps={table}
          isSelected={table._id === selectedId}
          onSelect={() => onSelect(table._id)}
          onChange={onChange}
        />
      )}
      {shape === "circle" && (
        <CircleTable
          shapeProps={table}
          isSelected={table._id === selectedId}
          onSelect={() => onSelect(table._id)}
          onChange={onChange}
        />
      )}
    </>
  );
};

export default Table;
