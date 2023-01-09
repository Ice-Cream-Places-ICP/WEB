import { useUser } from "../context/UserContext";

const UserPermission = ({ children }) => {
  const user = useUser();

  if (user.user) {
    if (
      user.user.roles.includes("default") &&
      !user.user.roles.includes("admin") &&
      !user.user.roles.includes("owner")
    ) {
      return children;
    }
  }
  return null;
};

export default UserPermission;
