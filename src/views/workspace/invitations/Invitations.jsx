import { Box, Typography } from "@mui/material";
import VirtualList from "../../../components/VirtualList";
import { useSelector } from "react-redux";
import useAxios from "../../../hooks/useAxions";
import useBearerToken from "../../../hooks/useBearerToken";
import { useEffect } from "react";
import { useMemo } from "react";
import { useDispatch } from "react-redux";
import { updateUser } from "../../../redux/user";
import SkeletonCardInvitation from "../../../components/SkeletonCardInvitation";
import UserItem from "./UserItem";
import store from "../../../redux/store";

const Invitations = () => {
  const guests = useSelector((store) => store.user.guests);

  const dispatch = useDispatch();
  const Authorization = useBearerToken();
  const timers = useMemo(() => [], []);
  const [, refresh] = useAxios(
    {
      url: "api/auth/guests",
      headers: { Authorization },
    },
    { manual: true }
  );

  useEffect(() => {
    timers.push(
      setTimeout(
        async () => {
          timers.forEach((timer) => {
            clearTimeout(timer);
            timers.pop();
          });
          const response = await refresh();
          const guests = response.data;
          dispatch(updateUser({ data: { guests } }));
        },
        store.getState().user.guests ? 0 : 2000
      )
    );
  }, [refresh, timers, dispatch]);

  return (
    <Box
      position='relative'
      flex={1}
      display='flex'
      overflow='hidden'
      flexDirection='column'>
      <Box ml={2}>
        <Typography variant='body1' sx={{ color: "text.secondary" }}>
          Les personnes qui souhaitent entrer en conctate avec vous
        </Typography>
      </Box>
      <Box position='relative' flex={1}>
        {guests?.length > 0 && (
          <VirtualList
            totalCount={guests?.length}
            itemContent={(index) => {
              const user = guests[index];
              const id = user?._id;
              const name = `${user.fname} ${user.lname}`;
              const role = user?.role;
              const profileImage = user?.profile_image;
              const guest = user?.guest;
              return (
                <UserItem
                  name={name}
                  role={role}
                  id={id}
                  src={profileImage}
                  guest={guest}
                />
              );
            }}
          />
        )}
        {!guests && (
          <Box flexWrap='wrap' display='flex' gap={1} px={1}>
            {Array.from({ length: 5 }, (_, index) => (
              <Box key={index} flex={1}>
                <SkeletonCardInvitation />
              </Box>
            ))}
          </Box>
        )}
        {guests?.length === 0 && (
          <Box
            display='flex'
            flex={1}
            justifyContent='center'
            alignItems='center'
            height='80%'>
            <Typography color='textSecondary' variant='h5' fontWeight={400}>
              Vous avez aucune invitation
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default Invitations;
