const normalizePathname = (_pathname) => {
  const pathname = _pathname?.trim();
  const found = pathname?.charAt(pathname?.length - 1) === "/";
  return found ? pathname?.slice(0, pathname?.length - 1) : pathname;
};

export default normalizePathname;
