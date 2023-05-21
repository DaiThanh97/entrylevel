import { useQuery } from "react-query";
import { ISessionQueryInput } from "./interface";
import { SESSION_LISTING } from "./constant";
import { getSessions } from "../../services/session.service";
import { AxiosRequestConfig } from "axios";

export const useSessionListing = (
  filter: ISessionQueryInput,
  config?: AxiosRequestConfig
) =>
  useQuery([SESSION_LISTING, filter], () => getSessions(filter, config), {
    keepPreviousData: true,
  });
