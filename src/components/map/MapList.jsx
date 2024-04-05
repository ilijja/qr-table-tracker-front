import RightContainer from "../RightContainer";
import MapContext from "../../store/MapContext";
import { useContext } from "react";
import MapItem from "./MapItem";
import { useNavigation } from "react-router-dom";

const MapList = ({ onClickMapHandler }) => {
  const { maps } = useContext(MapContext);
  const navigation = useNavigation()

    const isSubmitting = navigation.state === 'submitting';


  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:py-6 lg:max-w-7xl ">
        <ul role="list" className="divide-y divide-gray-200 ">
          <li>
            {maps.map((map) => (
              <MapItem
                onClick={isSubmitting? undefined : () => onClickMapHandler(map._id)}
                key={map._id}
                mapId={map._id}
                name={map.name}
              />
            ))}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default MapList;
