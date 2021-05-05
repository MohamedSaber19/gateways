import React from "react";
import styles from "./styles";
import { AiOutlineClose } from "react-icons/ai";
import { IconButton } from "@material-ui/core";

export default function DeviceCard({ removeHandler, device }) {
  const classes = styles();
  const { vendor, status } = device;

  return (
    <article className={classes.cardWrapper}>
      <IconButton
        aria-label="delete"
        className={classes.removeIcon}
        size="small"
        onClick={removeHandler}
      >
        <AiOutlineClose />
      </IconButton>

      <h1 className={classes.vendor}>Vendor: {vendor}</h1>
      <h3 className={classes.status}>Status: {status}</h3>
    </article>
  );
}
