import { useSelector } from "react-redux";

const useBearerToken = () => {
  const token = useSelector((state) => state.user.token);
  return token ? `Bearer ${token}` : null;
};
export default useBearerToken;
