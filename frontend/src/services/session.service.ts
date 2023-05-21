import {
  ISessionQueryInput,
  ISessionResponse,
} from "../modules/Session/interface";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { Environment } from "../shared/environment";

export const getSessions = (
  req: ISessionQueryInput = {},
  config?: AxiosRequestConfig
): Promise<AxiosResponse<ISessionResponse[]>> =>
  axios.get<ISessionResponse[]>(`${Environment.API_URL}/sessions`, {
    ...config,
    params: {
      short_title: req && req.short_title,
      status: req && req.status,
    },
  });
