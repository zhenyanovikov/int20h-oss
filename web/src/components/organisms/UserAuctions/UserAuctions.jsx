import { Stack } from "@mui/material";
import UserAuction from "../../molecules/UserAuction/UserAuction";

function UserAuctions({ auctions }) {
  return (
    <Stack spacing={4}>
      {auctions.map((auction) => (
        <UserAuction key={auction.id} auction={auction} />
      ))}
    </Stack>
  );
}

export default UserAuctions;
