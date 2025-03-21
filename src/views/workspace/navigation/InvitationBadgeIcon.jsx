import MarkEmailReadIcon from "@mui/icons-material/MarkEmailRead";
import { Badge } from "@mui/material";
import { useSelector } from "react-redux";

export default function InvitationBadgeIcon() {
  const notification = useSelector((store) => store.user.guests?.length);
  return (
    <Badge badgeContent={notification || 0} color='primary'>
      <MarkEmailReadIcon />
    </Badge>
  );
}
