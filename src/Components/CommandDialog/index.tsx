import {
	Card,
	CardContent,
	Typography,
	List,
	ListItem,
	ListItemButton,
	ListItemText,
} from "@mui/material";
import { FunctionComponent, useMemo } from "react";
import { Command } from "../../types/message";

type CommandDialogProps = {
	message: string;
	commands: Command[];
	onCommandSelected: (command: Command) => void;
};

const cardContentSx = { p: 1, pb: "0 !important", overflow: "auto" };

const CommandDialog: FunctionComponent<CommandDialogProps> = ({
	message,
	commands,
	onCommandSelected,
}) => {
	const commandsList = useMemo(() => {
		const searchKey = message.replace("/", "").toLowerCase().trim();
		if (searchKey == "") return commands;

		const filteredCommands = commands.filter((c) =>
			c.name.toLowerCase().includes(searchKey)
		);

		return filteredCommands;
	}, [commands, message]);

	return (
		<Card>
			<CardContent sx={cardContentSx}>
				<Typography variant="subtitle2">Available Actions</Typography>
				<List dense>
					{commandsList && commandsList.length > 0 ? (
						commandsList.map((command) => (
							<ListItem sx={{ p: 0 }}>
								<ListItemButton onClick={() => onCommandSelected(command)}>
									<ListItemText secondary={command.name} />
								</ListItemButton>
							</ListItem>
						))
					) : (
						<ListItem>
							<ListItemText secondary={"No matching commands"} />
						</ListItem>
					)}
				</List>
			</CardContent>
		</Card>
	);
};

export default CommandDialog;
