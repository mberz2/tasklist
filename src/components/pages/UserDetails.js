import React from "react";
import { useParams } from "react-router-dom";

const userDetails = () => {
  const params = useParams();

  return params;
};

export default userDetails;
