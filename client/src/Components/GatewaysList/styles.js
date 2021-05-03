import { makeStyles } from "@material-ui/core/styles";
const styles = makeStyles((theme) => ({
  heading: {
    color: "#422ccc",
  },
  accordionDetails: {
    flexWrap: "wrap",
  },
  spinner: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  emptyState: {
    display: "block",
    color: "#ccc",
    width: "100%",
    textAlign: "center",
  },
  accordionActions: {
    marginBottom: "2rem",
    display: "flex",
    width: "100%",
    justifyContent: "space-around",
  },
}));

export default styles;
