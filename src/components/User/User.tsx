import { useContext } from "react";
import { UserContext } from "../../context/Context";

const User = () => {
  const userContext = useContext(UserContext);
  if (!userContext) return null;
  return <div>{userContext?.name}</div>;
};

export default User;
