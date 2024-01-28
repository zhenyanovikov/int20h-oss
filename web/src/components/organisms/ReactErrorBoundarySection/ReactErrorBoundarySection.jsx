import { useEffect, useState } from "react";
import { Button, Stack } from "@mui/material";
import Section from "../../molecules/Section/Section";
import { useTranslation } from "react-i18next";

function ReactErrorBoundarySection() {
  const { t } = useTranslation();

  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (!isError) {
      return;
    }

    throw new Error("Error");
  }, [isError]);

  return (
    <Section title={t("organism.reactErrorBoundarySection.title")}>
      <Stack alignItems="center">
        <Button variant="contained" color="error" onClick={handleClick}>
          {t("organism.reactErrorBoundarySection.button.error")}
        </Button>
      </Stack>
    </Section>
  );

  function handleClick() {
    setIsError(true);
  }
}

export default ReactErrorBoundarySection;
