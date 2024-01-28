import { Button, Stack } from "@mui/material";
import { useTranslation } from "react-i18next";
import useClientStore from "../../../store/clientStore";
import Section from "../../molecules/Section/Section";

function MuiPalleteModeSection() {
  const { t } = useTranslation();

  const toggleThemeMode = useClientStore((state) => state.toggleThemeMode);

  return (
    <Section title={t("organism.muiPalleteModeSection.title")}>
      <Stack alignItems="center">
        <Button variant="contained" onClick={toggleThemeMode}>
          {t("organism.muiPalleteModeSection.button.toggle")}
        </Button>
      </Stack>
    </Section>
  );
}

export default MuiPalleteModeSection;
