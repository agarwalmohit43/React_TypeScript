import ReactDOM from "react-dom";

const Portal = () => {
  return ReactDOM.createPortal(
    <div className="modal">{<h1>React Portal</h1>}</div>,
    document.body
  );
};

export default Portal;
