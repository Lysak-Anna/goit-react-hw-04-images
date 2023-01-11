import { useState, useEffect, useRef, useCallback } from 'react';
import PropTypes from 'prop-types';
import { Gallery } from './ImageGallery.styled';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import Loader from 'components/Loader/Loader';
import { toast } from 'react-toastify';
import LoadMoreButton from 'components/LoadMoreButton/LoadMoreButton';
import fetchAPI from 'services_API/Pixabay_API';

export default function ImageGallery({
  searchValue,
  page,
  images,
  setImages,
  setPage,
}) {
  const divRef = useRef(null);
  const [totalHits, setTotalHits] = useState(0);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const scrollToBottom = () => {
    divRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const getImages = useCallback(async () => {
    setLoading(true);
    try {
      const { hits, totalHits } = await fetchAPI(searchValue, page);
      if (!hits.length) {
        return toast.error('No images found for your request');
      }
      setTotalHits(totalHits);
      setImages(prevState => [...prevState, ...hits]);
    } catch (error) {
      setError(error);
      setImages([]);
    } finally {
      setLoading(false);
    }
  }, [searchValue, page, setImages]);
  useEffect(() => {
    if (!searchValue) {
      return;
    }
    getImages();
  }, [getImages, searchValue]);
  useEffect(() => {
    scrollToBottom();
  }, [images]);
  function onLoadMoreButton() {
    setPage(prevState => prevState + 1);
  }

  return (
    <>
      {error &&
        toast.error('Something went wrong! Please, try again in few minutes')}
      {images.length > 0 && (
        <>
          <Gallery>
            {images.map(({ webformatURL, tags, largeImageURL }, index) => (
              <ImageGalleryItem
                key={index}
                standartImg={webformatURL}
                alt={tags}
                largeImg={largeImageURL}
              />
            ))}
          </Gallery>
          <div ref={divRef}></div>
          {loading && <Loader />}
          {totalHits > images.length && !loading && (
            <LoadMoreButton onLoadMore={onLoadMoreButton} />
          )}
        </>
      )}
    </>
  );
}
ImageGallery.propTypes = {
  searchValue: PropTypes.string,
  page: PropTypes.number,
  images: PropTypes.arrayOf(PropTypes.shape),
  setImages: PropTypes.func,
  setPage: PropTypes.func,
};
