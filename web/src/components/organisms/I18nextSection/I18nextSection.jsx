import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Stack,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import useClientStore from "../../../store/clientStore";
import Section from "../../molecules/Section/Section";
import { SELECT_LOCALE_ITEMS } from "./constants";

function I18nSection() {
  const { t } = useTranslation();

  const locale = useClientStore((state) => state.locale);
  const setLocale = useClientStore((state) => state.setLocale);

  return (
    <Section title={t("organism.i18nextSection.title")}>
      <Stack alignItems="center">
        <FormControl>
          <InputLabel id="select-locale-label">
            {t("organism.i18nextSection.select.localeLabel")}
          </InputLabel>
          <Select
            labelId="select-locale-label"
            id="select-locale"
            value={locale}
            label={t("organism.i18nextSection.select.localeLabel")}
            onChange={handleChange}
          >
            {SELECT_LOCALE_ITEMS.map((item) => (
              <MenuItem key={item.value} value={item.value}>
                {t(item.label)}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Stack>
    </Section>
  );

  function handleChange(e) {
    setLocale(e.target.value);
  }
}

export default I18nSection;
