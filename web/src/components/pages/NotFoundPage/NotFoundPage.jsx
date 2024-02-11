import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Box } from "@mui/material";
import LetteringTemplate from "../../templates/LetteringTemplate/LetteringTemplate";
import Lettering404Illustration from "../../../assets/illustrations/techny-lettering-four-hundred-four-text.png";

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
          alt={t("pages.notFound.image.technyLettering")}
          src={Lettering404Illustration}
        />
      }
      title={t("pages.notFound.title")}
      subtitle={t("pages.notFound.subtitle")}
      buttonLabel={t("pages.notFound.button.backToMain")}
      onButtonClick={() => navigate("/")}
    />
  );
}

export default NotFoundPage;
