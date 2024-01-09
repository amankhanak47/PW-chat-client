import { Link } from "react-router-dom";
import { useSocket } from "../../contexts/SocketProvider";
import { convertToSelectedTimeZone } from "../../helpers/helpers";
import { StyledMessage } from "./style";
import { Fragment, FunctionComponent, useEffect, useState } from "react";
import { Button, TextField } from "@mui/material";
import { Message } from "../../types/message";

const users = { 1: "CEO", 2: "Team Member" };

type ChatMessageProps = {
	message: Message;
	selectedTimeZone: string;
};

const ChatMessage: FunctionComponent<ChatMessageProps> = ({
	message,
	selectedTimeZone,
}) => {
	const {
		content,
		sender,
		buttons,
		card_data,
		form_data,
		receiver,
		sent_at,
		uuid,
		type,
		attachments,
	} = message;
	console.log(attachments, "eropm72");
	const { initialize, currentUserID } = useSocket();
	const direction = sender == currentUserID ? "right" : "left";
	const [formValue, setFormValue] = useState(message?.form_data?.initial);
	const [url, setUrl] = useState();
	const isLapsed = message?.form_data?.isLapsed;
	// const handleForm = async () => {
	// 	socket.emit("update_form", {
	// 		message: "goal Update",
	// 		messageUuid: uuid,
	// 		data: { initial: formValue },
	// 		to: currentUserID == "1" ? "2" : "1",
	// 		userID: currentUserID,
	// 	});
	// 	await new Promise((resolve) => setTimeout(resolve, 500));
	// 	initialize();
	// };
	return (
		<StyledMessage direction={direction}>
			<div className={`message-content ${direction}`} id={uuid}>
				<div className="message-body">
					{type === "attachments" && (
						<>
							<img src={url} alt="" />
							<a href={url} download>
								Download File
							</a>
						</>
					)}
					<p>{content}</p>
					{buttons &&
						buttons.length > 0 &&
						buttons[0].label != null &&
						!isLapsed &&
						sender != currentUserID && (
							<div className="buttons">
								{buttons.map((btn: any) => {
									return (
										<Link to={btn.link_url} className="redirect-login">
											<button className="chat-btn">{btn.label}</button>
										</Link>
									);
								})}
							</div>
						)}

					{message?.form_data && (
						<Fragment>
							<div className="form-body">
								<TextField
									onChange={(e) => setFormValue(e.target.value)}
									disabled={isLapsed || sender == currentUserID}
									value={formValue}
									fullWidth
								/>
								{!isLapsed && sender != currentUserID && (
									<div className="buttons">
										<Button
											className="chat-btn"
											//onClick={handleForm}
										>
											save
										</Button>
									</div>
								)}
							</div>
						</Fragment>
					)}
				</div>
				<div className="message-footer">
					<p>{users[sender]}</p>
					<p>
						{convertToSelectedTimeZone(sent_at, selectedTimeZone)}
						<span className="double-tick">
							<img
								src="https://r.lykkeworks.com/assets/doubletick-66431f34.svg"
								alt=""
							/>
						</span>
					</p>
				</div>
			</div>
		</StyledMessage>
	);
};

export default ChatMessage;
