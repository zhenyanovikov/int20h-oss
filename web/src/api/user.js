import { useQuery } from "@tanstack/react-query";
import {
  USER_KEY,
  USER_AUCTIONS_KEY,
  USER_URL,
  USER_AUCTIONS_URL,
} from "../constants/user";
import apiClient from "./apiClient";

async function getUser() {
  const res = await apiClient.get(USER_URL);
  return res.data;
}

async function getUserAuctions() {
  const res = await apiClient.get(USER_AUCTIONS_URL);
  return res.data;
}

export function useGetUser() {
  return useQuery({
    queryKey: [USER_KEY],
    queryFn: getUser,
  });
}

export function useGetUserAuctions() {
  return useQuery({
    queryKey: [USER_AUCTIONS_KEY],
    queryFn: getUserAuctions,
  });
}
