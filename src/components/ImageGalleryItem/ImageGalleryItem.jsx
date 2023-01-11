import { useState, memo } from 'react';
import { GalleryItem, GalleryImage } from './ImageGalleryItem.styled';
import Modal from 'components/Modal/Modal';
import { PropTypes } from 'prop-types';

function ImageGalleryItem({ standartImg, alt, largeImg }) {
  const [showModal, setShowModal] = useState(false);

  function toggleModal() {
    setShowModal(!showModal);
  }

  return (
    <GalleryItem>
      <GalleryImage src={standartImg} alt={alt} onClick={toggleModal} />
      {showModal && (
        <Modal largeImage={largeImg} alt={alt} onClose={toggleModal} />
      )}
    </GalleryItem>
  );
}
ImageGalleryItem.propTypes = {
  standartImg: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  largeImg: PropTypes.string.isRequired,
};
export default memo(ImageGalleryItem);
