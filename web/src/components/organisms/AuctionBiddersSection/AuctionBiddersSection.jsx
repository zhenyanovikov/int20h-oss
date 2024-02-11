import {
  Box,
  CircularProgress,
  List,
  ListItem,
  Stack,
  Typography,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { useGetAuctionHistory } from "../../../api/auctions";
import { hryvniasFormatter, scaleAmountDown } from "../../../helpers/currency";
import Empty from "../../molecules/Empty/Empty";
import UserPreview from "../../molecules/UserPreview/UserPreview";

function AuctionBiddersSection({ auctionId }) {
  const { t } = useTranslation();

  const { data: auctionHistoryData, isLoading: isGetAuctionHistoryLoading } =
    useGetAuctionHistory(auctionId);

  if (isGetAuctionHistoryLoading || !auctionHistoryData) {
    return (
      <Box p={2}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="h6" component="h2" pt={2} px={2}>
        {t("organisms.auctionBiddersSection.text.history")}
      </Typography>
      {!auctionHistoryData.length ? (
        <Box pt={1} pb={2}>
          <Empty />
        </Box>
      ) : (
        <List sx={{ maxHeight: 296, overflow: "auto" }}>
          {auctionHistoryData.map((bid) => (
            <ListItem key={bid.id}>
              <Stack
                width="100%"
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                py={1}
              >
                <UserPreview user={bid.bidder} />
                <Typography variant="body2" component="span">
                  {hryvniasFormatter.format(scaleAmountDown(bid.amount))}
                </Typography>
              </Stack>
            </ListItem>
          ))}
        </List>
      )}
    </Box>
  );
}

export default AuctionBiddersSection;
