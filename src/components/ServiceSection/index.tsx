import React from "react";
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  CardActions,
  Button,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  useTheme,
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { servicesData } from "../../data/data"

export interface ServiceProps {
  contactFormReset: Function
}

const Service = React.forwardRef<HTMLElement, ServiceProps>((props, ref) => {
  const { contactFormReset } = props;
  const theme = useTheme();

  return (
    <Box
      component="section"
      ref={ref}
      id="Service"
      sx={{
        minHeight: '100vh',
        py: 12,
        bgcolor: theme.palette.background.default,
      }}
    >
      <Container maxWidth="lg">
        <Typography variant="h2" sx={{ fontWeight: 700, mb: 2, textAlign: 'center' }}>
          Freelance Services
        </Typography>
        <Typography
          variant="body1"
          sx={{ textAlign: 'center', color: theme.palette.text.secondary, mb: 6 }}
        >
          Professional web development services tailored to your needs
        </Typography>

        {/* Full-time CTA */}
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <Button
            variant="contained"
            size="large"
            onClick={() => contactFormReset("Full-time opportunity")}
            sx={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              px: 4,
              py: 1.5,
              '&:hover': {
                background: 'linear-gradient(135deg, #5568d3 0%, #64408a 100%)',
              }
            }}
          >
            Looking for a Full-Time Hire?
          </Button>
        </Box>

        {/* Service Cards */}
        <Grid container spacing={4} justifyContent="center">
          {servicesData.map((service, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card
                className="hover-lift"
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  position: 'relative',
                  borderTop: `4px solid ${service.accentColor}`,
                }}
              >
                <CardContent sx={{ flexGrow: 1, p: 4 }}>
                  <Typography
                    variant="h5"
                    sx={{
                      fontWeight: 700,
                      mb: 1,
                      color: service.accentColor,
                    }}
                  >
                    {service.title}
                  </Typography>

                  <Typography
                    variant="h3"
                    sx={{
                      fontWeight: 800,
                      mb: 3,
                      color: theme.palette.text.primary,
                    }}
                  >
                    {service.price}
                  </Typography>

                  <List dense>
                    {service.features.map((feature, idx) => (
                      <ListItem key={idx} disableGutters>
                        <ListItemIcon sx={{ minWidth: 36 }}>
                          <CheckCircleIcon
                            sx={{ color: service.accentColor, fontSize: 20 }}
                          />
                        </ListItemIcon>
                        <ListItemText
                          primary={feature}
                          primaryTypographyProps={{
                            variant: 'body2',
                            color: 'text.secondary',
                          }}
                        />
                      </ListItem>
                    ))}
                  </List>
                </CardContent>

                <CardActions sx={{ p: 4, pt: 0 }}>
                  <Button
                    fullWidth
                    variant="contained"
                    onClick={() => contactFormReset(service.title)}
                    sx={{
                      bgcolor: service.accentColor,
                      '&:hover': {
                        bgcolor: service.accentColor,
                        filter: 'brightness(0.9)',
                      }
                    }}
                  >
                    Get Started
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
});

export default Service;
