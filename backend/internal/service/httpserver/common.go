package httpserver

import (
	"encoding/json"
	"net/http"
)

func (s *HTTPServer) respondBody(w http.ResponseWriter, status int, payload any) error {
	w.WriteHeader(status)
	return json.NewEncoder(w).Encode(payload)
}

func (s *HTTPServer) error(w http.ResponseWriter, status int, err error) {
	s.respondBody(w, status, map[string]string{"error": err.Error()})
}
