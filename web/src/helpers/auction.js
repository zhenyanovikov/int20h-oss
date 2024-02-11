export function getLastBidAmount(auctionHistory) {
  if (!auctionHistory) {
    return null;
  }

  if (!auctionHistory.length) {
    return 0;
  }

  return auctionHistory[0].amount;
}
