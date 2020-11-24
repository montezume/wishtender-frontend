import React, { useState } from 'react';
import Cropper from 'react-easy-crop';
import Slider from '@material-ui/core/Slider';
import './EasyCrop.css';
import { getCroppedImg } from './utils.js';

export default function EasyCrop(props) {
  const [crop, onCropChange] = useState({ x: 0, y: 0 });
  const [zoom, onZoomChange] = useState(1);
  const [cropInfo, setCropInfo] = useState(null);

  const onCropComplete = (croppedArea, croppedAreaPixels) => {
    console.log(croppedArea, croppedAreaPixels);
    setCropInfo({ croppedArea, croppedAreaPixels });
  };

  const handleCrop = async () => {
    const image = await getCroppedImg(props.imgSrc, cropInfo.croppedAreaPixels);
    props.onCrop(image);
  };

  return (
    <div className="crop-container">
      {/* You can set this button to close the window */}
      <div className="crop-preview">
        <Cropper
          image={props.imgSrc}
          crop={crop}
          zoom={zoom}
          onCropChange={onCropChange}
          onCropComplete={onCropComplete}
          onZoomChange={onZoomChange}
          cropShape={props.cropShape || 'round'}
          aspect={props.aspect || 1}
          showGrid={props.showGrid || false}
        />
      </div>
      <div className="crop-controls">
        <p>Zoom</p>
        <div className="slider-container">
          <Slider
            value={zoom}
            min={1}
            max={3}
            step={0.1}
            aria-labelledby="Zoom"
            onChange={(e, zoom) => onZoomChange(zoom)}
          />
        </div>
      </div>
      <button onClick={handleCrop}>Crop</button>
    </div>
  );
}

//////
import React, { useState } from 'react';
import defaultImg from './wedding_dress_dashie.jpg';
import './CropAndUpload.css';
import EasyCrop from '../ReactEasyCrop/EasyCrop';
import CloseButton from './CloseButton/CloseButton';
import { getCroppedImg } from '../ReactEasyCrop/utils';

import { downloadBase64File } from '../DragAndCropAndUpload/utils';
import { blobToImage64 } from '../ReactEasyCrop/utils';

export default function CropAndUpload(props) {
  const [crop, setCrop] = useState(null);

  async function onCrop(img) {
    console.log('img', img);
    const image64File = await blobToImage64(img);
    // const ext = extractImageFileExtensionFromBase64(image64File);
    downloadBase64File(image64File, 'myfile');
  }
  async function onCrop2(img) {
    console.log('img', img);
    console.log(defaultImg, crop);
    const image = await getCroppedImg(defaultImg, crop);
    // const image64File = await blobToImage64(image);
    // const ext = extractImageFileExtensionFromBase64(image64File);
    // downloadBase64File(image64File, 'myfile');
  }

  const handleCrop = (info) => {
    setCrop(info);
    console.log('hsandled crop');
  };

  return (
    <form className="crop-and-upload-container">
      <CloseButton onClose={props.onClose}></CloseButton>
      <p className="crop-label">Profile Picture</p>
      <EasyCrop
        imgSrc={props.imgSrc || defaultImg}
        onCrop={onCrop}
        handleCrop={handleCrop}
      ></EasyCrop>
      <button onClick={onCrop2}>Crop2</button>
    </form>
  );
}
import React, { useState } from 'react';
import defaultImg from './wedding_dress_dashie.jpg';
import './CropAndUpload.css';
import EasyCrop from '../ReactEasyCrop/EasyCrop';
import CloseButton from './CloseButton/CloseButton';
import { getCroppedImg } from '../ReactEasyCrop/utils';

import { downloadBase64File } from '../DragAndCropAndUpload/utils';
import { blobToImage64 } from '../ReactEasyCrop/utils';

export default function CropAndUpload(props) {
  const [crop, setCrop] = useState(null);

  async function onCrop(img) {
    console.log('img', img);
    const image64File = await blobToImage64(img);
    // const ext = extractImageFileExtensionFromBase64(image64File);
    downloadBase64File(image64File, 'myfile');
  }
  async function onCrop2(img) {
    console.log('img', img);
    console.log(defaultImg, crop);
    const image = await getCroppedImg(defaultImg, crop);
    // const image64File = await blobToImage64(image);
    // const ext = extractImageFileExtensionFromBase64(image64File);
    // downloadBase64File(image64File, 'myfile');
  }

  const handleCrop = (info) => {
    setCrop(info);
    console.log('hsandled crop');
  };

  return (
    <form className="crop-and-upload-container">
      <CloseButton onClose={props.onClose}></CloseButton>
      <p className="crop-label">Profile Picture</p>
      <EasyCrop
        imgSrc={props.imgSrc || defaultImg}
        onCrop={onCrop}
        handleCrop={handleCrop}
      ></EasyCrop>
      <button onClick={onCrop2}>Crop2</button>
    </form>
  );
}
//
