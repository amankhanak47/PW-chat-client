import { SetStateAction, useEffect, useState } from "react";
import MessageComponent from "../ChatMessage";
import { useSocket } from "../../contexts/SocketProvider";
import InitialConfigurationDialog from "../InitialConfigurationDialog";
import TextField from "@mui/material/TextField";
import { IconButton } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { ChatPageContainer } from "./style";
import { Message } from "../../types/message";

type ChatProps = {
	initial: boolean;
};

const renderMessages = (messages: Message[], selectedTimezone: string) => {
	return (
		messages &&
		messages.map((m: Message) => {
			return (
				<MessageComponent message={m} selectedTimeZone={selectedTimezone} />
			);
		})
	);
};

const Chat = ({ initial }: ChatProps) => {
	const { sendMessage, receivedMessages } = useSocket();
	const [open, setOpen] = useState(initial);
	const [selectedTimeZone, setSelectedTimeZone] = useState("America/New_York");
	const [message, setMessage] = useState<string>("");

	useEffect(() => {
		if (receivedMessages) {
			const lastIndex = receivedMessages.length - 1;
			const lastMessage = receivedMessages[lastIndex];
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

	// const generateForm = () => {
	// 	socket.emit("generate_form", {
	// 		message: "goal Update",
	// 		data: { initial: "10", taget: "0" },
	// 		to: currentUserID == "1" ? "2" : "1",
	// 		userID: currentUserID,
	// 	});
	// };

	// const generateButtons = () => {
	// 	socket.emit("generate_buttons", {
	// 		message: "goal Update",
	// 		data: { initial: "10", taget: "0" },
	// 		to: currentUserID == "1" ? "2" : "1",
	// 		userID: currentUserID,
	// 	});
	// };

	return (
		<ChatPageContainer>
			<div className="chat-header">
				{/* <Button onClick={generateForm}>Generate Form</Button>
				<Button onClick={generateButtons}>Generate Buttons</Button> */}
			</div>
			<div className="chat-messages-container">
				{renderMessages(receivedMessages, selectedTimeZone)}
			</div>
			<div className="input-container">
				<TextField
					onChange={(e) => {
						setMessage(e.target.value);
					}}
					onKeyDown={(e) => {
						if (e.key === "Enter") onSend();
					}}
					value={message}
					size="small"
					fullWidth
				/>
				<IconButton onClick={onSend}>
					<SendIcon />
				</IconButton>
			</div>
			<InitialConfigurationDialog
				open={open}
				close={setOpen}
				setTimeZone={setTimeZone}
			/>
		</ChatPageContainer>
	);
};

export default Chat;
