import React from "react";
import { useParams } from "react-router-dom";

const PageNotFound = () => {
    const params = useParams();
  return <div>"{params.pagename}" page not found</div>;
};

export default PageNotFound;
