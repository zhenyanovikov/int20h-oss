package httpserver

import "net/http"

func (s *HTTPServer) statusHandler(w http.ResponseWriter, r *http.Request) {
	s.respondBody(w, http.StatusOK, map[string]string{"status": "ok"})
}
