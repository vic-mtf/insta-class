import { useLayoutEffect, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function usePathRouter(initialPath = "home") {
  const { pathname: path } = useLocation();
  const navigateTo = useNavigate();

  const pathname = useMemo(() => {
    return `/${extractRoute(path) || initialPath}`;
  }, [initialPath, path]);

  const router = useMemo(() => {
    return {
      pathname,
      searchParams: new URLSearchParams(),
      navigate: (path) => navigateTo(`/workspace${path}`),
    };
  }, [pathname, navigateTo]);

  useLayoutEffect(() => {
    navigateTo(`/workspace/${initialPath}`);
  }, [navigateTo, initialPath]);

  return router;
}

const extractRoute = (pathname) => {
  const trimmedPath = pathname.replace(/^\/+|\/+$/g, "");
  const segments = trimmedPath.split("/");
  if (segments.length === 0) return "";
  return segments[segments.length - 1];
};

export default usePathRouter;
