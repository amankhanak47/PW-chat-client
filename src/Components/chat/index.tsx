import {
	FunctionComponent,
	SetStateAction,
	useEffect,
	useMemo,
	useRef,
	useState,
} from "react";
import ChatMessage from "../ChatMessage";
import { useSocket } from "../../contexts/SocketProvider";
import InitialConfigurationDialog from "../InitialConfigurationDialog";
import TextField from "@mui/material/TextField";
import {
	Box,
	IconButton,
	List,
	ListItem,
	ListItemButton,
	ListItemText,
	ListSubheader,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import AttachmentIcon from "@mui/icons-material/Attachment";
import AddIcon from "@mui/icons-material/Add";
import { ChatPageContainer } from "./style";
import { Message } from "../../types/message";
import AttachedFiles from "../AttachedFiles";

type ChatProps = {
	initial: boolean;
};

type Command = {
	name: string;
};

type CommandDialogProps = {
	message: string;
	commands: Command[];
};

const renderMessages = (messages: Message[], selectedTimezone: string) => {
	return (
		messages &&
		messages.map((m: Message) => {
			return <ChatMessage message={m} selectedTimeZone={selectedTimezone} />;
		})
	);
};

const CommandDialog: FunctionComponent<CommandDialogProps> = ({
	message,
	commands,
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
		<Box sx={{ background: "#fff" }}>
			<List
				subheader={
					<ListSubheader id="nested-list-subheader">
						Available Actions
					</ListSubheader>
				}
				dense
			>
				{commandsList && commandsList.length > 0 ? (
					commandsList.map((command) => (
						<ListItem>
							<ListItemButton>
								<ListItemText primary={command.name} />
							</ListItemButton>
						</ListItem>
					))
				) : (
					<ListItem>No matching commands</ListItem>
				)}
			</List>
		</Box>
	);
};

const Chat = ({ initial }: ChatProps) => {
	const { sendMessage, sendAttachedMessage, receivedMessages } = useSocket();
	const [open, setOpen] = useState(initial);
	const [selectedTimeZone, setSelectedTimeZone] = useState("America/New_York");
	const [message, setMessage] = useState<string>("");
	const [showCommandDialog, setShowCommandDialog] = useState<boolean>(false);
	const [files, setFiles] = useState<any>([]);
	const [commands, setCommands] = useState([
		{ name: "Update My Goals" },
		{ name: "View History" },
		{ name: "View Goals and Comment Updates" },
	]);
	const inputRef = useRef<HTMLInputElement>(null);
	const addFileRef = useRef<HTMLInputElement>(null);
	useEffect(() => {
		if (receivedMessages) {
			const lastIndex = receivedMessages.length - 1;
			const lastMessage = receivedMessages[lastIndex];
			const parentMessage = document.getElementById(lastMessage?.uuid);
			parentMessage?.scrollIntoView({ behavior: "instant", block: "end" });
		}
	}, [receivedMessages]);

	const onSend = () => {
		if (files.length != 0) {
			sendattachmentChat();
			return;
		}
		sendMessage(message.trim());
		setMessage("");
	};

	const sendattachmentChat = async () => {
		if (files.length != 0) {

			const fileBuffersPromise = files.map((file: any) => {
				return new Promise((resolve) => {
					const reader: any = new FileReader();
					reader.onloadend = () => {
						const imageData = reader.result.split(",")[1];
						resolve({ data: imageData, name: file.name });
					};
					reader.readAsDataURL(file);
				});
			});
			
			const fileBuffers: any = await Promise.all(fileBuffersPromise);
			sendAttachedMessage(message.trim(), fileBuffers);
		}
		setFiles([]);
	};

	const setTimeZone = (value: SetStateAction<string>) => {
		setSelectedTimeZone(value);
	};

	const onMessageChange = (event: any) => {
		if (event.target.value && event.target.value.startsWith("/"))
			setShowCommandDialog(true);
		else setShowCommandDialog(false);
		setMessage(event.target.value);
	};

	const handleFileChange = async (e: any) => {
		let allow = true;
		if (e.target.files.length > 10) {
			alert("can send more than 10 files");
			return;
		}
		for (const file of Array.from(e.target.files)) {
			if (file.size > 1100000) {
				alert("file size should not be more than 1 mb");
				allow = false;
				break;
			}
		}
		if (allow) {
			setFiles(Array.from(e.target.files));
		} else {
			setFiles([]);
		}
		inputRef.current!.value = null;
	};

	const handleAddFileChange = async (e: any) => {
		let allow = true;
		if (e.target.files.length + files.length > 10) {
			alert("cant send more than 10 files");
			return;
		}
		for (const file of Array.from(e.target.files)) {
			if (file.size > 1100000) {
				alert("file size should not be more than 1 mb");
				allow = false;
				break;
			}
			if (files.some((existingFile: any) => existingFile.name === file.name)) {
				alert("File with the same name already exists");
				allow = false;
				break;
			}
		}
		const uniqueNewFiles = Array.from(e.target.files).filter(
			(newFile) =>
				!files.some((existingFile: any) => existingFile.name === newFile.name)
		);

		if (allow) {
			setFiles((prevFiles: any) => [...prevFiles, ...uniqueNewFiles]);
		}
		addFileRef.current!.value = null;
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
			{showCommandDialog && (
				<CommandDialog commands={commands} message={message} />
			)}
			{files.length != 0 && <AttachedFiles files={files} setFiles={setFiles} />}
			<Box display={"flex"}>
				{files.length != 0 ? (
					<IconButton
						onClick={() => {
							addFileRef?.current?.click();
						}}
					>
						<AddIcon />
					</IconButton>
				) : (
					<IconButton
						onClick={() => {
							inputRef?.current?.click();
						}}
					>
						<AttachmentIcon />
					</IconButton>
				)}
				<TextField
					onChange={onMessageChange}
					onKeyDown={(e) => {
						if (e.key === "Enter") onSend();
					}}
					value={message}
					size="small"
					placeholder="Type / to view available actions"
					fullWidth
				/>
				<IconButton onClick={onSend}>
					<SendIcon />
				</IconButton>
			</Box>
			<InitialConfigurationDialog
				open={open}
				close={setOpen}
				setTimeZone={setTimeZone}
			/>
			<input
				ref={inputRef}
				type="file"
				multiple
				onChange={handleFileChange}
				style={{ display: "none" }}
			/>
			<input
				ref={addFileRef}
				type="file"
				multiple
				onChange={handleAddFileChange}
				style={{ display: "none" }}
			/>
		</ChatPageContainer>
	);
};
export default Chat;
