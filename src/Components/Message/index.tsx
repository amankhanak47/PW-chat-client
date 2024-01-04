import { Link } from "react-router-dom";
import { Message, useSocket } from "../../contexts/SocketProvider";
import { convertToSelectedTimeZone } from "../../helpers/helpers";
import { StyledMessage } from "./style";

const users = { 1: "CEO", 2: "Team Member" };

function MessageComponent({
	m,
	selectedTimeZone,
}: {
	m: Message;
	selectedTimeZone: string;
}) {
	// console.log(this, "ldsk")
	const { currentUserID } = useSocket();
	const direction = m.sender == currentUserID ? "right" : "left";
	console.log(m.buttons);

	return (
		<StyledMessage direction={direction}>
			<div className={`message-content ${direction}`}>
				<div className="message-body">
					<p>{m.content}</p>
					{m.buttons && m.buttons.length > 0 && m.buttons[0].label != null && (
						<div className="buttons">
							{m.buttons.map((btn: any) => {
								return (
									<Link to={btn.url} className="redirect-login">
										<button className="chat-btn">{btn.label}</button>
									</Link>
								);
							})}
						</div>
					)}
				</div>
				<div className="message-footer">
					<p>{users[m.sender]}</p>
					<p>
						{convertToSelectedTimeZone(m.sent_at, selectedTimeZone)}
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
}

export default MessageComponent;
