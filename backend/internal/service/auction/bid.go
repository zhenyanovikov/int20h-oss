package auction

import (
	"context"
	"time"

	"github.com/google/uuid"
	"oss-backend/internal/models"
)

func (s Service) GetBidHistory(ctx context.Context, auctionID uuid.UUID) ([]models.Bid, error) {
	return s.auctionRepo.GetBidHistory(ctx, auctionID)
}

func (s Service) CreateBid(ctx context.Context, bid *models.Bid) error {
	bid.UserID = ctx.Value("user_id").(uuid.UUID)
	bid.CreatedAt = time.Now()

	return s.auctionRepo.CreateBid(ctx, bid)
}
