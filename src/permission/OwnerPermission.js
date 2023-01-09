import { useUser } from "../context/UserContext";

const OwnerPermission = ({ children }) => {
  const user = useUser();

  if (user.user) {
    if (
      user.user.roles.includes("owner") &&
      user.user.roles.includes("default") &&
      !user.user.roles.includes("admin")
    ) {
      return children;
    }
  }
  return null;
};

export default OwnerPermission;
