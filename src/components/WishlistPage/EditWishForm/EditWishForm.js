import React, { useState, useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { UserContext } from "../../../contexts/UserContext";
import CategoryEdit from "./CategoryEdit";
import AutoDeleteInput from "../AddWish/WishForm/AutoDeleteInput";

import SelectCropUpdateImage from "../ProfileSection/SelectCropUpdateImage/SelectCropUpdateImage";
import {
  Button,
  Container,
  TextField,
  Grid,
  Typography,
  FormControl,
  FormHelperText,
  Box,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import PriceInput from "../PriceInput";
import { fetchPatchMulti, fetchDelete } from "../../../scripts/fetchHelper";
import StyledDialog from "../../common/StyledDialog/StyledDialog";
import theme from "../../../theme";
import themeStyles from "../../../themeStyles";
import useScreenSize from "../../../hooks/useScreenSize";
import {
  toSmallestUnit,
  currencyInfo,
  isValidPrice,
} from "../../../scripts/helpers";
import DialogClose from "../../common/StyledDialog/TopSections/TopSection/DialogClose";
import ResponsiveDialogTitleSection from "../../common/StyledDialog/TopSections/ResponsiveTopTitleSection/ResponsiveDialogCloseAndTitleSection";

/**
 * Renders a <WishForm /> component
 * @param  props
 * @param  props.info
 * @param  props.onClose
 **/
export default function EditWishForm(props) {
  const { user } = useContext(UserContext);

  const screenSize = useScreenSize({
    breakpoints: { xs: 0, sm: 450 },
    useStandard: false,
  });
  const useStyles = makeStyles((theme) => {
    return {
      root: {
        display: "flex",
        flexDirection: "column",
        gap: "1em",
        padding:
          screenSize === "xs"
            ? theme.spacing(6, 0, 1, 0)
            : theme.spacing(4, 0, 1, 0),
        width: "80%",
      },
    };
  });

  const themeClasses = themeStyles();
  const classes = useStyles();
  const [itemName, setItemName] = useState("");
  const [repeatPurchases, setRepeatPurchases] = useState("");
  const [price, setPrice] = useState("");
  const [categories, setCategories] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [deleteWarningVisible, setDeleteWarningVisible] = useState(false);

  // const buttonHeight = useButtonHeight(
  //   document.querySelector(`#submit_dialog`)
  // );
  useEffect(() => {
    setRepeatPurchases(props.info && props.info.repeatPurchases);
    setItemName(props.info && props.info.itemName);
    setCategories(props.info && props.info.categories);
    setPrice(props.info && props.info.price);
  }, [props.info]);
  const {
    register,
    setValue,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (price !== "") setValue("price", price, { shouldValidate: true });
  }, [price, setValue]);
  useEffect(() => {
    if (categories !== "")
      setValue("categories", categories, { shouldValidate: true });
  }, [categories, setValue]);

  const onSubmit = (data) => {
    if (imageFile) data.image = imageFile;

    Object.keys(data).forEach((value) => {
      if (
        (value === "price" && +data[value] === +props.info[value]) ||
        (!data[value] && value !== "repeatPurchases") || // !data[value] -> can't remember why I put this here but it messes up empty values. repeat purchases is sometimes empty because it didn't always exist.
        data[value] === props.info[value]
      ) {
        delete data[value];
      } else if (value === "repeatPurchases" && data[value] === undefined) {
        delete data[value];
      }
    });
    if (data.price)
      data.price = toSmallestUnit(data.price, props.info.currency);
    if (Object.keys(data).length) {
      // fetchPatchMulti(
      //   data,
      //   `${process.env.REACT_APP_BASE_URL}/api/wishlistItems/${props.id}`,
      //   () => {
      //     props.onClose({ refresh: true });
      //   }
      // );
      const fd = new FormData();
      const dataArray = Object.entries(data);

      dataArray.forEach((datum) => {
        if (datum[0] === "categories") return;
        fd.append(datum[0], datum[1]);
      });
      if (data.categories) {
        for (let i = 0; i < data.categories.length; i++) {
          fd.append("categories[]", data.categories[i]);
        }
        if (data.categories.length === 0) {
          fd.append("categories", "[]");
        }
      }
      const headers = new Headers();
      headers.append("CSRF-Token", user.csrfToken);
      fetch(`${process.env.REACT_APP_BASE_URL}/api/wishlistItems/${props.id}`, {
        credentials: "include",
        method: "PATCH",
        body: fd,
        headers,
      })
        .then(async (response) => {
          if (response.status === 500) {
            let responseText = await response.text();
            throw new Error(responseText);
          }
          return response.text();
        })
        .then((res) => {
          props.onClose({ refresh: true });
        })
        .catch((err) => {
          alert(err);
        });
    } else {
      props.onClose({ refresh: false });
    }
  };
  const handleImageUpdate = (img) => {
    setImageFile(img);
  };
  const deleteWish = () => {
    fetchDelete(
      `${process.env.REACT_APP_BASE_URL}/api/wishlistItems/${props.id}`,
      () => props.onClose({ refresh: true })
    );
  };
  const { ref: itemNameRef, ...itemNameReg } = register("itemName", {
    maxLength: {
      value: 199,
      message: "Product name must be less than 200 characters",
    },
    minLength: {
      value: 5,
      message: "Product name must be more than 4 characters",
    },
  });
  const { ref: categoriesRef, ...categoriesReg } = register("categories");
  const { ref: priceRef, ...priceReg } = register("price", {
    validate: async (value) => {
      console.log("validation change from ", price, value, isValidPrice(value));

      const currency = currencyInfo(props.info.currency);

      const valid = isValidPrice(value, currency.decimalPlaces);

      if (errors.price || !valid) setPrice(value);

      return valid || `${value} is not a valid price.`;
    },
  });
  return (
    <>
      {/* <DialogClose onClose={props.onClose} /> */}
      <ResponsiveDialogTitleSection onClose={props.onClose}>
        Edit Wish
      </ResponsiveDialogTitleSection>
      <Box
        display="flex"
        flexDirection="column"
        style={{ height: "100%", maxWidth: "500px" }}
      >
        <form
          id="edit-wish-form"
          autoComplete="off"
          style={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            height: "100%",
            justifyContent: "space-between",
            textAlign: "center",
            paddingBottom: screenSize === "sm" && theme.spacing(2),
          }}
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className={classes.root}>
            <Container>
              <img
                src={
                  // should we URL.revokeObjectURL();?

                  imageFile
                    ? URL.createObjectURL(imageFile)
                    : props.info.itemImage
                }
                style={{ width: "161px" }}
                alt="product"
              />

              <SelectCropUpdateImage
                label={"Item Image"}
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
            <FormControl error={errors.itemName ? true : false}>
              <TextField
                {...itemNameReg}
                inputRef={itemNameRef}
                name="itemName"
                variant="outlined"
                value={itemName}
                label="Product Name"
                onChange={(e) => {
                  setItemName(e.target.value);
                }}
              />
              <FormHelperText>{errors.itemName?.message}</FormHelperText>
            </FormControl>

            <PriceInput
              price={price}
              setPrice={setPrice}
              onChange={(price) => {
                setPrice(price);
              }}
              register={priceReg}
              inputRef={priceRef}
              error={errors.price?.message}
              symbol={currencyInfo(props.info.currency).symbol}
              decimalPlaces={currencyInfo(props.info.currency).decimalPlaces}
            ></PriceInput>

            <CategoryEdit
              // control={control}
              // name="categories"
              // label="Add Category"
              register={categoriesReg}
              inputRef={categoriesRef}
              // labelId="categories-edit-label"
              // id="categories-edit"
              itemCategories={categories}
              setItemCategories={setCategories}
              wishlistCategories={props.categories}
            />

            <Grid container justifyContent="flex-end">
              <StyledDialog
                open={deleteWarningVisible}
                onClose={() => setDeleteWarningVisible(false)}
              >
                <p>Are you sure you want to delete this wish?</p>
                <Button onClick={() => setDeleteWarningVisible(false)}>
                  No
                </Button>
                <Button
                  onClick={() => {
                    setDeleteWarningVisible(false);
                    deleteWish();
                  }}
                >
                  Yes
                </Button>
              </StyledDialog>
              {/* <FormControl error={errors.itemName ? true : false}> */}
              {repeatPurchases !== "" && (
                <AutoDeleteInput
                  register={register}
                  control={control}
                  defaultValue={
                    repeatPurchases !== undefined ? repeatPurchases : true
                  }
                />
              )}

              <Button
                size="small"
                onClick={() => setDeleteWarningVisible(true)}
              >
                Delete Wish
              </Button>
            </Grid>
          </div>
          <div style={{ width: "100%" }}>
            <Button
              id="submit_dialog"
              disableElevation={true}
              // className={props.classes && props.classes.submit_xs}
              variant="contained"
              color="primary"
              size="large"
              type="submit"
              className={
                screenSize === "xs"
                  ? themeClasses.dialogSubmitMobile
                  : themeClasses.dialogSubmit
              }
            >
              Update
            </Button>
          </div>
        </form>
      </Box>
    </>
  );
}
