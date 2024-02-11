import {
  AppBar,
  Container,
  Toolbar,
  Stack,
  Box,
  useMediaQuery,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import BlaGOLogo from "../../../assets/logos/bla-go.svg";
import useIsLoggedIn from "../../../hooks/useIsLoggedIn";
import CreateAuctionButton from "../../molecules/CreateAuctionButton/CreateAuctionButton";
import LocaleToggleButton from "../../molecules/LocaleToggleButton/LocaleToggleButton";
import ThemeToggleButton from "../../molecules/ThemeToggleButton/ThemeToggleButton";
import GoogleLoginButton from "../../molecules/GoogleLoginButton/GoogleLoginButton";
import UserMenu from "../../molecules/UserMenu/UserMenu";

function Navbar() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const isLoggedIn = useIsLoggedIn();
  const isLargerThanSm = useMediaQuery((theme) => theme.breakpoints.up("sm"));

  return (
    <AppBar position="static">
      <Container>
        <Toolbar disableGutters>
          <Stack width="100%" direction="row" justifyContent="space-between">
            <Box
              component="img"
              alt={t("organisms.navbar.image.blaGO")}
              src={BlaGOLogo}
              sx={{
                cursor: "pointer",
              }}
              onClick={handleLogoClick}
            />
            <Stack direction="row" alignItems="center" spacing={1}>
              {isLoggedIn && <CreateAuctionButton />}
              <LocaleToggleButton />
              <ThemeToggleButton />
              {isLoggedIn ? (
                <UserMenu />
              ) : (
                <GoogleLoginButton
                  variant="outlined"
                  color="inherit"
                  isIconButton={!isLargerThanSm}
                />
              )}
            </Stack>
          </Stack>
        </Toolbar>
      </Container>
    </AppBar>
  );

  function handleLogoClick() {
    navigate("/");
  }
}

export default Navbar;
