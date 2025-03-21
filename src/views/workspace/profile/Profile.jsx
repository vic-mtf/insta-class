import { Box, Slide } from "@mui/material";
import { useSelector } from "react-redux";
import Idnetity from "./Identity";
import { useState } from "react";
import EditIdentity from "./EditIdentity";

export default function Profile() {
  const [tab, setTab] = useState(null);
  const fname = useSelector((store) => store.user.fname);
  const lname = useSelector((store) => store.user.lname);
  const uname = useSelector((store) => store.user.uname);
  const profileImage = useSelector((store) => store.user.profile_image);
  const role = useSelector((store) => store.user.role);

  return (
    <Box width='100%' height='100%' display='flex' flexDirection='column'>
      <Box
        display='flex'
        flex={1}
        position='relative'
        overflow='hidden'
        sx={{
          "& > div": {
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
          },
        }}>
        <Slide in={!tab} appear={false} unmountOnExit direction='right'>
          <Idnetity
            fname={fname}
            lname={lname}
            uname={uname}
            profileImage={profileImage}
            role={role}
            setTab={setTab}
          />
        </Slide>
        <Slide appear={false} unmountOnExit direction='left' in={!!tab}>
          <EditIdentity
            setTab={setTab}
            fname={fname}
            lname={lname}
            uname={uname}
            profileImage={profileImage}
            role={role}
            tab={tab}
          />
        </Slide>
      </Box>
    </Box>
  );
}
