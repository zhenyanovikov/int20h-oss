export const AUCTIONS_KEY = "auctions";
export const AUCTION_HISTORY_KEY = "auctionHistory";
export const AUCTIONS_URL = "/auctions";
export const AUCTION_URL = "/auctions/:id";
export const AUCTION_HISTORY_URL = "/auctions/:id/bid";
export const AUCTION_BID_URL = "/auctions/:id/bid";

export const AUCTION_HISTORY_REFETCH_INTERVAL = 30000;

export const AUCTION_STATUS = {
  PENDING: "pending",
  ACTIVE: "active",
  COMPLETED: "completed",
};

export const AUCTION_STATUS_MAPPER = {
  [AUCTION_STATUS.PENDING]: {
    LABEL: "constants.auctionStatus.label.pending",
    COLOR: "warning.main",
  },
  [AUCTION_STATUS.ACTIVE]: {
    LABEL: "constants.auctionStatus.label.active",
    COLOR: "success.main",
  },
  [AUCTION_STATUS.COMPLETED]: {
    LABEL: "constants.auctionStatus.label.completed",
    COLOR: "error.main",
  },
};
