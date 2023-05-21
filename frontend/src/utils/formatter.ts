import moment from "moment";

export const formatDateTime = (value?: string, format = "D MMMM") => {
  if (!value) {
    return null;
  }

  const date = new Date(value);
  return moment(date.toString()).format(format);
};
