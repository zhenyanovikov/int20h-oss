import { useGetUserAuctions } from "../../../api/user";
import UserAuctionsTemplate from "../../templates/UserAuctionsTemplate/UserAuctionsTempalte";

function UserAuctionsPage() {
  const { data: userAuctionsData, isLoading: isGetUserAuctionsLoading } =
    useGetUserAuctions();

  return (
    <UserAuctionsTemplate
      userAuctionsData={userAuctionsData}
      isGetUserAuctionsLoading={isGetUserAuctionsLoading}
    />
  );
}

export default UserAuctionsPage;
