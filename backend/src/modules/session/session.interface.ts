export enum SessionStatus {
  FINISHED = 'FINISHED',
  SUSPENDED = 'SUSPENDED',
  RUNNING = 'RUNNING',
  OFFERING = 'OFFERING',
  INACTIVE = 'INACTIVE',
}

export interface ISession {
  id: string;
  name: string;
  status: SessionStatus;
  start_date: Date;
  end_date: Date;
  created_at: Date;
  program: IProgram[];
}

export interface IProgram {
  id: string;
  display_title: string;
  thumbnail_img_url: string;
  short_title: string;
}
