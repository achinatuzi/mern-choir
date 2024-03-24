import { useMutation, useQuery } from "@tanstack/react-query";
import apiClient from '../apiClient'
import { UserInfo } from '../types/UserInfo'
import { User } from "../types/User";
import { Image } from "../types/image";

export const useSigninMutation = () =>
  useMutation({
    mutationFn: async ({
      userName,
      email,
      password,
    }: {
      userName: string
      email: string
      password: string
    }) =>
      (
        await apiClient.post<UserInfo>(`api/users/signin`, {
          userName,
          email,
          password,
        })
      ).data,
  })

export const useSignupMutation = () =>
  useMutation({
    mutationFn: async ({
      firstName,
      surName,
      otherName,
      userName,
      slug,
      gender,
      voice,
      joined,
      image,
      graduated,
      level,
      position,
      post,
      birthMonthDay,
      email,
      phone,
      password,
    }: {
      firstName: string;
      surName: string;
      otherName: string;
      userName: string;
      slug: string;
      gender: string;
      voice: string;
      joined: string;
      image: any;
      graduated: string;
      level: string;
      position: string;
      post: string;
      birthMonthDay: string;
      email: string;
      phone: string;
      password: string;
    }) =>
      (
        await apiClient.post<UserInfo>(`api/users/signup`, {
          firstName,
          surName,
          otherName,
          userName,
          slug,
          gender,
          voice,
          joined,
          graduated,
          image,
          level,
          position,
          post,
          birthMonthDay,
          email,
          phone,
          password,
        })
      ).data,
  });

export const useUpdateProfileMutation = () =>
  useMutation({
    mutationFn: async ({
      firstName,
      surName,
      otherName,
      userName,
      gender,
      slug,
      voice,
      joined,
      image,
      graduated,
      level,
      position,
      post,
      birthMonthDay,
      email,
      phone,
      password,
    }: {
      firstName: string;
      surName: string;
      otherName: string;
      userName: string;
      slug: string;
      gender: string;
      voice: string;
      joined: string;
      graduated: string;
      level: string;
      position: string;
      image: any;
      post: string;
      birthMonthDay: string;
      email: string;
      phone: string;
      password: string;
    }) =>
      (
        await apiClient.put<UserInfo>(`api/users/profile`, {
          firstName,
          surName,
          otherName,
          userName,
          slug,
          gender,
          voice,
          joined,
          graduated,
          level,
          position,
          image,
          post,
          birthMonthDay,
          email,
          phone,
          password,
        })
      ).data,
  });

  export const useGetUsersQuery = () =>
    useQuery({
      queryKey: ["users"],
      queryFn: async () =>
        (await apiClient.get<User[]>(`api/users`)).data,
    });

    export const useGetUserDetailsByIdQuery = (_id: string) =>
      useQuery({
        queryKey: ["users", _id],
        queryFn: async () =>
          (await apiClient.get<User>(`api/users/${_id}`)).data,
      });

export const useUploadImageMutation = () =>
  useMutation({
    mutationFn: async ({
     image,
    }: {
      image: string
    }) =>
      (
        await apiClient.post<Image>(`api/image/upload`, {
        image
        })
      ).data,

  });
export const useUploadEmailMutation = () =>
  useMutation({
    mutationFn: async ({
      fullname,
      email,
      text,
    }: {
      fullname: string;
      email: string;
      text: string;
    }) =>
      (
        await apiClient.post(`api/email/upload`, {
          fullname,
          email,
          text,
        })
      ).data,
  });