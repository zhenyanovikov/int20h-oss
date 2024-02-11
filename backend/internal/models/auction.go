package models

import (
	"time"

	"github.com/google/uuid"
)

var (
	AuctionStatusPending   = "pending"
	AuctionStatusActive    = "active"
	AuctionStatusCompleted = "completed"
)

type Auction struct {
	ID          uuid.UUID `json:"id" bun:",pk,nullzero"`
	Title       string    `json:"title"`
	Description string    `json:"description"`
	ImageURLs   []string  `json:"images" bun:"image_urls,array"`
	Status      string    `json:"status"`
	CreatedAt   time.Time `json:"createdAt"`
	EndedAt     time.Time `json:"endedAt,omitempty"`
	Owner       *User     `json:"owner,omitempty" bun:"rel:belongs-to"`
	Winner      *User     `json:"winner,omitempty" bun:"rel:belongs-to"`
	StartingBid *Bid      `json:"startingBid" bun:"rel:has-one,join:starting_bid_id=id"`
	WinningBid  *Bid      `json:"winningBid,omitempty" bun:"rel:has-one,join:winning_bid_id=id"`

	OwnerID       uuid.UUID `json:"-"`
	WinnerID      uuid.UUID `json:"-" bun:",nullzero"`
	StartingBidID uuid.UUID `json:"-"`
	WinningBidID  uuid.UUID `json:"-" bun:",nullzero"`
}

type Bid struct {
	ID        uuid.UUID `json:"-" bun:",pk,nullzero"`
	AuctionID uuid.UUID `json:"-"`
	Amount    int       `json:"amount"`
	User      *User     `json:"bidder,omitempty" bun:"rel:belongs-to"`
	CreatedAt time.Time `json:"date" bun:"created_at"`
	UserID    uuid.UUID `json:"-"`
}
