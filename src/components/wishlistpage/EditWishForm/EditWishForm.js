import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import PhotoSizeSelectActual from "@material-ui/icons/PhotoSizeSelectActual";
import SelectCropUpdateImage from "../ProfileSection/SelectCropUpdateImage/SelectCropUpdateImage";
import {
  Button,
  Container,
  TextField,
  Grid,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import PriceInput from "../PriceInput";
import { fetchPatchMulti, fetchDelete } from "../../../scripts/fetchHelper";
import StyledDialog from "../../common/StyledDialog/StyledDialog";
const useStyles = makeStyles((theme) => {
  return {
    root: {
      display: "grid",
      gap: "1em",
    },
    button: {
      fontWeight: 900,
      color: "white",
      borderRadius: 0,
      [theme.breakpoints.down(450)]: {
        position: "fixed",
        left: "0",
        bottom: 0,
        width: "100%",
        zIndex: 10,
      },
    },
  };
});

/**
 * Renders a <WishForm /> component
 * @param  props
 * @param  props.info
 * @param  props.onClose
 * @param  props.onClose
 **/
export default function EditWishForm(props) {
  const classes = useStyles();
  const [price, setPrice] = useState("");
  const [itemName, setItemName] = useState("");
  const [image, setImage] = useState("");
  const [deleteWarningVisible, setDeleteWarningVisible] = useState(false);

  useEffect(() => {
    setItemName(props.info && props.info.itemName);
    setPrice(props.info && props.info.price);
    setImage(props.info && props.info.itemImage);
  }, [props.info]);

  const { register, handleSubmit, errors } = useForm();
  const onSubmit = (data) => {
    //send data to backend post wish item
    data.image = image;
    data.price = data.price.slice(1);
    fetchPatchMulti(data, `/wishlistItems/${props.id}`, () => {
      props.onClose();
    });
  };
  const handleImageUpdate = (img) => {
    // should we URL.revokeObjectURL();?
    setImage(URL.createObjectURL(img));
  };
  const deleteWish = () => {
    fetchDelete(`/wishlistItems/${props.id}`, props.onClose());
  };
  return (
    <form
      style={props.disabled ? { opacity: ".3", pointerEvents: "none" } : {}}
      className={classes.root}
      onSubmit={handleSubmit(onSubmit)}
    >
      <Container>
        <img src={image} alt="product" />

        <SelectCropUpdateImage
          aspect={1}
          cropShape="rect"
          finalImageDimensions={{ width: 300, height: 300 }}
          handleUpdateImage={handleImageUpdate}
        >
          <p style={{ textDecoration: "underline", fontSize: ".8em" }}>
            Upload Custom Photo
          </p>
        </SelectCropUpdateImage>
      </Container>
      <Typography>Edit Wish Info</Typography>
      <TextField
        inputRef={register()}
        name="itemName"
        variant="outlined"
        value={itemName}
        label="Product Name"
        onChange={(e) => {
          setItemName(e.target.value);
        }}
      />

      <PriceInput
        price={price}
        setPrice={setPrice}
        inputRef={register()}
      ></PriceInput>

      <Grid container justify="flex-end">
        <StyledDialog
          open={deleteWarningVisible}
          onClose={() => setDeleteWarningVisible(false)}
        >
          <p>Are You Sure You want to delete this wish?</p>
          <Button onClick={() => setDeleteWarningVisible(false)}>No</Button>
          <Button
            onClick={() => {
              setDeleteWarningVisible(false);
              deleteWish();
            }}
          >
            Yes
          </Button>
        </StyledDialog>
        <Button size="small" onClick={() => setDeleteWarningVisible(true)}>
          Delete Wish
        </Button>
      </Grid>

      <Button
        disableElevation={true}
        className={classes.button}
        variant="contained"
        color="primary"
        size="large"
        type="submit"
      >
        Update
      </Button>
    </form>
  );
}
