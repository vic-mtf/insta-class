import { createElement } from "react";

const renderIcon = ({ icon = "div", children, ...keys }) => ({
  ...keys,
  icon: createElement(icon),
  ...(Array.isArray(children) && { children: children.map(renderIcon) }),
});

export default renderIcon;
