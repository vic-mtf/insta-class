import React from "react";

const managerRouter = ({ element, children, ...data }) => ({
  element: element && React.createElement(element),
  ...(children && { children: children?.map(managerRouter) }),
  ...data,
});

export default managerRouter;
