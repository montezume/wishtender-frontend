import React, { useState } from "react";
import "./Crop.css";
import EasyCrop from "./ReactEasyCrop/EasyCrop";
import { getCroppedImg } from "./ReactEasyCrop/utils";
import Button from "@mui/material/Button";
import { Typography } from "@mui/material";
import makeStyles from '@mui/styles/makeStyles';

const useStyles = makeStyles((theme) => {
  return {
    title: {
      margin: theme.spacing(2),
    },
  };
});

/**
 * Renders a <Crop /> component
 * @param  props
 * @param  props.imgSrc must be a data URl
 * @param  props.onCroppedImageCreated
 * @param  props.aspect ex 2 or 2/1
 * @param  props.cropShape
 * @param  props.finalImageDimension ex- {width: 300, height: 300}
 **/
export default function Crop(props) {
  const [crop, setCrop] = useState(null);
  const classes = useStyles();

  const onCropComplete = (cropInfo) => {
    setCrop(cropInfo);
  };

  const croppedImage = async () => {
    const image = await getCroppedImg(
      props.imgSrc,
      crop.croppedAreaPixels,
      props.finalImageDimensions
    );
    return image;
  };

  async function onCropAndSave(e) {
    e.preventDefault();
    const image = await croppedImage();
    props.onCroppedImageCreated(image);
    props.onClose();
  }

  const handleCrop = (info) => {
    setCrop(info);
  };

  return (
    <form
      style={{ minWidth: "260px", margin: "1em" }}
      className="crop-and-upload-container"
    >
      {/* <CloseButton onClose={props.onClose}></CloseButton> */}
      <Typography className={classes.title}>{props.label}</Typography>
      <EasyCrop
        imgSrc={props.imgSrc || ""}
        onCropComplete={onCropComplete}
        handleCrop={handleCrop}
        cropShape={props.cropShape}
        aspect={props.aspect}
        finalImageDimensions={props.finalImageDimensions}
      ></EasyCrop>
      <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
        <Button
          variant="contained"
          color="primary"
          disableElevation
          onClick={onCropAndSave}
        >
          Crop and Save
        </Button>
      </div>
    </form>
  );
}
