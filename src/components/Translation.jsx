import React, { useState } from "react";
import Axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import {
  Paper,
  TextField,
  Button,
  Grid,
  Divider,
  Typography,
  List,
  ListItem,
  Container,
} from "@material-ui/core";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";


const useStyles = makeStyles((theme) => ({
  translateSection: {
    width: "100%",
    height: "83vh",
  },

  titleBox: {
    color: "#40637E",
    fontWeight: "bold",
    fontSize: "25px",
  },
  translate: {
    color: "#40637E",
    fontWeight: "bold",
    fontSize: "20px",
    paddingTop: "10px",
    paddingBottom: "7px",
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  formControl: {
    margin: theme.spacing(2),
  },
  source: {
    color: "#3caea3",
    fontWeight: "bold",
    fontSize: "16px",
    paddingTop: "20px",

  }
}));

const Translation = () => {
  const classes = useStyles();
  let [search, setSearch] = useState("");
  let [searchCopy, setSearchCopy] = useState("");
  const [sourceLang, setSourceLang] = useState("");
  const [targetLang, setTargetLang] = useState("");
  const [translation, setTranslation] = useState(null);
  const [startLang, setStartLang] = useState("");
  const [endLang, setEndLang] = useState("");

  search = search.toLowerCase();
  searchCopy = searchCopy.toLowerCase();

  const handleVocab = (e) => {
    setSearch(e.target.value);
    setSearchCopy(e.target.value);
  };

  const handleSubmitTranslation = async (e) => {
    e.preventDefault();

    let token = localStorage.getItem("currentUser");
    const body = { search, sourceLang, targetLang };
    console.log("TRANSLATION BODY->", body);
    try {
      const response = await Axios.post("/translate", body, {
        headers: {
          "Content-Type": "Application/JSON",
          Authorization: `${token}`,
        },
      });
      const data = JSON.stringify(response.data.translation);
      console.log("RESPONSE TRANSLATION->", data);
      setTranslation(data)
      setSearch("")

    } catch (err) {
      console.log(`Catch block, POST error on /translate: ${err}`);
    }
    

    
  };
  return (
    <div>
      <Grid container component={Paper} className={classes.translateSection}>
        <Grid item xs={12}>
          <List>
            <ListItem button>
              <Typography className={classes.titleBox}>Translation</Typography>
            </ListItem>
            <Divider />
            <ListItem style={{ paddingTop: "20px" }} alignItems="center">
              <form className={classes.form} onSubmit={handleSubmitTranslation}>
                <TextField
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  id="translation"
                  label="Word/Phrase"
                  name="translation"
                  autoFocus
                  value={search}
                  onChange={handleVocab}
                />

                <ListItem>
                  <FormControl
                    variant="outlined"
                    className={classes.formControl}
                  >
                    <InputLabel>Source</InputLabel>
                    <Select
                      native
                      value={sourceLang}
                      onChange={(e) => setSourceLang(e.target.value)}
                      fullWidth
                      label="from"
                    >
                      <option aria-label="None" value="" />
                      <option value={"en"} name="English">English</option>
                      <option value={"es"} name="Spanish">Spanish</option>
                      <option value={"fr"} name="French">French</option>
                      <option value={"de"} name="German">German</option>
                    </Select>
                  </FormControl>
                  <Typography style={{ color: "#40637E", fontWeight: "bold" }}>
                    To
                  </Typography>
                  <FormControl
                    variant="outlined"
                    className={classes.formControl}
                  >
                    <InputLabel>Target</InputLabel>
                    <Select
                      native
                      value={targetLang}
                      onChange={(e) => setTargetLang(e.target.value)}
                      fullWidth
                      label="from"
                    >
                      <option aria-label="None" value="" />
                      <option value={"en"} name="English">English</option>
                      <option value={"es"} name="Spanish">Spanish</option>
                      <option value={"fr"} name="French">French</option>
                      <option value={"de"} name="German">German</option>
                    </Select>
                  </FormControl>
                </ListItem>
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  style={{ fontWeight: "700" }}
                  type="submit"
                >
                  Translate
                </Button>
                {translation ? (
                <Container>
                  <Typography className={classes.source}>English:</Typography>
                  <Typography className={classes.translate}>{searchCopy}</Typography>
                  <Typography className={classes.source}>Spanish:</Typography>
                  <Typography className={classes.translate}>{translation}</Typography>
                </Container>
                  ) : null}
              </form>
            </ListItem>
          </List>
        </Grid>
      </Grid>
    </div>
  );
};
export default Translation;
