import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const RedirectToWorkspace = () => {
  const navigateTo = useNavigate();
  useEffect(() => {
    navigateTo("/workspace", { replace: true });
  }, [navigateTo]);
  return null;
};
export default RedirectToWorkspace;
