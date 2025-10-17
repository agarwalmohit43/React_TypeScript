import { TabFormChildComponentProps } from "../../../typings/tabForm";

const Settings = ({ data, setData }: Readonly<TabFormChildComponentProps>) => {
  const {
    config: { theme, role },
  } = data;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setData((prev) => ({
      ...prev,
      config: {
        ...prev.config,
        [name]: value,
      },
    }));
  };

  return (
    <div>
      Settings
      <div>
        <p>Please select Theme</p>

        <label>
          <input
            type="radio"
            name="theme"
            value="dark"
            checked={theme === "dark"}
            onChange={handleChange}
          />
          Dark
        </label>

        <label>
          <input
            type="radio"
            name="theme"
            value="light"
            checked={theme === "light"}
            onChange={handleChange}
          />
          Light
        </label>
      </div>
      <div style={{ marginTop: "1rem" }}>
        <p>Please select Role</p>

        <label>
          <input
            type="radio"
            name="role"
            value="admin"
            checked={role === "admin"}
            onChange={handleChange}
          />
          Admin
        </label>

        <label>
          <input
            type="radio"
            name="role"
            value="normal"
            checked={role === "normal"}
            onChange={handleChange}
          />
          Normal
        </label>
      </div>
    </div>
  );
};

export default Settings;
