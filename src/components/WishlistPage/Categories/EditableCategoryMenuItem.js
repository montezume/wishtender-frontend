import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "../../../contexts/UserContext";

import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import CategoryEditInputForm from "./CategoryEditInputForm";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { CircularProgress } from "@mui/material";
const CategoryIconButton = ({ onClick, children, aria }) => {
  return (
    <>
      <IconButton
        style={{ fontSize: "1em", padding: ".3em" }}
        onClick={onClick}
        aria-label={aria}
      >
        {children}
      </IconButton>
    </>
  );
};
const CategoryMenuItem = ({
  setEditInputVisible,
  category,
  setRequestStatus,
}) => {
  const { user, getUser, setUser } = useContext(UserContext);

  const deleteCategory = async (category) => {
    setRequestStatus("processing");

    const headers = new Headers();
    headers.append("CSRF-Token", user.csrfToken);
    headers.append("Content-Type", "application/json");
    fetch(process.env.REACT_APP_BASE_URL + "/api/wishlistItems/categories", {
      method: "PATCH",
      credentials: "include",
      headers,
      body: JSON.stringify({
        deleteCategory: category,
      }),
    })
      .then(async (res) => {
        if (res.status >= 500 && res.status < 600) {
          setRequestStatus("loaded");
          const text = await res.text();
          return alert(text);
        }

        if (res.status >= 400 && res.status < 500) {
          setRequestStatus("loaded");
          const json = await res.json();
          if (json.errors) {
            alert(json.errors.map((msg) => msg.msg).join(" "));
          } else {
            alert(json.message);
          }
        }

        if (res.status >= 200 && res.status < 300) {
          const userUpdate = await getUser();
          setUser(userUpdate);
          setRequestStatus("loaded");
        }
      })
      .catch((err) => {
        alert("Please report error: " + err);
      });
  };
  return (
    <div
      style={{
        marginLeft: "1.4em",
        display: "flex",
        width: "100%",
        justifyContent: "flex-end",
        alignItems: "center",
        alignContent: "center",
      }}
    >
      <CategoryIconButton
        setRequestStatus={setRequestStatus}
        aria="edit"
        onClick={() => {
          setEditInputVisible(true);
        }}
      >
        <EditIcon fontSize="1em" />
      </CategoryIconButton>
      <CategoryIconButton
        aria="delete"
        setRequestStatus={setRequestStatus}
        onClick={() => {
          deleteCategory(category);
        }}
      >
        <DeleteForeverIcon fontSize="1em" />
      </CategoryIconButton>
    </div>
  );
};
const Loading = () => {
  return (
    <div
      style={{
        position: "absolute",
        left: "0",
        right: "0",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <CircularProgress />
    </div>
  );
};
export default function EditableCategoryMenuItemInside({ category }) {
  const [editInputVisible, setEditInputVisible] = useState(false);
  const [requestStatus, setRequestStatus] = useState("loaded");
  useEffect(() => {
    if (requestStatus === "processing") setRequestStatus("loaded");
  }, [category]);
  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        justifyContent: "space-between",
        alignItems: "center",
        alignContent: "center",
      }}
    >
      {editInputVisible ? (
        <>
          <CategoryEditInputForm
            setRequestStatus={setRequestStatus}
            category={category}
            onClose={() => {
              setEditInputVisible(false);
            }}
          />
        </>
      ) : (
        <>
          {category}

          <CategoryMenuItem
            setRequestStatus={setRequestStatus}
            category={category}
            setEditInputVisible={setEditInputVisible}
          ></CategoryMenuItem>
          {requestStatus === "processing" && <Loading />}
        </>
      )}
    </div>
  );
}
