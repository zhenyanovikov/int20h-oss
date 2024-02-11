package persistence

import (
	"context"

	"github.com/google/uuid"
	"oss-backend/internal/models"
)

type Auth interface {
	GetCredentialsByAccessToken(ctx context.Context, accessToken string) (*models.UserCredentials, error)
	GetCredentialsByRefreshToken(ctx context.Context, refreshToken string) (*models.UserCredentials, error)

	CreateCredentials(ctx context.Context, credentials *models.UserCredentials) error
}

type User interface {
	GetByID(ctx context.Context, id uuid.UUID) (*models.User, error)
	UpsertOnEmail(ctx context.Context, user *models.User) error
}

type Auction interface {
	GetAllAuctions(ctx context.Context) ([]*models.Auction, error)
	GetAuctionByID(ctx context.Context, id uuid.UUID) (*models.Auction, error)
	GetAuctionsByUserID(ctx context.Context, userID uuid.UUID) ([]*models.Auction, error)
	GetBidHistory(ctx context.Context, auctionID uuid.UUID) ([]models.Bid, error)

	CreateAuction(ctx context.Context, auction *models.Auction) error
	CreateBid(ctx context.Context, bid *models.Bid) error

	UpdateAuction(ctx context.Context, auction *models.Auction) error
	UpdateBid(ctx context.Context, bid *models.Bid) error

	DeleteAuction(ctx context.Context, id uuid.UUID) error
}
