import { useMutation, useQuery } from "@tanstack/react-query";
import { EventsInfo } from "../types/EventsInfo";
import apiEvent from "../eventApi";
import { Event } from "../types/Events";

export const useUploadEventMutation = () =>
  useMutation({
    mutationFn: async ({
      theme,
      description,
      date,
      venue,
      time,
    }: {
      theme: string;
      description: string;
      date: string;
      venue: string;
      time: string;
    }) =>
      (
        await apiEvent.post<EventsInfo>(`api/events/upload`, {
          theme,
          description,
          date,
          time,
          venue,
        })
      ).data,
  });

export const useUpdateEventMutation = (_id: string) =>
  useMutation({
    mutationFn: async ({
    
      theme,
      description,
      date,
      time,
      venue,
    }: {
    
      theme: string;
      description: string;
      date: string;
      time: any;
      venue: string;
    }) =>
      (
        await apiEvent.put<EventsInfo>(`api/events/${_id}/update`, {
          theme,
          description,
          date,
          time,
          venue,
        })
      ).data,
  });

     export const useGetEventDetailsByIdQuery = (_id: string) =>
       useQuery({
         queryKey: ["events", _id],
         queryFn: async () =>
           (await apiEvent.get<Event>(`api/events/${_id}`)).data,
       });

  export const useGetEventsQuery = () =>
    useQuery({
      queryKey: ["events"],
      queryFn: async () => (await apiEvent.get<Event[]>(`api/events`)).data,
    });