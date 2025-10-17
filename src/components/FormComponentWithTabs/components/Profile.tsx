import { TabFormChildComponentProps } from "../../../typings/tabForm";

const Profile = ({
  data,
  setData,
  errors,
  setErrors,
}: Readonly<TabFormChildComponentProps>) => {
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
        if (!value || value.length < 2) {
          setErrors((prev) => ({ ...prev, name: "Name not valid" }));
        } else {
          setErrors((prev) => {
            delete prev.name;
            return { ...prev };
          });
        }
        break;
      case "age":
        setData((prev) => ({
          ...prev,
          age: Number(value) || 18,
        }));

        if (!value || Number(value) < 18) {
          setErrors((prev) => ({
            ...prev,
            age: `${data.name ? data.name : "User"} is minor`,
          }));
        } else {
          setErrors((prev) => {
            delete prev.age;
            return { ...prev };
          });
        }
        break;
      case "email":
        setData((prev) => ({
          ...prev,
          email: value,
        }));
        if (!value || value.length < 5) {
          setErrors((prev) => ({ ...prev, email: "Email not valid" }));
        } else {
          setErrors((prev) => {
            delete prev.email;
            return { ...prev };
          });
        }
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
            style={{ border: errors.name ? "1px solid red " : "" }}
          />
          {errors.name && <span className="error">{errors.name}</span>}
        </div>
        <div>
          <label>age : </label>
          <input
            type="number"
            max={150}
            min={1}
            value={data.age}
            onChange={(event) => handleValueChange(event, "age")}
            style={{ border: errors.age ? "1px solid red " : "" }}
          />
          {errors.age && <span className="error">{errors.age}</span>}
        </div>
        <div>
          <label>email : </label>
          <input
            type="email"
            value={data.email}
            onChange={(event) => handleValueChange(event, "email")}
            style={{ border: errors.email ? "1px solid red " : "" }}
          />
          {errors.email && <span className="error">{errors.email}</span>}
        </div>
      </div>
    </div>
  );
};

export default Profile;
