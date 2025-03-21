import { useEffect } from "react";
import { updateUser } from "../redux/user";
import useAxios from "./useAxions";
import useBearerToken from "./useBearerToken";
import { useDispatch } from "react-redux";

const useLoadDiscussion = (manual = true) => {
  const dispatch = useDispatch();
  const Authorization = useBearerToken();
  const [{ data }, refresh] = useAxios(
    {
      url: "api/auth/discussions",
      headers: { Authorization },
      method: "GET",
    },
    { manual }
  );

  useEffect(() => {
    (async () => {
      let discussions = null;
      if (manual) {
        const response = await refresh();
        discussions = response.data;
      } else discussions = data;
      dispatch(updateUser({ data: { discussions } }));
    })();
  }, [refresh, dispatch, data, manual]);
};

export default useLoadDiscussion;
