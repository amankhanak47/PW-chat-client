import { Button, Typography } from "@mui/material";
import { TimeZoneSelectComponentContainer } from "./style";
import { allTimeZones } from "../../helpers/helpers";
import { useState } from "react";
type TimeZoneSelectComponentProps = {
  close: (value: boolean) => void;
  setTimeZone(value: string): void;
};
const TimeZoneSelectComponent = ({
  close,
  setTimeZone,
}: TimeZoneSelectComponentProps) => {
  const [selectedTimeZone, setSelectedTimeZone] = useState("America/New_York");

  return (
    <TimeZoneSelectComponentContainer>
      <div className="zone-selector">
        <Typography>Select the time zone: </Typography>
        <div className="time-zone-element">
          <select
            value={selectedTimeZone}
            onChange={(e) => setSelectedTimeZone(e.target.value)}
            className="select-element"
          >
            {allTimeZones.map((timeZone: string, index: number) => (
              <option key={index} value={timeZone}>
                {timeZone}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="buttons">
        <Button onClick={() => close(false)} variant="outlined" fullWidth>
          Close
        </Button>
        <Button
          onClick={() => {
            setTimeZone(selectedTimeZone);
            close(false);
          }}
          variant="contained"
          fullWidth
        >
          Save
        </Button>
      </div>
    </TimeZoneSelectComponentContainer>
  );
};

export default TimeZoneSelectComponent;
