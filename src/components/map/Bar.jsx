import { Stage, Layer, Line, Rect } from 'react-konva';

const BarShape = ({ x, y, width, height, fillColor }) => {
  const strokeWidth = 55;

  const horizontalLinePoints = [0, 0, width, 0];

  const verticalLinePoints = [width, 0, width, height];

  return (
    <>
      <Line
        points={horizontalLinePoints}
        stroke={fillColor}
        strokeWidth={strokeWidth}
        lineCap="butt"
        lineJoin="miter"
      />
      <Line
        points={verticalLinePoints}
        stroke={fillColor}
        strokeWidth={strokeWidth}
        lineCap="butt"
        lineJoin="miter"
      />
    </>
  );
};


export default BarShape;