import React from "react";
import {
  Box,
  Container,
  TextField,
  Button,
  Typography,
  Grid,
  Card,
  CardContent,
  Stack,
  IconButton,
  CircularProgress,
  useTheme,
} from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import GitHubIcon from '@mui/icons-material/GitHub';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import SendIcon from '@mui/icons-material/Send';
import { contactLinks } from "../../data/data"
import axios from 'axios';



export interface ContactProps {
  alertCallback: Function,
  subjectFilled: String
}

const Contact = React.forwardRef<HTMLElement, ContactProps>((props, ref) => {
  const { alertCallback, subjectFilled = "" } = props;
  const theme = useTheme();
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [subject, setSubject] = React.useState<String>("");
  const [message, setMessage] = React.useState("");
  const [formDone, setFormDone] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    setSubject(subjectFilled)
    setName("")
    setEmail("")
    setMessage("")
    setFormDone(false)
  }, [subjectFilled]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!name || !email || !message) {
      alertCallback("Please fill in all required fields.", "warning")
      return;
    }

    if (!email.includes("@")) {
      alertCallback("Please enter a valid email address.", "warning")
      return;
    }

    setLoading(true)
    alertCallback("Sending message...", "info")

    try {
      await axios.post(`https://flask-backend-inky.vercel.app/processform`, {
        name,
        email,
        subject,
        message,
        app: "portfolio"
      });

      setFormDone(true)
      alertCallback("Message sent successfully! I'll get back to you soon.", "success")
      setName("")
      setEmail("")
      setSubject("")
      setMessage("")
    } catch (error) {
      console.error(error)
      alertCallback("Something went wrong. Please try again.", "error")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Box
      component="section"
      ref={ref}
      id="Contact"
      sx={{
        py: 12,
        bgcolor: theme.palette.background.paper,
      }}
    >
      <Container maxWidth="lg">
        <Typography variant="h2" sx={{ fontWeight: 700, mb: 2, textAlign: 'center' }}>
          Get In Touch
        </Typography>
        <Typography
          variant="body1"
          sx={{ textAlign: 'center', color: theme.palette.text.secondary, mb: 8 }}
        >
          Let's work together on your next project
        </Typography>

        <Grid container spacing={6}>
          {/* Contact Form */}
          <Grid item xs={12} md={7}>
            <Card>
              <CardContent sx={{ p: 4 }}>
                <Box component="form" onSubmit={handleSubmit}>
                  <Stack spacing={3}>
                    <TextField
                      fullWidth
                      label="Name"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      disabled={loading}
                    />

                    <TextField
                      fullWidth
                      label="Email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      disabled={loading}
                    />

                    <TextField
                      fullWidth
                      label="Subject"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      disabled={loading}
                    />

                    <TextField
                      fullWidth
                      label="Message"
                      required
                      multiline
                      rows={6}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      disabled={loading}
                    />

                    <Button
                      type="submit"
                      variant="contained"
                      size="large"
                      endIcon={loading ? <CircularProgress size={20} color="inherit" /> : <SendIcon />}
                      disabled={loading}
                      sx={{ alignSelf: 'flex-start' }}
                    >
                      {loading ? 'Sending...' : 'Send Message'}
                    </Button>
                  </Stack>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* Contact Info */}
          <Grid item xs={12} md={5}>
            <Card sx={{ height: '100%' }}>
              <CardContent sx={{ p: 4 }}>
                <Typography variant="h5" sx={{ fontWeight: 600, mb: 4 }}>
                  Contact Information
                </Typography>

                <Stack spacing={3} sx={{ mb: 4 }}>
                  <Stack direction="row" spacing={2} alignItems="center">
                    <EmailIcon color="primary" />
                    <Box>
                      <Typography variant="body2" color="text.secondary">
                        Email
                      </Typography>
                      <Typography variant="body1" sx={{ fontWeight: 500 }}>
                        {contactLinks.email}
                      </Typography>
                    </Box>
                  </Stack>

                  <Stack direction="row" spacing={2} alignItems="center">
                    <LocalPhoneIcon color="primary" />
                    <Box>
                      <Typography variant="body2" color="text.secondary">
                        Phone
                      </Typography>
                      <Typography variant="body1" sx={{ fontWeight: 500 }}>
                        {contactLinks.phone}
                      </Typography>
                    </Box>
                  </Stack>
                </Stack>

                <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                  Connect With Me
                </Typography>

                <Stack direction="row" spacing={1}>
                  <IconButton
                    color="primary"
                    onClick={() => window.open(contactLinks.emailLink, "_blank")}
                    sx={{
                      bgcolor: `${theme.palette.primary.main}15`,
                      '&:hover': { bgcolor: theme.palette.primary.main, color: '#fff' }
                    }}
                  >
                    <EmailIcon />
                  </IconButton>

                  <IconButton
                    color="primary"
                    onClick={() => window.open(contactLinks.github, "_blank")}
                    sx={{
                      bgcolor: `${theme.palette.primary.main}15`,
                      '&:hover': { bgcolor: theme.palette.primary.main, color: '#fff' }
                    }}
                  >
                    <GitHubIcon />
                  </IconButton>

                  <IconButton
                    color="primary"
                    onClick={() => window.open(contactLinks.phoneLink, "_blank")}
                    sx={{
                      bgcolor: `${theme.palette.primary.main}15`,
                      '&:hover': { bgcolor: theme.palette.primary.main, color: '#fff' }
                    }}
                  >
                    <LocalPhoneIcon />
                  </IconButton>

                  <IconButton
                    color="primary"
                    onClick={() => window.open(contactLinks.linkedin, "_blank")}
                    sx={{
                      bgcolor: `${theme.palette.primary.main}15`,
                      '&:hover': { bgcolor: theme.palette.primary.main, color: '#fff' }
                    }}
                  >
                    <LinkedInIcon />
                  </IconButton>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Footer */}
        <Box sx={{ mt: 8, textAlign: 'center', pb: 4 }}>
          <Typography variant="body2" color="text.secondary">
            © {new Date().getFullYear()} Lyndbergh Simelus. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
});

export default Contact;
