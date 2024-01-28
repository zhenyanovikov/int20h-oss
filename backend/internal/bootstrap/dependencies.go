package bootstrap

import (
	"oss-backend/internal/config"
	"oss-backend/internal/service/httpserver"
)

type Dependencies struct {
	Config config.Config

	HTTPServer *httpserver.HTTPServer

	//ProjectDB        persistence.Projects
	//Cache            persistence.Cache
}

func NewDependencies(config config.Config, httServer *httpserver.HTTPServer) *Dependencies {
	return &Dependencies{
		Config:     config,
		HTTPServer: httServer,
	}
}
