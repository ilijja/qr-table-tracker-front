import React, { Fragment, useRef } from "react";
import { createRoot } from "react-dom/client";
import { Stage, Layer,Text, Circle, Transformer } from "react-konva";
import { useEffect } from "react";

const CircleTable = ({ shapeProps, isSelected, onSelect, onChange }) => {
  const shapeRef = useRef();
  const trRef = useRef();

  useEffect(() => {
    if (isSelected) {
      trRef.current.nodes([shapeRef.current]);
      trRef.current.getLayer().batchDraw();
    }
  }, [isSelected]);

  const handleDragEnd = (e) => {
    onChange({
      ...shapeProps,
      x: e.target.x(),
      y: e.target.y(),
    });
  };

  const handleTransformEnd = () => {
    const node = shapeRef.current;
    const scaleX = node.scaleX();
    const scaleY = node.scaleY();

    node.scaleX(1);
    node.scaleY(1);

    onChange({
      ...shapeProps,
      x: node.x(),
      y: node.y(),
      width: node.width() * scaleX,
      height: node.height() * scaleY,
      _id: shapeProps._id,
    });
  };

  return (
    <Fragment>
      <Circle
        onClick={() => onSelect()}
        onTap={() => onSelect()}
        ref={shapeRef}
        name={shapeProps.name? shapeProps.name : ''}
        fill={shapeProps.fill}
        shadowColor="black"
        shadowOpacity={0.5}
        shadowBlur={7}
        shadowEnabled="true"
        shadowOffsetY={3}
        shadowOffsetX={2}
        radius={50}
        {...shapeProps}
        draggable
        onDragEnd={handleDragEnd}
        onTransformEnd={handleTransformEnd}
      />
      {shapeProps.name && <Text
        listening={false}
        text={shapeProps.name}
        x={shapeProps.x } 
        y={shapeProps.y } 
        fontSize={20}
        fill="black" 
        align="center" 
        offsetX={5} 
        offsetY={8} 
      />}
      {isSelected && (
        <Transformer
          ref={trRef}
          flipEnabled={false}
          boundBoxFunc={(oldBox, newBox) => {
            if (Math.abs(newBox.width) < 5 || Math.abs(newBox.height) < 5) {
              return oldBox;
            }
            return newBox;
          }}
        />
      )}
    </Fragment>
  );
};

export default CircleTable;
