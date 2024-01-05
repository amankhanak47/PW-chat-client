import { Link } from "react-router-dom";
import { Message, useSocket } from "../../contexts/SocketProvider";
import { convertToSelectedTimeZone } from "../../helpers/helpers";
import { StyledMessage } from "./style";
import { useState } from "react";
import { TextField } from "@mui/material";

const users = { 1: "CEO", 2: "Team Member" };

function MessageComponent({
  m,
  selectedTimeZone,
}: {
  m: Message;
  selectedTimeZone: string;
}) {
  const { socket, initialize } = useSocket();
  const { currentUserID } = useSocket();
  const direction = m.sender == currentUserID ? "right" : "left";
  const [formValue, setFormValue] = useState(m?.form_data?.initial);
  const isLapsed = m?.form_data?.isLapsed;
  const handleForm = async() => {
    socket.emit("update_form", {
      message: "goal Update",
      messageUuid: m.uuid,
      data: { initial: formValue },
      to: currentUserID == "1" ? "2" : "1",
      userID: currentUserID,
	});
	  await new Promise((resolve) => setTimeout(resolve, 500));
	  initialize()
	};
  return (
    <StyledMessage direction={direction}>
      <div className={`message-content ${direction}`} id={m.uuid}>
        <div className="message-body">
          <p>{m.content}</p>
          {m.buttons && m.buttons.length > 0 && m.buttons[0].label != null && !isLapsed && m.sender != currentUserID && (
            <div className="buttons">
              {m.buttons.map((btn: any) => {
                return (
                  <Link to={btn.link_url} className="redirect-login">
                    <button className="chat-btn">{btn.label}</button>
                  </Link>
                );
              })}
            </div>
          )}

          {m?.form_data && (
            <>
              <div className="form-body">
                <TextField
                  onChange={(e) => setFormValue(e.target.value)}
                  disabled={isLapsed || m.sender == currentUserID}
                  value={formValue}
                  fullWidth
                />
                {!isLapsed && m.sender != currentUserID && (
                  <div className="buttons">
                    <button className="chat-btn" onClick={handleForm}>
                      save
                    </button>
                  </div>
                )}
              </div>
            </>
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
