import React, { useState } from 'react';
import { Modal, Button } from 'antd';
import PortalDialog from '@/components/portalDialog';

const DialogPage = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isPortalVisible, setIsPortalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const showPortal = () => {
    setIsPortalVisible(true);
  };

  const hidePortal = () => {
    setIsPortalVisible(false);
  };

  return (
    <>
      <Button type="primary" onClick={showModal}>
        Open Modal
      </Button>
      <Button style={{ marginLeft: '20px' }} onClick={showPortal}>
        Open Dialog（React Portals）
      </Button>
      <Modal
        title="Basic Modal"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
      <PortalDialog visible={isPortalVisible} onHide={hidePortal}>
        <div>dialog-children</div>
      </PortalDialog>
    </>
  );
};

export default DialogPage;
