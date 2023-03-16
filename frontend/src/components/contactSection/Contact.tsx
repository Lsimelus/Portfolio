import React from "react";
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import EmailIcon from '@mui/icons-material/Email';
import PeopleIcon from '@mui/icons-material/People';
import GitHubIcon from '@mui/icons-material/GitHub';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { Item } from "../../styles/commonUIComponents/ItemStyled"
import { TranslateButton} from "../../styles/commonUIComponents/ButtonStyled"
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { handleClickScroll } from "../../utils/reusableFunctions"
import {links} from "../../data/data"
import axios from 'axios';
import CircularProgress from '@mui/material/CircularProgress';
import { ButtonComponent } from "../commonUIComponents/Button";



export interface ContactProps {
  alertCallback: Function,
  subjectFilled: String
}

const Contact = React.forwardRef<HTMLElement, ContactProps>((props, ref) => {
  const { alertCallback, subjectFilled = "" } = props;
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [subject, setSubject] = React.useState<String>("");
  const [message, setMessage] = React.useState("");
  const [formDone, setFormDone] = React.useState(false);
  const [buffering, setBuffering] = React.useState(false);
  const [formEmpty, setFormEmpty] = React.useState(false);

  React.useEffect(() => {
    setSubject(subjectFilled)
    setName("")
    setEmail("")
    setMessage("")
    setFormDone(false)

  }, [subjectFilled]);

  function processForm() {
    setFormEmpty(false)
    if (name === "" || email === "" || message === "") {
      setFormEmpty(true)
      alertCallback("The required field must be filled in.", "warning")
    } else if (email.indexOf("@") === -1) {
      alertCallback("Improper email format", "warning")
    } else {
      setBuffering(true)
      alertCallback("Connecting to API. This may take a second.", "info")


      axios.post(`https://portfolio-webapp-pf4y.onrender.com/processform`, {
        name: name,
        email: email,
        subject: subject,
        message: message
      })
        .then(res => {
          setFormDone(true)
          alertCallback("Form successfully processed. I will respond ASAP.", "success")
          setBuffering(false)
        }).catch(function (error) {
          alertCallback("Something went wrong. Sorry for the inconvenience", "error")
          setBuffering(false)
        });

    }
  }

  return (
    <>
      <section ref={ref} style={{ backgroundColor: "#000524" }} id="Contact">
        <Grid
          container
          direction="row"
          maxWidth="xl"
          spacing={5}
          p={8}
          alignItems="stretch"
        >
          <Grid item xs={2} >
            <PeopleIcon style={{ fontSize: 80 }} color="primary"> </PeopleIcon>
          </Grid>

          <Grid item xs={8} >
            <h1 style={{ color: "white" }} >Let's Connect!</h1>
          </Grid>

          <Grid item xs={2} ></Grid>
          <Grid item xs={12} md={8}>
            <Item>
              <Grid item xs={12} >
                <TextField margin={"dense"} fullWidth label="Name*" variant="filled"
                  error={formEmpty && name===""}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  disabled={formDone}
                />
              </Grid>
              <Grid item xs={12} >
                <TextField
                error={formEmpty && email===""}
                  value={email}
                  disabled={formDone}
                  onChange={(e) => setEmail(e.target.value)}
                  margin={"dense"} fullWidth label="Email*" variant="filled" />
              </Grid>
              <Grid item xs={12} >
                <TextField value={subject}
                  disabled={formDone}
                  onChange={(e) => setSubject(e.target.value)}
                  margin={"dense"} fullWidth label="Subject" variant="filled" />
              </Grid>
              <Grid item xs={12} >
                <TextField margin={"dense"} value={message}
                  error={formEmpty && message===""}
                  disabled={formDone}
                  onChange={(e) => setMessage(e.target.value)}
                  fullWidth multiline rows={8} label="Message*" variant="filled" />
              </Grid>


              <Box
                m={3}
                display="flex"
                justifyContent="space-between"
              >

                {formDone ?
                  <CheckCircleIcon sx={{
                    fontSize: 60,
                    color: "green"
                  }} />

                  :
                  <ButtonComponent
                    onClick={() => processForm()}
                    text={"Submit"}
                  />
                }
                {buffering &&
                  < CircularProgress />
                }

              </Box>
            </Item>
          </Grid>

          <Grid item xs={12} md={4} >
            <Item elevation={16}>
              <Grid item xs={12} >
                <h1 >Contact</h1>
                <p><b>781-350-8711</b></p>
                <p ><b>lsimelus@gmail.com</b></p>
              </Grid>

              <div>

                <TranslateButton>
                  <EmailIcon
                    onClick={() => window.open(links.mailto, "_blank")}
                    sx={{
                      fontSize: 100,
                      color: "gray",
                      "&:hover": {
                        color: "#EA4336"
                      },
                    }} />
                </TranslateButton>

                <TranslateButton onClick={() => window.open(links.main, "_blank")}>
                  <GitHubIcon sx={{
                    fontSize: 100,
                    color: "gray",
                    "&:hover": {
                      color: "#7241C8"
                    },
                  }} />
                </TranslateButton>
                <TranslateButton
                  onClick={() => window.open(links.tel, "_blank")}
                >
                  <LocalPhoneIcon sx={{
                    fontSize: 100,
                    color: "gray",
                    "&:hover": {
                      color: "#1CC838"
                    },
                  }} />
                </TranslateButton>
                <TranslateButton
                  onClick={() => window.open(links.linkedin, "_blank")}>
                  <LinkedInIcon sx={{
                    fontSize: 100,
                    color: "gray",
                    "&:hover": {
                      color: "#0077B5"
                    },
                  }} />
                </TranslateButton>
              </div>
            </Item>

          </Grid>
          <Grid item xs={12}  >
            <Box
              textAlign="center"
              justifyContent="center"
            >
              <ButtonComponent onClick={() => handleClickScroll("Home")}>
                <KeyboardArrowUpIcon />
                </ButtonComponent>
            </Box>
          </Grid>
        </Grid>
      </section>

      <footer >
        <p> &copy; Copyright 2023 Lyndbergh George Simelus. Built with React.</p>
      </footer>
    </>
  );
});

export default Contact;
