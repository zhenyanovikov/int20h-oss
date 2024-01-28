import { Box } from "@mui/material";
import { useTranslation } from "react-i18next";
import TechnyWarningIllustration from "../../../assets/illustrations/techny-warning-icon.png";
import LetteringTemplate from "../../templates/LetteringTemplate/LetteringTemplate";

function ErrorPage({ resetErrorBoundary }) {
  const { t } = useTranslation();

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
          alt={t("page.error.image.technyWarning")}
          src={TechnyWarningIllustration}
        />
      }
      title={t("page.error.title")}
      subtitle={t("page.error.subtitle")}
      buttonLabel={t("page.error.button.returnToPreviousPage")}
      onButtonClick={resetErrorBoundary}
    />
  );
}

export default ErrorPage;
