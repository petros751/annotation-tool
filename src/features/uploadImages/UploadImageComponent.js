import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addImages, setActiveImage, imagesSliceSelector } from '../../store/imagesSlice';
import { Button, Popup, Header, Icon, Image } from 'semantic-ui-react';
import { IMAGE_TYPES } from '../../utils/enumerables';
import { useNavigate } from "react-router-dom";

const { PNG, JPEG, JPG, GIF } = IMAGE_TYPES;

const UploadImageComponent = () => {

  const [imagefile, setImageFile] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const { images } = useSelector(imagesSliceSelector);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (images && images.length) {
      setImageFile(images);
    }
  }, [images]);

  const pipeFileSelectButton = () => (
    <div>
      <Popup
        trigger={(
          <Button
            primary
            as="label"
            content="Browse"
            htmlFor="pipe-data-file-step2"
            type="button"
          />
        )}
        content="Choose image to Upload"
        inverted
        position="bottom left"
      />
      <input
        type="file"
        id="pipe-data-file-step2"
        hidden
        onChange={imgFilehandler}
      />
    </div>
  );

  const imgFilehandler = (e) => {
    const { files } = e.target;
    if (files[0] && files[0].type !== PNG && files[0].type !== JPEG && files[0].type !== JPG && files[0].type !== GIF) {
      return setErrorMessage(`You cannot upload ${files[0].type} type of file. Please try a png, jpeg, jpg or gif file.`);
    }
    setImageFile(imagefile => [...imagefile, URL.createObjectURL(files[0])]);
    const image = {
      url: URL.createObjectURL(files[0]),
      points: [],
      position: []
    };
    dispatch(addImages(image));
    setErrorMessage('');
  }

  const imageSelection = (e) => {
    dispatch(setActiveImage(e.target.currentSrc));
    navigate('/edit');
  };

  return (
    <div>
      {pipeFileSelectButton()}
      {errorMessage.length ? <Header.Subheader>{errorMessage}</Header.Subheader> : null}
      <hr />
      {!imagefile.length ? <Icon name='images outline' /> : null}
      {imagefile.length ? <Header>Select image:</Header> : null}
      {imagefile.map((elem, i) => (
        <span key={i}>
          <Image
            src={elem.url}
            onClick={imageSelection}
            height="200"
            width="200"
            alt="med1"
          />
        </span>
      ))}
    </div>
  );
}

export default UploadImageComponent;
