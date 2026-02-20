import { createPortal } from "react-dom";

const elem = document.getElementById("modal");

const Modal = ({ children }) => {
  /*const [elem] = useState(document.createElement("div"));

  useEffect(() => {
    const modalRoot = document.getElementById("modal");
    modalRoot.appendChild(elem);
    console.log(
      "%cModal useEffect executed :(",
      "background: #222; color: #bada55",
    );
    return () => modalRoot.removeChild(elem);
  }, [elem]);

  return createPortal(<div>{children}</div>, elem);*/

  return createPortal(<div>{children}</div>, elem);
};

export default Modal;
