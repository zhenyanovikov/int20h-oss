package httpserver

import (
	"net/http"

	"github.com/gorilla/mux"
	"github.com/markbates/goth"
	"github.com/markbates/goth/gothic"
	"github.com/markbates/goth/providers/google"
	"oss-backend/internal/config"
)

func (s *HTTPServer) newRouter(_ config.Config) *mux.Router {
	router := mux.NewRouter()

	goth.UseProviders(
		google.New(s.googleOAuthCfg.ClientID, s.googleOAuthCfg.ClientSecret, s.googleOAuthCfg.RedirectURL, s.googleOAuthCfg.Scopes...),
	)

	api := router.PathPrefix("/api/v1").Subrouter()

	protected := api.PathPrefix("/").Subrouter()
	protected.Use(s.authMiddleware)

	api.HandleFunc("/auth/{provider}/login", gothic.BeginAuthHandler).Methods(http.MethodGet)
	api.HandleFunc("/auth/{provider}/callback", s.oauthCallback).Methods(http.MethodGet)

	api.HandleFunc("/status", s.statusHandler).Methods(http.MethodGet)
	protected.HandleFunc("/status-auth", s.statusHandler).Methods(http.MethodGet)

	return router
}

func (s *HTTPServer) Start() error {
	return http.ListenAndServe(":8080", s.router)
}
