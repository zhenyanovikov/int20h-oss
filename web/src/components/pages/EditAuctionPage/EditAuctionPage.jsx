import { useParams } from "react-router-dom";
import { useGetAuction } from "../../../api/auctions";
import EditAuctionTemplate from "../../templates/EditAuctionTemplate/EditAuctionTemplate";

function EditAuctionPage() {
  const { id } = useParams();

  const { data: auctionData, isLoading: isGetAuctionLoading } =
    useGetAuction(id);

  return (
    <EditAuctionTemplate
      auctionData={auctionData}
      isGetAuctionLoading={isGetAuctionLoading}
    />
  );
}

export default EditAuctionPage;
