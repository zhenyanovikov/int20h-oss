import { Stack } from "@mui/material";
import Auction from "../../molecules/Auction/Auction";

function Auctions({ auctions }) {
  return (
    <Stack spacing={4}>
      {auctions.map((auction) => (
        <Auction key={auction.id} auction={auction} />
      ))}
    </Stack>
  );
}

export default Auctions;
