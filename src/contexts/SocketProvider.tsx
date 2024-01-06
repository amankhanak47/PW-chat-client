import React, { useCallback, useContext, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { Message } from "../types/message";

type SocketProviderProps = {
	children?: React.ReactNode;
};

type ISocketContext = {
	sendMessage: (msg: string) => any;
	getMessages: () => any;
	receivedMessages: Message[];
	currentUserID: number;
	setCurrentUserID: any;
	initialize: any;
	toUser: number;
};

const SocketContext = React.createContext<ISocketContext | null>(null);

export const useSocket = () => {
	const state = useContext(SocketContext);
	if (!state) throw new Error(`state is undefined`);

	return state;
};

export const SocketProvider: React.FC<SocketProviderProps> = ({ children }) => {
	const [socket, setSocket] = useState<Socket>();
	const [messages, setMessages] = useState<Message[]>([]);
	const [currentUserID, setCurrentUserID] = useState<number>(1);
	const toUser = currentUserID == 1 ? 2 : 1;

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
			if (socket && message.trim()) {
				socket.emit("message", {
					message,
					to: toUser,
					userID: currentUserID,
				});
			}
		},
		[currentUserID, socket, toUser]
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

	const value = {
		sendMessage,
		receivedMessages: messages,
		getMessages,
		currentUserID,
		setCurrentUserID,
		initialize,
		toUser,
	};

	return (
		<SocketContext.Provider value={value}>{children}</SocketContext.Provider>
	);
};
