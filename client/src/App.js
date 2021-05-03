import { Snackbar, Grid } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import GatewaysList from "./Components/GatewaysList";
import GatewayForm from "./Components/Logic/GatewayForm";
import Alert from "@material-ui/lab/Alert";
import styles from "./styles";
import axios from "axios";
import { useEffect } from "react";
import {
  dismissToast,
  fetchAllGateways,
  setIsLoading,
  showToast,
} from "./Redux/actions/actions";

function App() {
  const classes = styles();
  const dispatch = useDispatch();
  const toast = useSelector((state) => state.toast);
  const gateways = useSelector((state) => state.data);

  const handleClose = () => {
    dispatch(dismissToast());
  };

  const fetchGateways = async () => {
    dispatch(setIsLoading(true));
    const response = await axios.get("/api/gateways");
    if (response.status === 200 && response.data) {
      dispatch(fetchAllGateways(response.data));
      dispatch(setIsLoading(false));
    } else {
      dispatch(
        showToast({
          isOpen: true,
          message: "Error occured",
          severity: "error",
        })
      );
    }
  };

  useEffect(() => {
    fetchGateways();
    //eslint-disable-next-line
  }, []);

  return (
    <>
      <Grid container className={classes.gridContainer}>
        <Grid item className={classes.gridItem} xs={12} lg={6}>
          <section>
            <h1>Add Gateway</h1>
            <GatewayForm />
          </section>
        </Grid>
        <Grid item className={classes.gridItem} xs={12} lg={6}>
          <section>
            <h1>Gateways List ({gateways.length})</h1>
            <GatewaysList />
          </section>
        </Grid>
      </Grid>
      <Snackbar
        open={toast?.isOpen}
        autoHideDuration={3000}
        onClose={handleClose}
      >
        {toast && (
          <Alert
            onClose={handleClose}
            severity={toast.severity}
            variant="filled"
          >
            {toast.message}
          </Alert>
        )}
      </Snackbar>
    </>
  );
}

export default App;
