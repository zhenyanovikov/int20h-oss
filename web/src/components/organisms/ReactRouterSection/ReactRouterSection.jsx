import { Link as RouterLink } from "react-router-dom";
import { Stack, Link } from "@mui/material";
import { useTranslation } from "react-i18next";
import Section from "../../molecules/Section/Section";

function ReactRouterSection() {
  const { t } = useTranslation();

  return (
    <Section title={t("organism.reactRouterSection.title")}>
      <Stack alignItems="center">
        <Link component={RouterLink} to="/beyond-the-horizon">
          {t("organism.reactRouterSection.text.link")}
        </Link>
      </Stack>
    </Section>
  );
}

export default ReactRouterSection;
