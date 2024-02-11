import { Button, IconButton } from "@mui/material";
import { Google as GoogleIcon } from "@mui/icons-material";
import { useTranslation } from "react-i18next";
import { useLogin } from "../../../api/auth";

function GoogleLoginButton({ variant, color, isIconButton }) {
  const { t } = useTranslation();

  const handleLogin = useLogin();

  if (isIconButton) {
    return (
      <IconButton color={color} onClick={handleLogin}>
        <GoogleIcon />
      </IconButton>
    );
  }

  return (
    <Button
      variant={variant}
      color={color}
      onClick={handleLogin}
      startIcon={<GoogleIcon />}
    >
      {t("molecules.googleLoginButton.continueWithGoogle")}
    </Button>
  );
}

export default GoogleLoginButton;
