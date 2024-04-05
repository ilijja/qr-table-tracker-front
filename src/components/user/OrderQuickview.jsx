import UserProgressContext from "../../store/UserProgressContext";
import Modal from "../Modal";
import { Dialog } from "@headlessui/react";
import { useContext, useEffect, useState } from "react";
import { useSubmit } from "react-router-dom";
import OrderQuickViewContainer from "./OrderQuickViewContainer";
import RightContainer from "../RightContainer";

const OrderQuickview = () => {

  return (
    <OrderQuickViewContainer/>
  );
};

export default OrderQuickview;
