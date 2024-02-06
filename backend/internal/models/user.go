package models

import "github.com/google/uuid"

type User struct {
	ID        uuid.UUID `json:"id" bun:",pk,nullzero"`
	FirstName string    `json:"first_name"`
	LastName  string    `json:"last_name"`
	Email     string    `json:"email"`
	AvatarURL string    `json:"avatar_url"`
}
