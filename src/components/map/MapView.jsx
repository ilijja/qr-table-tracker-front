import { Circle, Text, Layer, Rect, Stage } from "react-konva";
import React, { useEffect, useState } from "react";

const MapView = ({ tables, onClickItem }) => {

  return (
    <>
      <Stage width={768} height={420} draggable={true}>
        <Layer>
          {tables.map((table) => (
            <React.Fragment key={table._id}>
              {table.shape === "rect" && (
                <>
                  <Rect
                    onClick={() => onClickItem(table)}
                    onTap={() => onClickItem(table)}
                    fill={table.fill}
                    shadowColor="black"
                    shadowOpacity={0.5}
                    shadowBlur={7}
                    name={table.name ? table.name : ""}
                    cornerRadius={6}
                    shadowEnabled={true}
                    shadowOffsetY={3}
                    shadowOffsetX={2}
                    {...table}
                  />
                  {table.name && (
                    <Text
                      listening={false}
                      text={table.name}
                      fontSize={20}
                      fill="black"
                      align="center"
                      x={table.x + table.width / 2}
                      y={table.y + table.height / 2}
                      offsetX={5}
                      offsetY={8}
                    />
                  )}
                </>
              )}
              {table.shape === "circle" && (
                <>
                  <Circle
                    onClick={() => onClickItem(table)}
                    onTap={() => onClickItem(table)}
                    fill={table.fill}
                    shadowColor="black"
                    shadowOpacity={0.5}
                    shadowBlur={7}
                    shadowEnabled={true}
                    shadowOffsetY={3}
                    shadowOffsetX={2}
                    {...table}
                  />
                  {table.name && (
                    <Text
                      listening={false}
                      text={table.name}
                      x={table.x}
                      y={table.y}
                      fontSize={20}
                      fill="black"
                      align="center"
                      offsetX={5}
                      offsetY={8}
                    />
                  )}
                </>
              )}
            </React.Fragment>
          ))}
        </Layer>
      </Stage>
    </>
  );
};

export default MapView;
