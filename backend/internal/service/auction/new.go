package auction

import (
	"oss-backend/internal/persistence"
)

type Service struct {
	auctionRepo persistence.Auction
}

func New(auctionRepo persistence.Auction) *Service {
	return &Service{
		auctionRepo: auctionRepo,
	}
}
