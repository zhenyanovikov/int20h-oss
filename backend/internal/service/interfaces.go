package service

import (
	"context"

	"github.com/google/uuid"
	"oss-backend/internal/models"
)

type Auth interface {
	GenerateToken(ctx context.Context, user *models.User) (*models.UserCredentials, error)
	GetCredentials(ctx context.Context, user *models.User) (*models.UserCredentials, error)
	Login(ctx context.Context, accessToken string) (*models.User, error)
}

type User interface {
	GetUser(id uuid.UUID) (*models.User, error)
}

type Auction interface {
	GetAll(ctx context.Context) ([]*models.Auction, error)
	GetByID(ctx context.Context, id uuid.UUID) (*models.Auction, error)
	GetByUserID(ctx context.Context, userID uuid.UUID) ([]*models.Auction, error)
	CreateAuction(ctx context.Context, auction *models.Auction) error
	UpdateAuction(ctx context.Context, auction *models.Auction) error
	DeleteAuction(ctx context.Context, id uuid.UUID) error
}
