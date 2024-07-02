import RightContainer from "../RightContainer";
import React from "react";
import QRCode from "react-qr-code";

const QRCodeView = ({ id }) => {
  const url = `http://localhost:5173/table/${id}`;

  return (
    <RightContainer>
      <div className="flex justify-center items-center">
      <QRCode
        size={256}
        style={{ height: "auto", maxWidth: "50%", width: "50%" }}
        value={url}
        viewBox={`0 0 256 256`}
      />
      </div>
    </RightContainer>
  );
};

export default QRCodeView;
