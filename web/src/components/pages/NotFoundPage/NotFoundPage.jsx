import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Box } from "@mui/material";
import { ROUTE } from "../../../constants/router";
import LetteringTemplate from "../../templates/LetteringTemplate/LetteringTemplate";
import TechnyLetteringIllustration from "../../../assets/illustrations/techny-lettering-error-404-with-warning-sign-and-wrench-text.png";

function NotFoundPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <LetteringTemplate
      image={
        <Box
          component="img"
          sx={{
            height: {
              xs: "160px",
              md: "240px",
            },
          }}
          alt={t("page.notFound.image.technyLettering")}
          src={TechnyLetteringIllustration}
        />
      }
      title={t("page.notFound.title")}
      subtitle={t("page.notFound.subtitle")}
      buttonLabel={t("page.notFound.button.backToHome")}
      onButtonClick={() => navigate(ROUTE.HOME)}
    />
  );
}

export default NotFoundPage;
