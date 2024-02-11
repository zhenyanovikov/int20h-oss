import {
  Box,
  Container,
  Stack,
  Button,
  CircularProgress,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import { ArrowBack as ArrowBackIcon } from "@mui/icons-material";
import { useNavigate } from "react-router";
import AuctionImagesSection from "../../organisms/AuctionImagesSection/AuctionImagesSection";
import AuctionBiddingSection from "../../organisms/AuctionBiddingSection/AuctionBiddingSection";
import AuctionBiddersSection from "../../organisms/AuctionBiddersSection/AuctionBiddersSection";
import { ROUTE } from "../../../constants/router";
import { useTranslation } from "react-i18next";

function AuctionTemplate({ auctionData, isGetAuctionLoading }) {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <Box py={8}>
      <Container>
        <Stack spacing={2}>
          <Stack alignSelf="flex-start">
            <Button onClick={handleGoBack} startIcon={<ArrowBackIcon />}>
              {t("templates.auctionTemplate.button.back")}
            </Button>
          </Stack>

          {isGetAuctionLoading || !auctionData ? (
            <Stack alignItems="center">
              <CircularProgress />
            </Stack>
          ) : (
            <Box>
              <Grid container spacing={2}>
                <Grid item xs={12} md={8}>
                  <Paper>
                    <Box p={2}>
                      <AuctionImagesSection images={auctionData.images} />
                    </Box>
                  </Paper>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Paper>
                    <Box p={2}>
                      <AuctionBiddingSection auction={auctionData} />
                    </Box>
                  </Paper>
                </Grid>
                <Grid item xs={12} md={8}>
                  <Paper>
                    <Stack p={2} spacing={1}>
                      <Typography variant="h6" component="h2">
                        {t("templates.auctionTemplate.text.description")}
                      </Typography>
                      <Typography variant="body1" component="p">
                        {auctionData.description}
                      </Typography>
                    </Stack>
                  </Paper>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Paper>
                    <Box>
                      <AuctionBiddersSection auctionId={auctionData.id} />
                    </Box>
                  </Paper>
                </Grid>
              </Grid>
            </Box>
          )}
        </Stack>
      </Container>
    </Box>
  );

  function handleGoBack() {
    navigate(ROUTE.AUCTIONS);
  }
}

export default AuctionTemplate;
