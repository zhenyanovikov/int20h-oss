import {
  Box,
  CircularProgress,
  Container,
  Stack,
  Typography,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import Empty from "../../molecules/Empty/Empty";
import Auctions from "../../organisms/Auctions/Auctions";

function AuctionsTemplate({ auctionsData, isGetAuctionsLoading }) {
  const { t } = useTranslation();

  return (
    <Box py={8}>
      <Container>
        <Stack spacing={4}>
          <Typography variant="h4" component="h1">
            {t("templates.auctions.title")}
          </Typography>

          {isGetAuctionsLoading || !auctionsData ? (
            <Stack alignItems="center">
              <CircularProgress />
            </Stack>
          ) : (
            <>
              {!auctionsData.length ? (
                <Empty />
              ) : (
                <Auctions auctions={auctionsData} />
              )}
            </>
          )}
        </Stack>
      </Container>
    </Box>
  );
}

export default AuctionsTemplate;
