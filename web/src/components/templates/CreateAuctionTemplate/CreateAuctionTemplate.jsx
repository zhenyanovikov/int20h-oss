import { Box, Container, Stack, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import CreateAuctionForm from "../../organisms/CreateAuctionForm/CreateAuctionForm";

function CreateAuctionTemplate() {
  const { t } = useTranslation();

  return (
    <Box py={8}>
      <Container>
        <Stack spacing={4}>
          <Typography variant="h4" component="h1">
            {t("templates.createAuctionTemplate.title")}
          </Typography>

          <CreateAuctionForm />
        </Stack>
      </Container>
    </Box>
  );
}

export default CreateAuctionTemplate;
