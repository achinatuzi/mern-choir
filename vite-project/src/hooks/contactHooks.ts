import { useQuery } from "@tanstack/react-query";
import apiClient from "../apiClient";
import { Contact } from "../types/Contact";


export const useGetContactHistoryQuery = () =>
  useQuery({
    queryKey: ["contacts"],
    queryFn: async () =>
      (await apiClient.get<Contact[]>(`api/email`)).data,
  });
