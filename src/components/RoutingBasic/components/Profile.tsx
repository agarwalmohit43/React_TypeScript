import { useLocation } from "react-router-dom";
const Profile = () => {
  const location = useLocation();
  console.log(location);

  return <div>Profile</div>;
};

export default Profile;
