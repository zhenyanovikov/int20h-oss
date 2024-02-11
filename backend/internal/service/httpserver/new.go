package httpserver

import (
	"github.com/gorilla/mux"
	"golang.org/x/oauth2"
	"golang.org/x/oauth2/google"
	"oss-backend/internal/config"
	"oss-backend/internal/service"
)

type HTTPServer struct {
	cfg            config.Config
	router         *mux.Router
	googleOAuthCfg *oauth2.Config

	authSrv    service.Auth
	userSrv    service.User
	auctionSrv service.Auction
	mediaSrv   service.Media
}

func New(cfg config.Config, authSrv service.Auth,
	userSrv service.User, auctionSrv service.Auction,
	mediaSrv service.Media) *HTTPServer {
	server := &HTTPServer{
		cfg:        cfg,
		authSrv:    authSrv,
		userSrv:    userSrv,
		auctionSrv: auctionSrv,
		mediaSrv:   mediaSrv,
		googleOAuthCfg: &oauth2.Config{
			RedirectURL:  cfg.Oauth.Google.RedirectURL,
			ClientID:     cfg.Oauth.Google.ClientID,
			ClientSecret: cfg.Oauth.Google.ClientSecret,
			Scopes:       cfg.Oauth.Google.Scopes,
			Endpoint:     google.Endpoint,
		},
	}

	server.router = server.newRouter(cfg)

	return server
}
