import { BrowserRouter, Route, Routes } from "react-router-dom";
import BaseTemplate from "../components/templates/BaseTemplate/BaseTemplate";
import PrivateTemplate from "../components/templates/PrivateTemplate/PrivateTemplate";
import EntryPage from "../components/pages/EntryPage/EntryPage";
import CreateAuctionPage from "../components/pages/CreateAuctionPage/CreateAuctionPage";
import EditAuctionPage from "../components/pages/EditAuctionPage/EditAuctionPage";
import AuctionsPage from "../components/pages/AuctionsPage/AuctionsPage";
import AuctionPage from "../components/pages/AuctionPage/AuctionPage";
import UserAuctionsPage from "../components/pages/UserAuctionsPage/UserAuctionsPage";
import NotFoundPage from "../components/pages/NotFoundPage/NotFoundPage";
import { ROUTE } from "../constants/router";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<BaseTemplate />}>
          <Route index element={<EntryPage />} />
          <Route path={ROUTE.AUCTIONS} element={<AuctionsPage />} />
          <Route path={ROUTE.AUCTION} element={<AuctionPage />} />
          <Route
            path={ROUTE.USER_AUCTIONS}
            element={
              <PrivateTemplate>
                <UserAuctionsPage />
              </PrivateTemplate>
            }
          />
          <Route
            path={ROUTE.CREATE_AUCTION}
            element={
              <PrivateTemplate>
                <CreateAuctionPage />
              </PrivateTemplate>
            }
          />
          <Route
            path={ROUTE.EDIT_AUCTION}
            element={
              <PrivateTemplate>
                <EditAuctionPage />
              </PrivateTemplate>
            }
          />
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
