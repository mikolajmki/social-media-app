import { useState } from 'react';
import { Modal, Button, Group } from '@mantine/core';
import '../../pages/Auth/Auth.css';
import PostShare from '../PostShare/PostShare';

const ShareModal = props => {
  return (
    <>
      <Modal
        opened={props.modalOpened}
        onClose={() => props.setModalOpened(false)}
        title="Introduce yourself!"
        overlayOpacity={0.6}
        overlayBlur={3}
        size='60%'
      >
        <PostShare/>
      </Modal>
    </>
  );
}

export default ShareModal;