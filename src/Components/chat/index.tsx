import { SetStateAction, useEffect, useState } from "react";
import { ChatPageContainer } from "./style";
import MessageComponent from "../Message";
import { Message, useSocket } from "../../contexts/SocketProvider";
import { Dialog } from "@mui/material";
import TimeZoneSelectComponent from "../TimeZoneSelectComponent";
import TextField from "@mui/material/TextField";
import { IconButton } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

function Chat({ initial }: { initial: boolean }) {
	const { sendMessage, receivedMessages } = useSocket();
	const [open, setOpen] = useState(initial);
	const [selectedTimeZone, setSelectedTimeZone] = useState("America/New_York");
	const [message, setMessage] = useState<string>("");

	useEffect(() => {
		if (receivedMessages) {
			const last_index = receivedMessages.length - 1;
			const lastMessage = receivedMessages[last_index];
			const parentMessage = document.getElementById(lastMessage?.uuid);
			parentMessage?.scrollIntoView({ behavior: "instant", block: "end" });
		}
	}, [receivedMessages]);
	const onSend = () => {
		sendMessage(message.trim());
		setMessage("");
	};

	const setTimeZone = (value: SetStateAction<string>) => {
		setSelectedTimeZone(value);
	};

	return (
		<ChatPageContainer>
			<div className="chat-messages-container">
				{receivedMessages &&
					receivedMessages.map((m: Message) => {
						return (
							<MessageComponent m={m} selectedTimeZone={selectedTimeZone} />
						);
					})}
			</div>
			<div className="input-container">
				<TextField
					onChange={(e) => {
						setMessage(e.target.value);
					}}
					onKeyDown={(e) => { if (e.key === 'Enter') onSend() }}
					value={message}
					fullWidth
				/>
				<IconButton onClick={onSend}>
					<SendIcon />
				</IconButton>
			</div>
			{open && (
				<Dialog open={open}>
					<TimeZoneSelectComponent close={setOpen} setTimeZone={setTimeZone} />
				</Dialog>
			)}
		</ChatPageContainer>
	);
}

export default Chat;
