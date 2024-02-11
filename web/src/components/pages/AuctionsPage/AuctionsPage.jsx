import AuctionsTemplate from "../../templates/AuctionsTemplate/AuctionsTemplate";
import { useGetAuctions } from "../../../api/auctions";

function AuctionsPage() {
  const { data: auctionsData, isLoading: isGetAuctionsLoading } =
    useGetAuctions();

  return (
    <AuctionsTemplate
      auctionsData={auctionsData}
      isGetAuctionsLoading={isGetAuctionsLoading}
    />
  );
}

export default AuctionsPage;
