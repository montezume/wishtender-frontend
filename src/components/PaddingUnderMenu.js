import React from "react";

export default function PaddingUnderMenu(props) {
  const paddingStartElem = document.getElementById("startPadding");
  const headerElem = document.getElementsByTagName("header")[0];
  const bottomOfMenu = headerElem.offsetHeight + headerElem.offsetTop;

  const topOfPadding = paddingStartElem.offsetTop;

  const paddingToAdd = bottomOfMenu - topOfPadding;

  return (
    <div
      style={{ padding: `${paddingToAdd}px`, border: "1px solid red" }}
    ></div>
  );
}
