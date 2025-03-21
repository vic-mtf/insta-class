import React from "react";
import data from "../assets/data.json";
import { Box, CardActionArea, Typography } from "@mui/material";
import { GroupedVirtuoso } from "react-virtuoso";
import PropTypes from "prop-types";

const EmjoPicker = React.memo(({ onClickEmoji }) => {
  return (
    <Box
      width={320}
      sx={{
        "& .MuiBox-root": {
          overflow: "hidden",
        },
      }}>
      <GroupedVirtuoso
        overscan={150}
        groupCounts={groupData.map((d) => d.length)}
        style={{ height: 380 }}
        groupContent={(index) => {
          return (
            <Box
              position='relative'
              pb={1}
              bgcolor='transparent'
              p={1}
              sx={{
                backdropFilter: "blur(15px)",
                borderRadius: "10px 0 0 10px",
              }}>
              <Typography variant='h6'>{headers[index].title}</Typography>
            </Box>
          );
        }}
        itemContent={(index) => {
          const emojis = groupData.flat()[index];

          return (
            <Box whiteSpace='nowrap' sx={{ mx: { xs: 2, md: 0.5 } }}>
              {emojis.map(({ emoji, order, ...otherProps }) => (
                <CardActionArea
                  key={order}
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => {
                    if (typeof onClickEmoji === "function")
                      onClickEmoji({ emoji, order, ...otherProps });
                  }}
                  sx={{
                    m: "auto",
                    textAlign: "center",
                    display: "inline-flex",
                    width: { xs: 40, md: 42 },
                    aspectRatio: 1,
                  }}>
                  <span style={{ fontSize: 32 }}>{emoji}</span>
                </CardActionArea>
              ))}
            </Box>
          );
        }}
      />
    </Box>
  );
});

const groupTo = (list = [], n = 4) => {
  const result = [];
  list.forEach((_, i) => {
    const initIndex = (i + 1) * n;
    const shotdata = list.slice(initIndex - n, initIndex);
    if (shotdata.length) result.push(shotdata);
  });
  return result;
};

const groupData = data
  .reduce((acc, item) => {
    let group = acc[item.group];
    if (group) group.push(item);
    else acc[item.group] = [item];
    return acc;
  }, [])
  .filter((_, i) => i !== 2)
  .map((d) => groupTo(d, 7));

const headers = [
  {
    name: "Smileys & Emotion",
    title: "Visages et émotions",
  },
  {
    name: "People & Body",
    title: "Personnes et corps",
  },
  {
    name: "Animals & Nature",
    title: "Animaux et nature",
  },
  {
    name: "Food & Drink",
    title: "Nourriture et boissons",
  },
  {
    name: "Travel & Places",
    title: "Voyages et lieux",
  },
  {
    name: "Activities",
    title: "Activités",
  },
  {
    name: "Objects",
    title: "Objets",
  },
  {
    name: "Symbols",
    title: "Symboles",
  },
  {
    name: "Flags",
    title: "Drapeaux",
  },
];
EmjoPicker.displayName = "EmjoPicker";

EmjoPicker.propTypes = {
  onClickEmoji: PropTypes.func,
};
export default EmjoPicker;
