package httpserver

import (
	"encoding/json"
	"net/http"

	"github.com/google/uuid"
	"github.com/gorilla/mux"
	"oss-backend/internal/models"
)

func (s *HTTPServer) getMineAuctions(w http.ResponseWriter, r *http.Request) {
	userID := r.Context().Value("user_id").(uuid.UUID)

	auctions, err := s.auctionSrv.GetByUserID(r.Context(), userID)
	if err != nil {
		s.respondError(w, http.StatusInternalServerError, err)
		return
	}

	s.respond(w, http.StatusOK, auctions)
}

func (s *HTTPServer) getAllAuction(w http.ResponseWriter, r *http.Request) {
	auctions, err := s.auctionSrv.GetAll(r.Context())
	if err != nil {
		s.respondError(w, http.StatusInternalServerError, err)
		return
	}

	s.respond(w, http.StatusOK, auctions)
}

func (s *HTTPServer) getAuction(w http.ResponseWriter, r *http.Request) {
	auctionID, err := uuid.Parse(mux.Vars(r)["id"])
	if err != nil {
		s.respondError(w, http.StatusBadRequest, err)
		return
	}

	auction, err := s.auctionSrv.GetByID(r.Context(), auctionID)
	if err != nil {
		s.respondError(w, http.StatusInternalServerError, err)
		return
	}

	s.respond(w, http.StatusOK, auction)
}

func (s *HTTPServer) createAuction(w http.ResponseWriter, r *http.Request) {
	var auction models.Auction
	if err := json.NewDecoder(r.Body).Decode(&auction); err != nil {
		s.respondError(w, http.StatusBadRequest, err)
		return
	}

	if err := s.auctionSrv.CreateAuction(r.Context(), &auction); err != nil {
		s.respondError(w, http.StatusInternalServerError, err)
		return
	}

	s.respond(w, http.StatusCreated, auction)
}

func (s *HTTPServer) updateAuction(w http.ResponseWriter, r *http.Request) {
	auctionID, err := uuid.Parse(mux.Vars(r)["id"])
	if err != nil {
		s.respondError(w, http.StatusBadRequest, err)
		return
	}

	var auction models.Auction
	if err = json.NewDecoder(r.Body).Decode(&auction); err != nil {
		s.respondError(w, http.StatusBadRequest, err)
		return
	}

	auction.ID = auctionID

	if err = s.auctionSrv.UpdateAuction(r.Context(), &auction); err != nil {
		s.respondError(w, http.StatusInternalServerError, err)
		return
	}

	s.respond(w, http.StatusOK, auction)
}

func (s *HTTPServer) deleteAuction(w http.ResponseWriter, r *http.Request) {
	auctionID, err := uuid.Parse(mux.Vars(r)["id"])
	if err != nil {
		s.respondError(w, http.StatusBadRequest, err)
		return
	}

	if err = s.auctionSrv.DeleteAuction(r.Context(), auctionID); err != nil {
		s.respondError(w, http.StatusInternalServerError, err)
		return
	}

	s.respond(w, http.StatusNoContent, nil)
}
