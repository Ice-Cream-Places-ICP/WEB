import { useUser } from "../context/UserContext";

const AdminPermission = ({ children }) => {
  const user = useUser();

  if (user.user) {
    if (user.user.roles.includes("admin")) {
      return children;
    }
  }
  return null;
};

export default AdminPermission;
