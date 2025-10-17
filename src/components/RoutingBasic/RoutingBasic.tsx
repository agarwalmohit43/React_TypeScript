import { Link } from "react-router-dom";
import { BasicRouter } from "./routes/BasicRouter";

const RoutingBasic = () => {
  return (
    <div>
      RoutingBasic
      <section>
        <nav
          style={{
            display: "flex",
            gap: "16px",
            justifyContent: "center",
            margin: "32px 0px",
          }}
        >
          <Link to={"/"} replace>
            Home
          </Link>
          <Link to={"/about"}>About</Link>
          <Link to={"/profile"}>Profile</Link>
        </nav>
      </section>
    </div>
  );
};

export default RoutingBasic;
