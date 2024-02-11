import { Box, Stack, Typography, CircularProgress } from "@mui/material";
import { useTranslation } from "react-i18next";
import UserPreview from "../../molecules/UserPreview/UserPreview";
import { useGetAuctionHistory } from "../../../api/auctions";
import { getLastBidAmount } from "../../../helpers/auction";
import { hryvniasFormatter, scaleAmountDown } from "../../../helpers/currency";
import AuctionMetadata from "../../molecules/AuctionMetadata/AuctionMetadata";
import CreateBidForm from "../CreateBidForm/CreateBidForm";

function AuctionBiddingSection({ auction }) {
  const { t } = useTranslation();

  const { data: auctionHistoryData, isLoading: isGetAuctionHistoryLoading } =
    useGetAuctionHistory(auction.id);

  const currentBidAmount = getLastBidAmount(auctionHistoryData);

  return (
    <Box>
      <Stack spacing={4}>
        <Stack spacing={2}>
          <Stack spacing={1}>
            <AuctionMetadata auction={auction} />
            <UserPreview user={auction.owner} size="small" />
          </Stack>
          <Typography variant="h5" component="h1">
            {auction.title}
          </Typography>
        </Stack>
        <Stack spacing={1}>
          <Typography variant="body2" component="span" color="text.secondary">
            {t("organisms.auctionBiddingSection.text.currentBid")}
          </Typography>
          {isGetAuctionHistoryLoading || !auctionHistoryData ? (
            <CircularProgress />
          ) : (
            <Typography variant="h4" component="span">
              {hryvniasFormatter.format(scaleAmountDown(currentBidAmount))}
            </Typography>
          )}
        </Stack>
        <CreateBidForm auctionId={auction.id} minBidAmount={currentBidAmount} />
      </Stack>
    </Box>
  );
}

export default AuctionBiddingSection;
