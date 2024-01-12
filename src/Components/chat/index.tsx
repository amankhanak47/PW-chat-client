import { Fragment, SetStateAction, useEffect, useRef, useState } from "react";
import ChatMessage from "../ChatMessage";
import { useSocket } from "../../contexts/SocketProvider";
import InitialConfigurationDialog from "../InitialConfigurationDialog";
import TextField from "@mui/material/TextField";
import { Box, Chip, IconButton } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import AttachmentIcon from "@mui/icons-material/Attachment";
import AddIcon from "@mui/icons-material/Add";
import { ChatPageContainer } from "./style";
import { AvailableCommands, Message } from "../../types/message";
import {
  // MDXEditor,
  // headingsPlugin,
  // markdownShortcutPlugin,
  // frontmatterPlugin,
  // thematicBreakPlugin,
  // tablePlugin,
  // imagePlugin,
  // linkDialogPlugin,
  // linkPlugin,
  // quotePlugin,
  // listsPlugin,
  MDXEditorMethods,
  // BoldItalicUnderlineToggles,
  // UndoRedo,
  // toolbarPlugin,
  // KitchenSinkToolbar,
} from "@mdxeditor/editor";

//...
import AttachedFiles from "../AttachedFiles";
import CommandDialog from "../CommandDialog";
import UpdateGoalsFlow from "../UpdateGoalsFlow";
import ApplyLeaveFlow from "../ApplyLeaveFlow";

type ChatProps = {
  initial: boolean;
};

type Command = {
  name: string;
};

const users = { 1: "CEO", 2: "Team Member" };

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

const CommandComponent = ({
  activeCommand,
  hideCommandDialog,
}: {
  activeCommand: Command;
  hideCommandDialog: () => void;
}) => {
  switch (activeCommand.name) {
    case AvailableCommands.UPDATE_GOALS: {
      return <UpdateGoalsFlow hideCommandDialog={hideCommandDialog} />;
    }
    case AvailableCommands.APPLY_FOR_LEAVE: {
      return <ApplyLeaveFlow hideCommandDialog={hideCommandDialog} />;
    }
  }
  return <Fragment></Fragment>;
};

const commands = [
  { name: AvailableCommands.UPDATE_GOALS, code: "UPDATE_MY_GOALS" },
  { name: AvailableCommands.APPLY_FOR_LEAVE, code: "APPLY_FOR_LEAVE" },
];

const Chat = ({ initial }: ChatProps) => {
  const { sendMessage, sendAttachedMessage, receivedMessages, currentUserID } =
    useSocket();
  const [open, setOpen] = useState(initial);
  const [selectedTimeZone, setSelectedTimeZone] = useState("America/New_York");
  const [message, setMessage] = useState<string>("");
  const [showCommandDialog, setShowCommandDialog] = useState<boolean>(false);
  const [files, setFiles] = useState<any>([]);
  const editorRef = useRef<MDXEditorMethods>(null);
  const [openToolbar, setToolBar] = useState<boolean>();
  const [activeCommand, setActiveCommand] = useState<Command | undefined>();
  const inputRef = useRef<HTMLInputElement>(null);
  const addFileRef = useRef<HTMLInputElement>(null);
  const currentUser = users[currentUserID];

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
      sendAttachmentMessage();
      return;
    }
    sendMessage(message.trim());
    setMessage("");
    setShowCommandDialog(false);
  };

  const sendAttachmentMessage = async () => {
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

  const onMessageChange = (event: any, usedFor?: string) => {
    if (usedFor) {
      if (event && event.startsWith("/") && currentUser != "CEO")
        setShowCommandDialog(true);
      else setShowCommandDialog(false);
      setMessage(event);
    } else {
      if (event && event.target.value.startsWith("/") && currentUser != "CEO")
        setShowCommandDialog(true);
      else setShowCommandDialog(false);
      setMessage(event.target.value);
      editorRef?.current?.setMarkdown(inputRef?.current!.value);
    }
  };

  const handleUpload = async (e: any) => {
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

  const handleAdditionalUpload = async (e: any) => {
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

    if (allow) {
      setFiles((prevFiles: any) => [
        ...prevFiles,
        ...Array.from(e.target.files),
      ]);
    }
    addFileRef.current!.value = null;
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
      {activeCommand && (
        <CommandComponent
          activeCommand={activeCommand}
          hideCommandDialog={() => setActiveCommand(undefined)}
        />
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
            placeholder={
              currentUser != "CEO" ? "Type / to view available actions" : ""
            }
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
        )}
        <IconButton onClick={onSend}>
          <SendIcon />
        </IconButton>
      </Box>
      <input
        ref={inputRef}
        type="file"
        multiple
        onChange={handleUpload}
        style={{ display: "none" }}
      />
      <input
        ref={addFileRef}
        type="file"
        multiple
        onChange={handleAdditionalUpload}
        style={{ display: "none" }}
      />
      <InitialConfigurationDialog
        open={open}
        close={setOpen}
        setTimeZone={setTimeZone}
      />
    </ChatPageContainer>
  );
};
export default Chat;
