import { makeStyles } from "@material-ui/core/styles";
const styles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
  },
  input: {
    margin: ".5rem 0",
  },
  maskedInput: {
    height: 54,
    borderRadius: 5,
    margin: ".5rem 0",
    borderColor: "#c4c4c4",
    borderStyle: "solid",
    borderWidth: 1,
    padding: "0 .5rem",
    "&focus":{
      borderColor: "blue"
    }
  },
  button: {
    maxWidth: 150,
    margin: ".5rem 0",
  },
  submitBtn: {
    marginTop: ".5rem",
  },
  devicesWrapper: {
    display: "flex",
    flexWrap: "wrap",
  },
  devicesSection: {
    margin: "1rem 0",
  },
  wrapperLabel: {
    fontWeight: "bold",
    marginBottom: ".5rem",
  },
}));

export default styles;
