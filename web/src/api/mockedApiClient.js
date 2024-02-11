import axios from "axios";
import { MOCKED_BASE_URL } from "../constants/api";

const mockedApiClient = axios.create({
  baseURL: MOCKED_BASE_URL,
});

export default mockedApiClient;
