package httpserver

import (
	"net/http"

	"github.com/gorilla/mux"
	"oss-backend/internal/config"
)

func (s *HTTPServer) newRouter(_ config.Config) *mux.Router {
	router := mux.NewRouter()

	router.HandleFunc("/status", s.statusHandler).Methods(http.MethodGet)

	return router
}

func (s *HTTPServer) Start() error {
	return http.ListenAndServe(":8080", s.router)
}
