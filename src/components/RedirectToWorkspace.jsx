import { useLayoutEffect } from "react";
import { useNavigate } from "react-router-dom";

const RedirectToWorkspace = () => {
  const navigateTo = useNavigate();
  useLayoutEffect(() => {
    navigateTo("/workspace", { replace: true });
  }, [navigateTo]);
  return null;
};
export default RedirectToWorkspace;
