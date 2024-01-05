import React, { useCallback, useContext, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

interface SocketProviderProps {
  children?: React.ReactNode;
}

interface ISocketContext {
  socket: any;
  sendMessage: (msg: string) => any;
  getMessages: () => any;
  messages: string[];
  currentUserID: string;
  setCurrentUserID: any;
  initialize: any;
}

interface Button {
  code: string;
  label: string;
  link_url: string;
  action_taken: boolean;
}

export interface Message {
  sender: number;
  receiver: number;
  content: string;
  sent_at: string;
  type: string;
  card_data?: any;
  buttons?: Button[];
}

const SocketContext = React.createContext<ISocketContext | null>(null);

export const useSocket = () => {
  const state = useContext(SocketContext);
  if (!state) throw new Error(`state is undefined`);

  return state;
};

export const SocketProvider: React.FC<SocketProviderProps> = ({ children }) => {
  const [socket, setSocket] = useState<Socket>();
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentUserID, setCurrentUserID] = useState<string>("1");

  const onFetchMessages = useCallback((messages: Message[]) => {
    setMessages(messages);
  }, []);

  const getMessages: ISocketContext["getMessages"] = useCallback(() => {
    if (socket) {
      socket.emit("fetch messages", { userID: 1 }, onFetchMessages);
    }
  }, [socket, onFetchMessages]);

  const onInitialize = useCallback(() => {
    getMessages();
  }, [getMessages]);

  const initialize: ISocketContext["initialize"] = useCallback(
    (timezone: string) => {
      console.log("Initialize", currentUserID, timezone);
      if (socket && currentUserID) {
        socket.emit(
          "initialize",
          { userID: currentUserID, timezone },
          onInitialize
        );
      }
    },
    [currentUserID, onInitialize, socket]
  );

  const sendMessage: ISocketContext["sendMessage"] = useCallback(
    (message) => {
      console.log("Send Message", {
        message,
        to: currentUserID == "1" ? "2" : "1",
      });
      if (socket) {
        socket.emit("message", {
          message,
          to: currentUserID == "1" ? "2" : "1",
          userID: currentUserID,
        });
      }
    },
    [currentUserID, socket]
  );

  const onMessageRec = useCallback((message: Message) => {
    console.log("From Server Msg Rec", message);
    setMessages((prev) => [...prev, message]);
  }, []);

  useEffect(() => {
    const _socket = io("http://localhost:8000");
    _socket.on("message", onMessageRec);

    setSocket(_socket);

    return () => {
      _socket.off("message", onMessageRec);
      _socket.disconnect();
      setSocket(undefined);
    };
  }, [onMessageRec]);

  return (
    <SocketContext.Provider
      value={{
        socket,
        sendMessage,
        receivedMessages: messages,
        getMessages,
        currentUserID,
        setCurrentUserID,
        initialize,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};
