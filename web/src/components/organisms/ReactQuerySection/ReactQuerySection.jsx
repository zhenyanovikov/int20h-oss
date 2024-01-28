import { CircularProgress, Stack, Box, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import Section from "../../molecules/Section/Section";

function ReactQuerySection({ data, isLoading }) {
  const { t } = useTranslation();

  return (
    <Section title={t("organism.reactQuerySection.title")}>
      <Stack alignItems="center">
        <Box
          sx={{
            width: {
              xs: "100%",
              md: "80%",
            },
            overflow: "hidden",
          }}
        >
          {isLoading || !data ? (
            <Stack alignItems="center">
              <CircularProgress />
            </Stack>
          ) : (
            <Typography variant="body1">{JSON.stringify(data)}</Typography>
          )}
        </Box>
      </Stack>
    </Section>
  );
}

export default ReactQuerySection;
