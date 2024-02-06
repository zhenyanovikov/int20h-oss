package auth

import (
	"oss-backend/internal/config"
	"oss-backend/internal/persistence"
)

type Service struct {
	cfg config.Config

	authDB persistence.Auth
	userDB persistence.User
}

func New(cfg config.Config, authDB persistence.Auth, userDB persistence.User) *Service {
	return &Service{
		cfg: cfg,

		authDB: authDB,
		userDB: userDB,
	}
}
