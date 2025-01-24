import React from "react";

const managerRouter = ({ element, ...data }) => ({
  element: React.createElement(element),
  ...data,
});

export default managerRouter;
