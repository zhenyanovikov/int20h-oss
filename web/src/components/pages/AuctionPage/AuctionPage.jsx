import { useGetAuction } from "../../../api/auctions";
import { useParams } from "react-router-dom";
import AuctionTemplate from "../../templates/AuctionTemplate/AuctionTemplate";

function AuctionPage() {
  const { id } = useParams();

  const { data: auctionData, isLoading: isGetAuctionLoading } =
    useGetAuction(id);

  return (
    <AuctionTemplate
      auctionData={auctionData}
      isGetAuctionLoading={isGetAuctionLoading}
    />
  );
}

export default AuctionPage;
