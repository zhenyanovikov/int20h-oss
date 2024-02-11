import { useQueryClient, useQuery, useMutation } from "@tanstack/react-query";
import { enqueueSnackbar } from "notistack";
import { useTranslation } from "react-i18next";
import { generatePath } from "react-router-dom";
import {
  AUCTIONS_KEY,
  AUCTION_HISTORY_KEY,
  AUCTIONS_URL,
  AUCTION_URL,
  AUCTION_HISTORY_URL,
  AUCTION_BID_URL,
} from "../constants/auction";
import { USER_AUCTIONS_KEY } from "../constants/user";
import apiClient from "./apiClient";

async function getAuctions() {
  const res = await apiClient.get(AUCTIONS_URL);
  return res.data;
}

async function getAuction(id) {
  const res = await apiClient.get(generatePath(AUCTION_URL, { id }));
  return res.data;
}

async function createAuction(auction) {
  const res = await apiClient.post(AUCTIONS_URL, auction);
  return res.data;
}

async function updateAuction(id, auction) {
  const res = await apiClient.put(generatePath(AUCTION_URL, { id }), auction);
  return res.data;
}

async function deleteAuction(id) {
  await apiClient.delete(generatePath(AUCTION_URL, { id }));
}

async function getAuctionHistory(id) {
  const res = await apiClient.get(generatePath(AUCTION_HISTORY_URL, { id }));
  return res.data;
}

async function createBid(id, bid) {
  const res = await apiClient.post(
    generatePath(AUCTION_BID_URL, { id }),
    bid
  );
  return res.data;
}

export function useGetAuctions() {
  return useQuery({
    queryKey: [AUCTIONS_KEY],
    queryFn: getAuctions,
  });
}

export function useGetAuction(id) {
  return useQuery({
    queryKey: [AUCTIONS_KEY, id],
    queryFn: () => getAuction(id),
  });
}

export function useCreateAuction() {
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createAuction,
    onSuccess: () => {
      enqueueSnackbar(t("snackbars.createAuction.success"), {
        variant: "success",
      });
      queryClient.invalidateQueries({ queryKey: [AUCTIONS_KEY] });
    },
    onError: () => {
      enqueueSnackbar(t("snackbars.createAuction.error"), { variant: "error" });
    },
  });
}

export function useUpdateAuction(id) {
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (auction) => updateAuction(id, auction),
    onSuccess: () => {
      enqueueSnackbar(t("snackbars.updateAuction.success"), {
        variant: "success",
      });
      queryClient.invalidateQueries({ queryKey: [AUCTIONS_KEY] });
      queryClient.invalidateQueries({ queryKey: [USER_AUCTIONS_KEY] });
      queryClient.invalidateQueries({ queryKey: [AUCTIONS_KEY, id] });
    },
    onError: () => {
      enqueueSnackbar(t("snackbars.updateAuction.error"), {
        variant: "error",
      });
    },
  });
}

export function useDeleteAuction() {
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteAuction,
    onSuccess: () => {
      enqueueSnackbar(t("snackbars.deleteAuction.success"), {
        variant: "success",
      });
      queryClient.invalidateQueries({ queryKey: [AUCTIONS_KEY] });
    },
    onError: () => {
      enqueueSnackbar(t("snackbars.deleteAuction.error"), { variant: "error" });
    },
  });
}

export function useGetAuctionHistory(id) {
  return useQuery({
    queryKey: [AUCTIONS_KEY, id, AUCTION_HISTORY_KEY],
    queryFn: () => getAuctionHistory(id),
    refetchInterval: 30000,
  });
}

export function useCreateBid(id) {
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (bid) => createBid(id, bid),
    onSuccess: () => {
      enqueueSnackbar(t("snackbars.createBid.success"), { variant: "success" });
      queryClient.invalidateQueries({
        queryKey: [AUCTIONS_KEY, id, AUCTION_HISTORY_KEY],
      });
    },
    onError: () => {
      enqueueSnackbar(t("snackbars.createBid.error"), { variant: "error" });
    },
  });
}
