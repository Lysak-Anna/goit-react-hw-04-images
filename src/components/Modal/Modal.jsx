import PropTypes from 'prop-types';
import { Overlay, ModalContent } from './Modal.styled';
import { createPortal } from 'react-dom';
import { useEffect } from 'react';

const modalRoot = document.querySelector('#modal-root');

export default function Modal({ largeImage, alt, onClose }) {
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  });
  function handleKeyDown(event) {
    if (event.code === 'Escape') {
      onClose();
    }
  }
  function handleBackdropClick(event) {
    if (event.currentTarget === event.target) {
      onClose();
    }
  }

  return createPortal(
    <Overlay onClick={handleBackdropClick}>
      <ModalContent>
        <img src={largeImage} alt={alt} />
      </ModalContent>
    </Overlay>,
    modalRoot
  );
}
Modal.propTypes = {
  largeImage: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};
