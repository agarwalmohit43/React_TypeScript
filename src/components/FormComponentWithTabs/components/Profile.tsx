import { TabFormChildComponentProps } from "../../../typings/tabForm";

const Profile = ({ data, setData }: Readonly<TabFormChildComponentProps>) => {
  const handleValueChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    type: "name" | "age" | "email"
  ) => {
    const value = event.target.value.trim();
    switch (type) {
      case "name":
        setData((prev) => ({
          ...prev,
          name: value,
        }));
        break;
      case "age":
        setData((prev) => ({
          ...prev,
          age: Number(value) || 18,
        }));
        break;
      case "email":
        setData((prev) => ({
          ...prev,
          email: value,
        }));
        break;
      default:
        break;
    }
  };

  return (
    <div className="profile-container">
      Profile
      <div className="data-input-container">
        <div>
          <label>Name : </label>
          <input
            type="text"
            value={data.name}
            onChange={(event) => handleValueChange(event, "name")}
          />
        </div>
        <div>
          <label>age : </label>
          <input
            type="number"
            max={150}
            min={1}
            value={data.age}
            onChange={(event) => handleValueChange(event, "age")}
          />
        </div>
        <div>
          <label>email : </label>
          <input
            type="email"
            value={data.email}
            onChange={(event) => handleValueChange(event, "email")}
          />
        </div>
      </div>
    </div>
  );
};

export default Profile;
