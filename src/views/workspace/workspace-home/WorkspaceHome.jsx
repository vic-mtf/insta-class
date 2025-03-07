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

const WorkspaceHome = () => {
  const users = useSelector((state) => state.user.users);
  const dispatch = useDispatch();
  const Authorization = useBearerToken();
  const timers = useMemo(() => [], []);
  const [{ loading, error }, refresh] = useAxios(
    {
      url: "api/auth/users",
      headers: { Authorization },
    },
    { manual: true }
  );

  useEffect(() => {
    timers.push(
      setTimeout(async () => {
        timers.forEach((timer) => {
          clearTimeout(timer);
          timers.pop();
        });
        const response = await refresh();
        const users = response.data;
        dispatch(updateUser({ data: { users } }));
      }, 2000)
    );
  }, [refresh, timers, dispatch]);

  return (
    <Box height='100%' position='relative'>
      {users?.length > 0 && (
        <VirtualList
          totalCount={users?.length}
          itemContent={(index) => {
            const user = users[index];
            const id = user?._id;
            const name = `${user.fname} ${user.lname}`;
            const role = user?.role;
            const profileImage = user?.profileImage;
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
      {!users && (
        <Box flexWrap='wrap' display='flex' gap={1} px={1}>
          {Array.from({ length: 5 }, (_, index) => (
            <Box key={index} flex={1}>
              <SkeletonCardInvitation />
            </Box>
          ))}
        </Box>
      )}
      {users?.length === 0 && (
        <Box
          display='flex'
          flex={1}
          justifyContent='center'
          alignItems='center'
          height='80%'>
          <Typography color='textSecondary' variant='h5' fontWeight={400}>
            Aucun utilisateur Trouvé !
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default WorkspaceHome;
