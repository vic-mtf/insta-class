import { Box, useTheme } from "@mui/material";
import { forwardRef } from "react";
import { VirtuosoGrid, Virtuoso } from "react-virtuoso";
import PropTypes from "prop-types";
import { useMediaQuery } from "@mui/material";

const List = forwardRef(({ style, children, ...props }, ref) => (
  <div
    ref={ref}
    {...props}
    style={{
      display: "flex",
      flexWrap: "wrap",
      ...style,
    }}>
    {children}
  </div>
));
const ItemWrapper = ({ children, ...props }) => (
  <div
    {...props}
    style={{
      display: "flex",
      flex: 1,
      textAlign: "center",
      whiteSpace: "nowrap",

      margin: 5,
    }}>
    {children}
  </div>
);

List.displayName = "List";

const Item = ({ children, ...props }) => (
  <Box
    {...props}
    sx={{
      width: {
        xs: `${100 / 1}%`,
        sm: `${100 / 2}%`,
        lg: `${100 / 5}%`,
        xl: `${100 / 8}%`,
        md: `${100 / 2}%`,
      },
      display: "flex",
      flex: "none",
      alignContent: "stretch",
      boxSizing: "border-box",
    }}>
    {children}
  </Box>
);

Item.propTypes = {
  children: PropTypes.node.isRequired,
};

ItemWrapper.propTypes = {
  children: PropTypes.node.isRequired,
};
List.propTypes = {
  style: PropTypes.object,
  children: PropTypes.node.isRequired,
};
const VirtualList = ({ itemContent, totalCount }) => {
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <>
      <Box
        component={isSmall ? Virtuoso : VirtuosoGrid}
        style={{ height: "100%" }}
        sx={{ mx: 1 }}
        totalCount={totalCount}
        components={{ ...(!isSmall && { List, Item }) }}
        itemContent={(index) => (
          <Box component={isSmall ? "div" : ItemWrapper}>
            {itemContent(index)}
          </Box>
        )}
      />
    </>
  );
};

VirtualList.propTypes = {
  itemContent: PropTypes.func.isRequired,
  totalCount: PropTypes.number.isRequired,
};
export default VirtualList;
