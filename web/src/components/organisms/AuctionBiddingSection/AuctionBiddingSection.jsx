import { Box, Stack, Typography, CircularProgress } from "@mui/material";
import { useTranslation } from "react-i18next";
import UserPreview from "../../molecules/UserPreview/UserPreview";
import { useGetAuctionHistory } from "../../../api/auctions";
import { useGetUser } from "../../../api/user";
import { getLastBidAmount } from "../../../helpers/auction";
import { hryvniasFormatter, scaleAmountDown } from "../../../helpers/currency";
import { AUCTION_STATUS } from "../../../constants/auction";
import AuctionMetadata from "../../molecules/AuctionMetadata/AuctionMetadata";
import CreateBidForm from "../CreateBidForm/CreateBidForm";

function AuctionBiddingSection({ auction }) {
  const { t } = useTranslation();

  const { data: auctionHistoryData, isLoading: isGetAuctionHistoryLoading } =
    useGetAuctionHistory(auction.id);
  const { data: userData } = useGetUser();

  const isOwner = userData?.id === auction.owner.id;

  const startingBidAmount = auction.startingBid.amount;
  const currentBidAmount = getLastBidAmount(auctionHistoryData);

  const isAuctionPending = auction.status === AUCTION_STATUS.PENDING;
  const isAuctionActive = auction.status === AUCTION_STATUS.ACTIVE;

  const hasCreateBidForm = isAuctionActive && !isOwner;

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
            {auctionBidLabel()}
          </Typography>
          {isGetAuctionHistoryLoading || !auctionHistoryData ? (
            <CircularProgress />
          ) : (
            <Typography variant="h4" component="span">
              {hryvniasFormatter.format(
                scaleAmountDown(
                  isAuctionPending ? startingBidAmount : currentBidAmount
                )
              )}
            </Typography>
          )}
        </Stack>
        {hasCreateBidForm && (
          <CreateBidForm
            auctionId={auction.id}
            minBidAmount={currentBidAmount}
          />
        )}
      </Stack>
    </Box>
  );

  function auctionBidLabel() {
    if (isAuctionPending) {
      return t("organisms.auctionBiddingSection.text.startingBid");
    }

    if (isAuctionActive) {
      return t("organisms.auctionBiddingSection.text.currentBid");
    }

    return t("organisms.auctionBiddingSection.text.finalBid");
  }
}

export default AuctionBiddingSection;
