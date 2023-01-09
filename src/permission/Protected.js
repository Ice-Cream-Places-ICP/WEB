import { useUser } from "../context/UserContext";
import Lost from "../pages/Lost";

const Protected = ({ children, access, header }) => {
  const userContext = useUser();
  console.log("Protect works");
  console.log(access);

  if (access.length === 0) {
    console.log("Access for everyone");
    return children;
  }

  if (access.indexOf("notlogin") >= 0 && !userContext.user) {
    console.log("Access for notlogin");
    return children;
  }

  if (userContext.user) {
    if (access.some((a) => userContext.user.roles.indexOf(a) >= 0)) {
      console.log("Access for ???");
      return children;
    }
  }

  if (header) return null;
  return <Lost />;
};

export default Protected;
