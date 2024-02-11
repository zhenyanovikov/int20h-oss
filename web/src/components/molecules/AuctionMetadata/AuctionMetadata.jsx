import { Stack, Typography } from "@mui/material";
import dayjs from "dayjs";
import { AUCTION_STATUS_MAPPER } from "../../../constants/auction";
import { useTranslation } from "react-i18next";

function AuctionMetadata({ auction }) {
  const { t } = useTranslation();

  return (
    <Stack direction="row" alignItems="center" spacing={1}>
      <Typography variant="body2" component="span" color="text.secondary">
        {dayjs(auction.createdAt).fromNow()}
      </Typography>
      <Typography variant="body2" component="span" color="text.secondary">
        ·
      </Typography>
      <Typography
        variant="body2"
        component="span"
        color={AUCTION_STATUS_MAPPER[auction.status].COLOR}
      >
        {t(AUCTION_STATUS_MAPPER[auction.status].LABEL)}
      </Typography>
    </Stack>
  );
}

export default AuctionMetadata;
