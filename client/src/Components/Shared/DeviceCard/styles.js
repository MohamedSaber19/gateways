import { makeStyles } from "@material-ui/core/styles";
const styles = makeStyles((theme) => ({
  cardWrapper: {
    padding: "1rem",
    border: "1px solid #000",
    borderRadius: 5,
    margin: ".5%",
    flex: "0 0 32.3%",
  },
  vendor: {
    fontSize: 14,
  },
  status: {
    fontSize: 13,
  },
  removeIcon: {
    display: "block",
    marginLeft: "auto",
    color: "red",
  },
}));

export default styles;
