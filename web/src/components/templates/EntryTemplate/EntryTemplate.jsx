import { Box, Container, Stack, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { Navigate } from "react-router-dom";
import { ROUTE } from "../../../constants/router";
import BlaGOBackground from "../../../assets/backgrounds/bla-go.png";
import GoogleLoginButton from "../../molecules/GoogleLoginButton/GoogleLoginButton";
import useIsLoggedIn from "../../../hooks/useIsLoggedIn";

function EntryTemplate() {
  const { t } = useTranslation();

  const isLoggedIn = useIsLoggedIn();

  if (isLoggedIn) {
    return <Navigate to={ROUTE.AUCTIONS} />;
  }

  return (
    <>
      <Box py={16}>
        <Container>
          <Stack
            spacing={2}
            sx={{
              width: {
                xs: "100%",
                md: "80%",
              },
            }}
          >
            <Typography variant="h3" component="h1">
              {t("templates.entry.title")}
            </Typography>
            <Typography variant="subtitle1">
              {t("templates.entry.subtitle")}
            </Typography>
            <Box>
              <GoogleLoginButton variant="contained"/>
            </Box>
          </Stack>
        </Container>
      </Box>
      <Box
        sx={{
          backgroundImage: `url(${BlaGOBackground})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          bottom: {
            xs: 32,
            md: "unset",
          },
          height: {
            xs: 400,
            md: 600,
          },
          position: "absolute",
          right: 0,
          top: {
            xs: "unset",
            md: 88,
          },
          width: {
            xs: 200,
            md: 300,
          },
          zIndex: -1,
        }}
      />
    </>
  );
}

export default EntryTemplate;
