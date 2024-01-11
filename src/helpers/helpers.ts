import moment from "moment-timezone";

export const convertToSelectedTimeZone = (
  utcDateString: string,
  selectedTimeZome: string,
) => {
  const convertedDate = moment
    .utc(utcDateString)
    .tz(selectedTimeZome)
    .format("DD-MMM-YYYY HH:mm");
  return convertedDate;
};

export const allTimeZones = moment.tz.names();
