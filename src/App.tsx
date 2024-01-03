import Chat from "./Components/chat";
import "./App.css";
import { SocketProvider } from "./contexts/SocketProvider";

function App() {
	return (
		<SocketProvider>
			<Chat />
		</SocketProvider>
	);
}

export default App;
