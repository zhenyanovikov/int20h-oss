package httpserver

import (
	"github.com/gorilla/mux"
	"oss-backend/internal/config"
)

type HTTPServer struct {
	cfg    config.Config
	router *mux.Router
}

func New(cfg config.Config) *HTTPServer {
	server := &HTTPServer{
		cfg: cfg,
	}

	server.router = server.newRouter(cfg)

	return server
}
