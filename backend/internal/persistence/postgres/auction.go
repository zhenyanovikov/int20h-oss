package postgres

import (
	"context"

	"github.com/google/uuid"
	"oss-backend/internal/models"
)

const (
	OwnerRelation       = "Owner"
	WinnerRelation      = "Winner"
	StartingBidRelation = "StartingBid"
	WinningBidRelation  = "WinningBid"
	UserRelation        = "User"
)

func (p *Postgres) GetAllAuctions(ctx context.Context) ([]*models.Auction, error) {
	var auctions []*models.Auction
	err := p.db.NewSelect().
		Model(&auctions).
		Relation(OwnerRelation).
		Relation(WinnerRelation).
		Relation(StartingBidRelation).
		Relation(WinningBidRelation).
		Scan(ctx)
	if err != nil {
		return nil, p.err(err)
	}

	return auctions, nil
}

func (p *Postgres) GetAuctionByID(ctx context.Context, id uuid.UUID) (*models.Auction, error) {
	var auction models.Auction
	err := p.db.NewSelect().
		Model(&auction).
		Where("auction.id = ?", id).
		Relation(OwnerRelation).
		Relation(WinnerRelation).
		Relation(StartingBidRelation).
		Relation(WinningBidRelation).
		Scan(ctx)
	if err != nil {
		return nil, p.err(err)
	}

	return &auction, nil
}

func (p *Postgres) GetAuctionsByUserID(ctx context.Context, userID uuid.UUID) ([]*models.Auction, error) {
	var auctions []*models.Auction
	err := p.db.NewSelect().
		Model(&auctions).
		Where("auction.owner_id = ?", userID).
		Relation(OwnerRelation).
		Relation(WinnerRelation).
		Relation(StartingBidRelation).
		Relation(WinningBidRelation).
		Scan(ctx)
	if err != nil {
		return nil, p.err(err)
	}

	return auctions, nil
}

func (p *Postgres) GetBidHistory(ctx context.Context, auctionID uuid.UUID) ([]models.Bid, error) {
	var bids []models.Bid
	err := p.db.NewSelect().
		Model(&bids).
		Where("auction_id = ?", auctionID).
		Relation(UserRelation).
		Scan(ctx)
	if err != nil {
		return nil, p.err(err)
	}

	return bids, nil
}

func (p *Postgres) CreateAuction(ctx context.Context, auction *models.Auction) error {
	_, err := p.db.NewInsert().
		Model(auction).
		Exec(ctx)
	if err != nil {
		return p.err(err)
	}

	return nil
}

func (p *Postgres) CreateBid(ctx context.Context, bid *models.Bid) error {
	_, err := p.db.NewInsert().
		Model(bid).
		Returning("*").
		Exec(ctx)
	if err != nil {
		return p.err(err)
	}

	return nil
}

func (p *Postgres) UpdateAuction(ctx context.Context, auction *models.Auction) error {
	_, err := p.db.NewUpdate().
		Model(auction).
		Where("id = ?", auction.ID).
		Returning("*").
		Exec(ctx)
	if err != nil {
		return p.err(err)
	}

	return nil
}

func (p *Postgres) DeleteAuction(ctx context.Context, id uuid.UUID) error {
	_, err := p.db.NewDelete().
		Model(&models.Auction{}).
		Where("id = ?", id).
		Exec(ctx)
	if err != nil {
		return p.err(err)
	}

	return nil
}
