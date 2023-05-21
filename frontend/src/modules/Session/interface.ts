export enum SessionStatus {
  ALL = "ALL",
  FINISHED = "FINISHED",
  SUSPENDED = "SUSPENDED",
  RUNNING = "RUNNING",
  OFFERING = "OFFERING",
  INACTIVE = "INACTIVE",
}

export interface ISessionQueryInput {
  short_title?: string;
  status?: SessionStatus;
}

export interface IProgram {
  id: string;
  display_title: string;
  thumbnail_img_url: string;
  short_title: string;
}

export interface ISessionResponse {
  id: string;
  name: string;
  status: SessionStatus;
  start_date: string;
  end_date: string;
  created_at: string;
  program: IProgram[];
}
