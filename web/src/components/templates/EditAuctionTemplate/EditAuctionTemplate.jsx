import {
  Box,
  CircularProgress,
  Container,
  Stack,
  Typography,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import EditAuctionForm from "../../organisms/EditAuctionForm/EditAuctionForm";

function EditAuctionTemplate({ auctionData, isGetAuctionLoading }) {
  const { t } = useTranslation();

  return (
    <Box py={8}>
      <Container>
        <Stack spacing={4}>
          <Typography variant="h4" component="h1">
            {t("templates.editAuctionTemplate.title")}
          </Typography>

          {isGetAuctionLoading || !auctionData ? (
            <CircularProgress />
          ) : (
            <EditAuctionForm auction={auctionData} />
          )}
        </Stack>
      </Container>
    </Box>
  );
}

export default EditAuctionTemplate;
