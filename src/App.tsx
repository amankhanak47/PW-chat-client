import Chat from "./Components/chat";
import "./App.css";
import { SocketProvider } from "./contexts/SocketProvider";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
		  <SocketProvider>
			  <Routes>
                  <Route path='/' element={<Chat />} />
			  </Routes>
        <Chat />
      </SocketProvider>
    </BrowserRouter>
  );
}

export default App;
