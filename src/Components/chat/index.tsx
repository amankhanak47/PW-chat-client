import { SetStateAction, useEffect, useState } from "react";
import { ChatPageContainer } from "./style";
import MessageComponent from "../Message";
import { Message, useSocket } from "../../contexts/SocketProvider";
import { Button, Dialog } from "@mui/material";
import TimeZoneSelectComponent from "../TimeZoneSelectComponent";
import TextField from "@mui/material/TextField";
import { IconButton } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

function Chat({ initial }: { initial: boolean }) {
  const { socket, sendMessage, receivedMessages, currentUserID } = useSocket();
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
  const generateForm = () => {
    socket.emit("generate_form", {
      message: "goal Update",
      data: { initial: "10", taget: "0" },
      to: currentUserID == "1" ? "2" : "1",
      userID: currentUserID,
    });
  };
  const generateButtons = () => {
    socket.emit("generate_buttons", {
      message: "goal Update",
      data: { initial: "10", taget: "0" },
      to: currentUserID == "1" ? "2" : "1",
      userID: currentUserID,
    });
  };
  return (
    <ChatPageContainer>
      <div className="chat-header">
        <Button onClick={generateForm}>Generate Form</Button>
        <Button onClick={generateButtons}>Generate Buttons</Button>
      </div>
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
          onKeyDown={(e) => {
            if (e.key === "Enter") onSend();
          }}
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
