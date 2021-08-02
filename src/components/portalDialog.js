import { createPortal } from 'react-dom';
import {Button} from "antd"
import './style.css';

const PortalDialog = (props) => {
  const { visible, children, onHide } = props;
  return visible
    ? createPortal(
        <div className="portal-sample">
          {children}
          <Button onClick={onHide}>close</Button>
        </div>,
        document.getElementById('dialog-root'),
      )
    : null;
};

export default PortalDialog;
