package httpserver

import (
	"context"
	"fmt"
	"net/http"

	"github.com/markbates/goth/gothic"
	"oss-backend/internal/models"
)

func (s *HTTPServer) oauthCallback(w http.ResponseWriter, r *http.Request) {
	gothicUser, err := gothic.CompleteUserAuth(w, r)
	if err != nil {
		s.error(w, http.StatusInternalServerError, fmt.Errorf("complete oauth: %w", err))
		return
	}

	// save user
	user := models.User{
		FirstName: gothicUser.FirstName,
		LastName:  gothicUser.LastName,
		Email:     gothicUser.Email,
		AvatarURL: gothicUser.AvatarURL,
	}

	res, err := s.authSrv.GetCredentials(context.Background(), &user)
	if err != nil {
		s.error(w, http.StatusInternalServerError, fmt.Errorf("login: %w", err))
		return
	}

	s.respondBody(w, http.StatusOK, res)

	return
}
