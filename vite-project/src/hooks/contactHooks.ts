import { useQuery } from "@tanstack/react-query";
import apiClient from "../apiClient";
import { Contact } from "../types/Contact";
import axios from "axios";

export const useGetContactHistoryQuery = () =>
  useQuery({
    queryKey: ["contacts"],
    queryFn: async () =>
      (await axios.get<Contact[]>(`http://localhost:4000/api/email`)).data,
  });
