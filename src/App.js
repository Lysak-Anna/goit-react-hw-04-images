import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import Searchbar from './components/Searchbar/Searchbar';
import ImageGallery from './components/ImageGallery/ImageGallery';
import { useState } from 'react';

function App() {
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [searchValue, setSearchValue] = useState('');

  function onFormSubmitHandler(searchValue) {
    setSearchValue(searchValue);
    setPage(1);
    setImages([]);
  }

  return (
    <div className="App">
      <Searchbar onSubmit={onFormSubmitHandler} />
      <ImageGallery
        searchValue={searchValue}
        page={page}
        images={images}
        setPage={setPage}
        setImages={setImages}
      />
      <ToastContainer position="top-center" theme="colored" />
    </div>
  );
}

export default App;
