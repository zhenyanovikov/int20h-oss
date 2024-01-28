import { Box } from "@mui/material";
import BouncyHourglassIllustration from "../../../assets/illustrations/bouncy-hourglass-and-loading-icon.gif";
import LetteringTemplate from "../../templates/LetteringTemplate/LetteringTemplate";

function LocalisationFallbackPage() {
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
          // This alternative text remains untranslated as the page employs a Suspense fallback,
          // and internationalization (i18n) translations may still be loaded through the HTTP backend.
          alt="Bouncy hourglass and loading icon"
          src={BouncyHourglassIllustration}
        />
      }
    />
  );
}

export default LocalisationFallbackPage;
