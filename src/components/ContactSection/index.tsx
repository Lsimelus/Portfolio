import React from "react";
import {
  Box,
  Container,
  TextField,
  Button,
  Typography,
  Grid,
  Stack,
  Chip,
  CircularProgress,
  useTheme,
} from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import SendIcon from '@mui/icons-material/Send';
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import { contactLinks } from "../../data/data"
import { gradients } from "../../theme"
import SectionHeader from "../SectionHeader";
import type { alertType } from "../Alert";
import axios from 'axios';

export interface ContactProps {
  alertCallback: (text: string, severity: alertType) => void,
}

/** Quick-pick reasons that prefill the subject line. */
const inquiryTypes = ["Job opportunity", "Freelance project", "Just saying hi"];

const socialLinks = [
  { icon: EmailIcon, href: contactLinks.emailLink, label: "Email" },
  { icon: GitHubIcon, href: contactLinks.github, label: "GitHub" },
  { icon: LinkedInIcon, href: contactLinks.linkedin, label: "LinkedIn" },
];

const inputSx = {
  '& .MuiOutlinedInput-root': {
    borderRadius: 2.5,
    bgcolor: 'action.hover',
    transition: 'background-color 0.2s ease',
    '& fieldset': { borderColor: 'transparent' },
    '&:hover fieldset': { borderColor: 'transparent' },
    '&.Mui-focused': { bgcolor: 'transparent' },
    '&.Mui-focused fieldset': { borderWidth: 2 },
  },
};

const Contact = (props: ContactProps) => {
  const { alertCallback } = props;
  const theme = useTheme();
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [subject, setSubject] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!name || !email || !subject || !message) {
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
      // Base URL comes only from REACT_APP_API_URL (Vercel env / local .env), not the repo.
      await axios.post(`${import.meta.env.REACT_APP_API_URL ?? ""}/api/contact-form`, {
        name,
        email,
        subject,
        message
      });

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
      id="Contact"
      sx={{
        minHeight: 'auto',
        py: { xs: 7, md: 12 },
        position: 'relative',
        overflow: 'hidden',
        bgcolor: theme.palette.background.default,
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          background: gradients.mesh,
          opacity: 0.6,
          pointerEvents: 'none',
        }}
      />

      <Container maxWidth="lg" sx={{ position: 'relative' }}>
        <SectionHeader
          eyebrow="Contact"
          title="Let's talk"
          subtitle="Hiring for a role or have a project in mind? Send a note and I'll reply within a couple of days."
        />

        <Grid container spacing={4}>
          {/* Contact Form */}
          <Grid item xs={12} md={7}>
            <Box
              sx={{
                p: { xs: 3, sm: 5 },
                borderRadius: 4,
                bgcolor: theme.palette.background.paper,
                border: `1px solid ${theme.palette.divider}`,
                boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.05), 0 8px 10px -6px rgb(0 0 0 / 0.03)',
              }}
            >
              <Box component="form" onSubmit={handleSubmit}>
                <Stack spacing={3}>
                  <Stack direction="row" flexWrap="wrap" gap={1}>
                    {inquiryTypes.map((type) => (
                      <Chip
                        key={type}
                        label={type}
                        clickable
                        color={subject === type ? 'primary' : 'default'}
                        variant={subject === type ? 'filled' : 'outlined'}
                        onClick={() => setSubject(type)}
                        disabled={loading}
                      />
                    ))}
                  </Stack>

                  <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3}>
                    <TextField
                      fullWidth
                      label="Name"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      disabled={loading}
                      sx={inputSx}
                    />

                    <TextField
                      fullWidth
                      label="Email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      disabled={loading}
                      sx={inputSx}
                    />
                  </Stack>

                  <TextField
                    fullWidth
                    label="Subject"
                    required
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    disabled={loading}
                    sx={inputSx}
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
                    sx={inputSx}
                  />

                  <Button
                    type="submit"
                    variant="contained"
                    size="large"
                    endIcon={loading ? <CircularProgress size={20} color="inherit" /> : <SendIcon />}
                    disabled={loading}
                    sx={{
                      alignSelf: 'flex-start',
                      px: 4,
                      py: 1.4,
                      background: gradients.blue,
                      '&:hover': {
                        background: gradients.blue,
                        filter: 'brightness(0.92)',
                      },
                    }}
                  >
                    {loading ? 'Sending...' : 'Send Message'}
                  </Button>
                </Stack>
              </Box>
            </Box>
          </Grid>

          {/* Contact Info */}
          <Grid item xs={12} md={5}>
            <Stack spacing={3} sx={{ height: '100%' }}>
              <Box
                sx={{
                  p: { xs: 3, sm: 4 },
                  borderRadius: 4,
                  color: '#fff',
                  background: gradients.primary,
                  boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.15)',
                }}
              >
                <Typography variant="h6" component="h3" sx={{ fontWeight: 700, mb: 3 }}>
                  Contact Information
                </Typography>

                <Stack spacing={2.5}>
                  <Box
                    component="a"
                    href={contactLinks.emailLink}
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 2,
                      textDecoration: 'none',
                      color: 'inherit',
                    }}
                  >
                    <Box
                      sx={{
                        width: 42,
                        height: 42,
                        borderRadius: 2,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        bgcolor: 'rgba(255,255,255,0.18)',
                        flexShrink: 0,
                      }}
                    >
                      <EmailIcon fontSize="small" />
                    </Box>
                    <Box sx={{ minWidth: 0 }}>
                      <Typography variant="caption" sx={{ opacity: 0.8 }}>
                        Email
                      </Typography>
                      <Typography variant="body1" sx={{ fontWeight: 600, wordBreak: 'break-word' }}>
                        {contactLinks.email}
                      </Typography>
                    </Box>
                  </Box>

                </Stack>
              </Box>

              <Box
                sx={{
                  p: { xs: 3, sm: 4 },
                  borderRadius: 4,
                  flex: 1,
                  bgcolor: theme.palette.background.paper,
                  border: `1px solid ${theme.palette.divider}`,
                }}
              >
                <Typography variant="h6" component="h3" sx={{ fontWeight: 700, mb: 0.5 }}>
                  Connect With Me
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                  Find me across the web
                </Typography>

                <Stack spacing={1.5}>
                  {socialLinks.map(({ icon: Icon, href, label }) => (
                    <Box
                      key={label}
                      component="a"
                      href={href}
                      target="_blank"
                      rel="noreferrer"
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1.5,
                        px: 2,
                        py: 1.25,
                        borderRadius: 2.5,
                        textDecoration: 'none',
                        color: theme.palette.text.primary,
                        bgcolor: 'action.hover',
                        transition: 'transform 0.15s ease, background-color 0.15s ease',
                        '&:hover': {
                          bgcolor: theme.palette.primary.main,
                          color: '#fff',
                          transform: 'translateX(4px)',
                        },
                      }}
                    >
                      <Icon fontSize="small" />
                      <Typography variant="body2" sx={{ fontWeight: 600, flex: 1 }}>
                        {label}
                      </Typography>
                      <ArrowOutwardIcon sx={{ fontSize: 16, opacity: 0.6 }} />
                    </Box>
                  ))}
                </Stack>
              </Box>
            </Stack>
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
};

export default Contact;
