import { Fragment, SetStateAction, useEffect, useState } from "react";
import ChatMessage from "../ChatMessage";
import { useSocket } from "../../contexts/SocketProvider";
import InitialConfigurationDialog from "../InitialConfigurationDialog";
import TextField from "@mui/material/TextField";
import { Box, Chip, IconButton } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { ChatPageContainer } from "./style";
import { AvailableCommands, Command, Message } from "../../types/message";
import CommandDialog from "../CommandDialog";
import UpdateGoalsFlow from "../UpdateGoalsFlow";

type ChatProps = {
  initial: boolean;
};

const renderMessages = (messages: Message[], selectedTimezone: string) => {
  return (
    messages &&
    messages.map((m: Message) => {
      return <ChatMessage message={m} selectedTimeZone={selectedTimezone} />;
    })
  );
};

const CommandComponent = ({ activeCommand }: { activeCommand: Command }) => {
  switch (activeCommand.name) {
    case AvailableCommands.UPDATE_GOALS: {
      return <UpdateGoalsFlow />;
    }
  }
  return <Fragment></Fragment>;
};

const Chat = ({ initial }: ChatProps) => {
  const { sendMessage, receivedMessages } = useSocket();
  const [open, setOpen] = useState(initial);
  const [selectedTimeZone, setSelectedTimeZone] = useState("America/New_York");
  const [message, setMessage] = useState<string>("");
  const [showCommandDialog, setShowCommandDialog] = useState<boolean>(false);
  const [commands, setCommands] = useState([
    { name: "Update My Goals", code: "UPDATE_MY_GOALS" },
    { name: "View History", code: "VIEW_HISTORY" },
    { name: "View Goals and Comment Updates", code: "COMMENT_ON_GOALS" },
  ]);
  const [activeCommand, setActiveCommand] = useState<Command | undefined>();

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

  const onMessageChange = (event: any) => {
    if (event.target.value && event.target.value.startsWith("/"))
      setShowCommandDialog(true);
    else setShowCommandDialog(false);
    if (activeCommand) return;
    setMessage(event.target.value);
  };

  const handleCommandSelected = (command) => {
    setShowCommandDialog(false);
    setActiveCommand(command);
    setMessage("");
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
        <CommandDialog
          commands={commands}
          message={message}
          onCommandSelected={handleCommandSelected}
        />
      )}
      {activeCommand && <CommandComponent activeCommand={activeCommand} />}
      <Box display={"flex"}>
        <TextField
          onChange={onMessageChange}
          onKeyDown={(e) => {
            if (e.key === "Enter") onSend();
          }}
          value={message}
          size="small"
          placeholder="Type / to view available actions"
          InputProps={{
            startAdornment: activeCommand && (
              <Chip
                label={activeCommand?.name}
                color="success"
                sx={{
                  p: 1,
                  borderRadius: "5px",
                }}
                onDelete={() => setActiveCommand(undefined)}
              />
            ),
          }}
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
    </ChatPageContainer>
  );
};

export default Chat;
