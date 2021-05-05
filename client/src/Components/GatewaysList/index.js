import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Typography,
} from "@material-ui/core";
import axios from "axios";
import React, { useState } from "react";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import DeleteIcon from "@material-ui/icons/Delete";

import styles from "./styles";
import DeviceCard from "../Shared/DeviceCard";
import { useDispatch, useSelector } from "react-redux";
import {
  addDevice,
  deleteDevice,
  deleteGateway,
  showToast,
} from "../../Redux/actions/actions";
import DeviceForm from "../Logic/DeviceForm";
import generateUniqueID from "../../Utils/generateUniqueID";

export default function GatewaysList() {
  const classes = styles();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [selectedGateway, setSelectedGateway] = useState("");
  const initialDeviceState = {
    uid: generateUniqueID(),
    vendor: "",
    status: "",
    creationDate: new Date(),
  };
  const [deviceInfo, setDeviceInfo] = useState(initialDeviceState);
  const gatewaysList = useSelector((state) => state.data);
  const isLoading = useSelector((state) => state.isLoading);

  const handleDeviceInfoChange = (name, value) => {
    setDeviceInfo({
      ...deviceInfo,
      [name]: value,
    });
  };

  const handleDeleteDevice = async (deviceId, gatewayId) => {
    const response = await axios.delete(`/api/devices/${deviceId}`, {
      data: {
        gatewayId,
      },
    });
    if (response.data.success) {
      dispatch(deleteDevice(deviceId, gatewayId));
      dispatch(
        showToast({
          isOpen: true,
          message: "Successfully deleted",
          severity: "success",
        })
      );
    } else {
      dispatch(
        showToast({
          isOpen: true,
          message: response.data.msg,
          severity: "error",
        })
      );
    }
  };

  const handleDeleteGateway = async (gatewayId) => {
    const response = await axios.delete(`/api/gateways/${gatewayId}`);
    if (response.data.success) {
      dispatch(deleteGateway(gatewayId));
      dispatch(
        showToast({
          isOpen: true,
          message: "Successfully deleted",
          severity: "success",
        })
      );
    } else {
      dispatch(
        showToast({
          isOpen: true,
          message: response.data.msg,
          severity: "error",
        })
      );
    }
  };

  const handleAddDevice = async () => {
    const response = await axios.post(
      `/api/devices/${selectedGateway}`,
      deviceInfo,
      {
        validateStatus: function (status) {
          return status >= 200 && status < 500;
        },
      }
    );
    if (response.data.success) {
      setOpen(false);
      dispatch(addDevice(response.data.data, selectedGateway));
      dispatch(
        showToast({
          isOpen: true,
          message: "Successfully Added",
          severity: "success",
        })
      );
    } else {
      dispatch(
        showToast({
          isOpen: true,
          message: response.data.msg,
          severity: "error",
        })
      );
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleShowDialog = (gatewayId) => {
    setSelectedGateway(gatewayId);
    setOpen(true);
  };

  const renderContent = () => {
    if (isLoading)
      return (
        <div className={classes.spinner}>
          <CircularProgress />
        </div>
      );
    if (!isLoading && gatewaysList.length === 0)
      return <span className={classes.emptyState}>No gateways found</span>;
    return (
      <>
        {gatewaysList?.map((gateway) => (
          <Accordion key={gateway._id}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography className={classes.heading}>
                {gateway.name} ({gateway.devices.length})
              </Typography>
            </AccordionSummary>
            <AccordionDetails className={classes.accordionDetails}>
              <div className={classes.accordionActions}>
                <Button
                  startIcon={<DeleteIcon />}
                  type="button"
                  variant="outlined"
                  color="secondary"
                  onClick={() => handleDeleteGateway(gateway._id)}
                >
                  Delete Gateway
                </Button>
                <Button
                  onClick={() => handleShowDialog(gateway._id)}
                  type="button"
                  variant="contained"
                  color="primary"
                >
                  Add Device
                </Button>
              </div>
              <Divider />
              {gateway.devices.length > 0 ? (
                gateway.devices.map((device) => (
                  <DeviceCard
                    removeHandler={() =>
                      handleDeleteDevice(device._id, gateway._id)
                    }
                    device={device}
                    key={device._id}
                  />
                ))
              ) : (
                <span className={classes.emptyState}>No devices found</span>
              )}
            </AccordionDetails>
          </Accordion>
        ))}
        {/*Add Device Dialog*/}
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Add device</DialogTitle>
          <DialogContent>
            <DeviceForm onValuesChange={handleDeviceInfoChange} />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={() => handleAddDevice()} color="primary">
              Add
            </Button>
          </DialogActions>
        </Dialog>
      </>
    );
  };

  return renderContent();
}
