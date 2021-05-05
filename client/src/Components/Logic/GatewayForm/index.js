import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import styles from "./styles";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
} from "@material-ui/core";
import DeviceForm from "../DeviceForm";
import DeviceCard from "../../Shared/DeviceCard";
import MaskedInput from "react-masked-input-text";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addGateway, showToast } from "../../../Redux/actions/actions";
import generateUniqueID from "../../../Utils/generateUniqueID";

export default function GatewayForm() {
  const classes = styles();
  const dispatch = useDispatch();
  const initialState = {
    name: "",
    ip: "",
  };
  const initialDeviceState = {
    uid: generateUniqueID(),
    vendor: "",
    status: "",
    creationDate: new Date(),
  };
  const [open, setOpen] = useState(false);
  const [devices, setDevices] = useState([]);
  const [deviceInfo, setDeviceInfo] = useState(initialDeviceState);

  const [state, setState] = useState(initialState);

  const handleChange = (evt) => {
    const value = evt.target.value;
    setState({
      ...state,
      [evt.target.name]: value,
    });
  };

  const handleDeviceInfoChange = (name, value) => {
    setDeviceInfo({
      ...deviceInfo,
      [name]: value,
    });
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAddDevice = () => {
    setDevices([...devices, deviceInfo]);
    setOpen(false);
  };

  const handleRemoveDevice = (deviceId) => {
    setDevices(devices.filter((device) => device.uid !== deviceId));
  };

  const handleAddGateway = async () => {
    const gateway = {
      name: state.name,
      ip: state.ip,
      devices,
    };
    const res = await axios.post("/api/gateways", gateway, {
      validateStatus: function (status) {
        return status >= 200 && status < 500;
      },
    });

    if (res.data.success) {
      dispatch(addGateway(res.data.data));
      dispatch(
        showToast({
          isOpen: true,
          message: "Added successfully",
          severity: "success",
        })
      );
      setState(initialState);
      setDevices([]);
    } else {
      dispatch(
        showToast({
          isOpen: true,
          message: res.data.msg,
          severity: "error",
        })
      );
    }
  };

  return (
    <>
      <form className={classes.root} noValidate autoComplete="off">
        <TextField
          className={classes.input}
          value={state.name}
          name="name"
          fullWidth
          id="gateway-name"
          label="Gateway Name"
          variant="outlined"
          onChange={handleChange}
        />
        <MaskedInput
          className={classes.maskedInput}
          value={state.ip}
          name="ip"
          id="gateway-ip4"
          onChange={handleChange}
          onKeyDown={handleChange}
          mask={"00?0?.00?0?.00?0?.00?0?"}
          placeholder={"IPV4 Address"}
        />
        <Button
          className={classes.button}
          onClick={() => setOpen(true)}
          variant="outlined"
          color="primary"
        >
          Add Device
        </Button>
      </form>
      {devices.length > 0 && (
        <section className={classes.devicesSection}>
          <header className={classes.wrapperLabel}>Devices</header>
          <div className={classes.devicesWrapper}>
            {devices?.map((dev, i) => (
              <DeviceCard
                isTemp={true}
                removeHandler={() => handleRemoveDevice(dev.uid)}
                key={i}
                device={dev}
              />
            ))}
          </div>
        </section>
      )}
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
          <Button onClick={handleAddDevice} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
      <Divider />
      <Button
        disabled={!state.name || !state.ip}
        className={classes.submitBtn}
        fullWidth
        variant="contained"
        color="primary"
        onClick={handleAddGateway}
      >
        Submit
      </Button>
    </>
  );
}
