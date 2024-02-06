package models

import (
	"time"

	"github.com/google/uuid"
)

type UserCredentials struct {
	ID          uuid.UUID `json:"-" bun:",pk,nullzero"`
	UserID      uuid.UUID `json:"-" bun:",nullzero"`
	User        *User     `json:"-" bun:"rel:belongs-to"`
	AccessToken string    `json:"access_token"`
	ExpiresAt   time.Time `json:"expires_at"`
	CreatedAt   time.Time `json:"-" bun:",default:current_timestamp"`
}
