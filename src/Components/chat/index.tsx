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
import { ChatPageContainer } from "./style";
import { Message } from "../../types/message";
// import {
//   MDXEditor,
//   headingsPlugin,
//   markdownShortcutPlugin,
//   frontmatterPlugin,
//   thematicBreakPlugin,
//   tablePlugin,
//   imagePlugin,
//   linkDialogPlugin,
//   linkPlugin,
//   quotePlugin,
//   listsPlugin,
//   MDXEditorMethods,
//   BoldItalicUnderlineToggles,
//   UndoRedo,
//   toolbarPlugin,
//   KitchenSinkToolbar,
// } from "@mdxeditor/editor";
// import { MoreHoriz } from "@mui/icons-material";

//...

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
      return (
        <ChatMessage
          key={m.uuid}
          message={m}
          selectedTimeZone={selectedTimezone}
        />
      );
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
  const { sendMessage, receivedMessages } = useSocket();
  const [open, setOpen] = useState(initial);
  const [selectedTimeZone, setSelectedTimeZone] = useState("America/New_York");
  const [message, setMessage] = useState<string>("");
  const [showCommandDialog, setShowCommandDialog] = useState<boolean>(false);
  const editorRef = useRef<MDXEditorMethods>(null);
  const inputRef = useRef<HTMLInputElement>();
  const [commands] = useState([
    { name: "Update My Goals" },
    { name: "View History" },
    { name: "View Goals and Comment Updates" },
  ]);

  const [openToolbar, setToolBar] = useState(false);

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
    editorRef.current?.setMarkdown("");
  };

  const setTimeZone = (value: SetStateAction<string>) => {
    setSelectedTimeZone(value);
  };

  const onMessageChange = (event: any, usedFor?: string) => {
    if (usedFor) {
      if (event && event.startsWith("/")) setShowCommandDialog(true);
      else setShowCommandDialog(false);
      setMessage(event);
    } else {
      if (event && event.target.value.startsWith("/"))
        setShowCommandDialog(true);
      else setShowCommandDialog(false);
      setMessage(event.target.value);
      editorRef?.current?.setMarkdown(inputRef?.current!.value);
    }
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
      <Box display={"flex"}>
        {/* <IconButton onClick={() => setToolBar((p) => !p)}>
          <MoreHoriz />
        </IconButton> */}
        {openToolbar ? (
          //   <MDXEditor
          //     className="editor dark-theme dark-editor"
          //     markdown={message}
          //     autoFocus={true}
          //     ref={editorRef}
          //     plugins={[
          //       listsPlugin(),
          //       quotePlugin(),
          //       headingsPlugin(),
          //       linkPlugin(),
          //       linkDialogPlugin(),
          //       imagePlugin(),
          //       tablePlugin(),
          //       thematicBreakPlugin(),
          //       frontmatterPlugin(),
          //       markdownShortcutPlugin(),
          //     ]}
          //     onChange={(e) => onMessageChange(e, "editor")}
          //   />
          ""
        ) : (
          <TextField
            inputRef={inputRef}
            onChange={(e) => onMessageChange(e)}
            onKeyDown={(e) => {
              if (e.key === "Enter") onSend();
            }}
            value={message}
            size="small"
            placeholder="Type / to view available actions"
            fullWidth
          />
        )}

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
