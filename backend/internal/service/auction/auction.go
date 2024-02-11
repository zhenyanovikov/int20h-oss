package auction

import (
	"context"
	"fmt"
	"time"

	"github.com/google/uuid"
	"oss-backend/internal/models"
)

func (s Service) GetAll(ctx context.Context) ([]*models.Auction, error) {
	auctions, err := s.auctionRepo.GetAllAuctions(ctx)
	if err != nil {
		return nil, fmt.Errorf("failed to get all auctions: %w", err)
	}

	if len(auctions) == 0 {
		return []*models.Auction{}, nil
	}

	return auctions, nil
}

func (s Service) GetByID(ctx context.Context, id uuid.UUID) (*models.Auction, error) {
	return s.auctionRepo.GetAuctionByID(ctx, id)
}

func (s Service) GetByUserID(ctx context.Context, userID uuid.UUID) ([]*models.Auction, error) {
	return s.auctionRepo.GetAuctionsByUserID(ctx, userID)
}

func (s Service) CreateAuction(ctx context.Context, auction *models.Auction) error {
	auction.ID = uuid.New()
	auction.Status = models.AuctionStatusActive
	auction.OwnerID = ctx.Value("user_id").(uuid.UUID)
	auction.CreatedAt = time.Now()

	startingBid := models.Bid{
		AuctionID: auction.ID,
		UserID:    auction.OwnerID,
		Amount:    auction.StartingBid.Amount,
		CreatedAt: time.Now(),
	}

	if err := s.auctionRepo.CreateBid(ctx, &startingBid); err != nil {
		return fmt.Errorf("failed to create starting bid: %w", err)
	}

	auction.StartingBidID = startingBid.ID

	return s.auctionRepo.CreateAuction(ctx, auction)
}

func (s Service) UpdateAuction(ctx context.Context, updatedAuction *models.Auction) error {
	auction, err := s.auctionRepo.GetAuctionByID(ctx, updatedAuction.ID)
	if err != nil {
		return fmt.Errorf("failed to get auction: %w", err)
	}

	if auction.Status == models.AuctionStatusCompleted {
		return fmt.Errorf("auction is already completed")
	}

	auction.Title = updatedAuction.Title
	auction.Description = updatedAuction.Description
	auction.ImageURLs = updatedAuction.ImageURLs
	auction.EndedAt = updatedAuction.EndedAt
	auction.WinnerID = updatedAuction.WinnerID
	auction.WinningBidID = updatedAuction.WinningBidID
	auction.Status = updatedAuction.Status

	return s.auctionRepo.UpdateAuction(ctx, auction)
}

func (s Service) DeleteAuction(ctx context.Context, id uuid.UUID) error {
	return s.auctionRepo.DeleteAuction(ctx, id)
}
