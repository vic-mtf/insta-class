import React from "react";
import {
  Avatar,
  Badge,
  Box,
  Divider,
  FormControl,
  FormControlLabel,
  FormLabel,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Radio,
  RadioGroup,
  Toolbar,
  Typography,
} from "@mui/material";
import { useSelector } from "react-redux";
import EditIcon from "@mui/icons-material/Edit";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import getFile from "../../../utils/getFile";
import reduceImageQuality from "../../../utils/reduceImageQuality";
import { useDispatch } from "react-redux";
import { updateUser } from "../../../redux/user";
import { updateApp } from "../../../redux/app";

export default function Params() {
  const mode = useSelector((store) => store.app.theme.mode);

  const dispatch = useDispatch();

  return (
    <Box width='100%'>
      <Box px={2}>
        <FormControl>
          <Typography id='themes' sx={{ my: 1 }} color='textSecondary'>
            {texts.title}
          </Typography>
          <RadioGroup
            aria-labelledby='themes'
            defaultValue='female'
            value={mode}
            onChange={(_, mode) => {
              dispatch(updateApp({ data: { theme: { mode } } }));
            }}>
            <FormControlLabel
              value='auto'
              control={<Radio />}
              label='Thème du système'
            />
            <FormControlLabel value='light' control={<Radio />} label='Clair' />
            <FormControlLabel value='dark' control={<Radio />} label='Sombre' />
          </RadioGroup>
        </FormControl>
      </Box>
    </Box>
  );
}

const texts = {
  title: "Theme de l'application",
};
