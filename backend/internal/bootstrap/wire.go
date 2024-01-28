//go:build wireinject
// +build wireinject

package bootstrap

import (
	"github.com/google/wire"
	"oss-backend/internal/config"
	"oss-backend/internal/service/httpserver"
)

func Up() (*Dependencies, error) {
	wire.Build(
		//wire.Bind(new(services.Project), new(*project.Service)),

		//wire.Bind(new(persistence.VectorStore), new(*postgres.Postgres)),
		//wire.Bind(new(persistence.Cache), new(*redis.Redis)),

		config.New,
		httpserver.New,
		//getPostgresConfig,

		//postgres.New,
		//redis.New,
		NewDependencies,
	)
	return &Dependencies{}, nil
}

func getPostgresConfig(cfg config.Config) config.Postgres {
	return cfg.Postgres
}
