import { useParams } from "react-router-dom";
import RightContainer from "../components/RightContainer";
import QRCodeView from "../components/map/QRCode";

const QRCodePage = () => {
  const { id } = useParams();

  return <QRCodeView id={id} />;
};

export default QRCodePage;
