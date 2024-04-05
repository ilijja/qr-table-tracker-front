import React, { Fragment, useRef, useState } from "react";
import { Text, Rect, Transformer } from "react-konva";
import { useEffect } from "react";

const RectangleTable = ({ shapeProps, isSelected, onSelect, onChange }) => {
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
      <Rect
        onClick={() => onSelect()}
        onTap={() => onSelect()}
        name={shapeProps.name ? shapeProps.name : ''}
        ref={shapeRef}
        fill={shapeProps.fill}
        shadowColor="black"
        shadowOpacity={0.5}
        shadowBlur={7}
        cornerRadius={6}
        shadowEnabled="true"
        shadowOffsetY={3}
        shadowOffsetX={2}
        {...shapeProps}
        draggable
        onDragEnd={handleDragEnd}
        onTransformEnd={handleTransformEnd}
      />
      
        {shapeProps.name && <Text
          listening={false}
          text={shapeProps.name}
          fontSize={20}
          fill="black"
          align="center"
          x={shapeProps.x + shapeProps.width / 2}
          y={shapeProps.y + shapeProps.height / 2}
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

export default RectangleTable;
