import { enqueueSnackbar } from "notistack";
import HomeTemplate from "../../templates/HomeTemplate/HomeTemplate";
import { useGetUsers } from "./api";

function HomePage() {
  const { data: usersData, isLoading: isGetUsersLoading } = useGetUsers();

  return (
    <HomeTemplate
      usersData={usersData}
      isGetUsersLoading={isGetUsersLoading}
      onUserSubmit={handleUserSubmit}
    />
  );

  function handleUserSubmit(values) {
    enqueueSnackbar(JSON.stringify(values));
  }
}

export default HomePage;
