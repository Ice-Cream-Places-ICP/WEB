import { useUser } from "../context/UserContext";
import Lost from "../pages/Lost";

const NotLoginPermission = ({ children }) => {
  const user = useUser();

  if (!user.user) {
    return children;
  }
  return null;
};

export default NotLoginPermission;
