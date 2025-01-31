import { useMemo } from "react";
import { useSelector } from "react-redux";
import { decrypt } from "../utils/crypt";

const useUserData = (callback) => {
  const encryptedUser = useSelector((store) => store.app.user);
  const decryptedUser = useMemo(() => decrypt(encryptedUser), [encryptedUser]);
  return typeof callback === "function"
    ? callback(decryptedUser)
    : decryptedUser;
};
export default useUserData;
