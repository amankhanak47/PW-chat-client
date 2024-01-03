import { Button, Typography } from "@mui/material";
import { TimeZoneSelectComponentContainer } from "./style";
import { allTimeZones } from "../../helpers/helpers";
import { useState } from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { useSocket } from "../../contexts/SocketProvider";

type InitialConfigurationDialogProps = {
	close: (value: boolean) => void;
	setTimeZone(value: string): void;
};

const InitialConfigurationDialog = ({
	close,
	setTimeZone,
}: InitialConfigurationDialogProps) => {
	const [selectedTimeZone, setSelectedTimeZone] = useState("America/New_York");
	const { setCurrentUserID, initialize } = useSocket();

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setCurrentUserID((event.target as HTMLInputElement).value);
	};
	return (
		<TimeZoneSelectComponentContainer>
			<FormControl sx={{ mb: 1 }}>
				<FormLabel>Current User</FormLabel>
				<RadioGroup
					defaultValue="1"
					name="radio-buttons-group"
					onChange={handleChange}
				>
					<FormControlLabel value="1" control={<Radio />} label="CEO" />
					<FormControlLabel value="2" control={<Radio />} label="Team Member" />
				</RadioGroup>
			</FormControl>
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
						initialize(selectedTimeZone);
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

export default InitialConfigurationDialog;
