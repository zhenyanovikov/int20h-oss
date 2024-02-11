package httpserver

import (
	"encoding/json"
	"net/http"

	"github.com/google/uuid"
	"github.com/gorilla/mux"
	"oss-backend/internal/models"
)

func (s *HTTPServer) getAuctionBids(w http.ResponseWriter, r *http.Request) {
	auctionID, err := uuid.Parse(mux.Vars(r)["id"])
	if err != nil {
		s.respondError(w, http.StatusBadRequest, err)
		return
	}

	bids, err := s.auctionSrv.GetBidHistory(r.Context(), auctionID)
	if err != nil {
		s.respondError(w, http.StatusInternalServerError, err)
		return
	}

	s.respond(w, http.StatusOK, bids)
}

func (s *HTTPServer) placeAuctionBid(w http.ResponseWriter, r *http.Request) {
	auctionID, err := uuid.Parse(mux.Vars(r)["id"])
	if err != nil {
		s.respondError(w, http.StatusBadRequest, err)
		return
	}

	var bid models.Bid
	if err = json.NewDecoder(r.Body).Decode(&bid); err != nil {
		s.respondError(w, http.StatusBadRequest, err)
		return
	}

	bid.AuctionID = auctionID

	if err = s.auctionSrv.CreateBid(r.Context(), &bid); err != nil {
		s.respondError(w, http.StatusInternalServerError, err)
		return
	}

	s.respond(w, http.StatusCreated, bid)
}
