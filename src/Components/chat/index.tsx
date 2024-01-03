import { useState } from "react";
import { ChatPageContainer } from "./style";
import Message from "../Message";
import { useSocket } from "../../contexts/SocketProvider";
import { Dialog } from "@mui/material";
import TimeZoneSelectComponent from "../TimeZoneSelectComponent";

function Chat({ initial }: { initial: boolean }) {
  const { sendMessage, messages } = useSocket();
  const [open, setOpen] = useState(initial);
  const [selectedTimeZone, setSelectedTimeZone] = useState("America/New_York");
  const [message, setMessages] = useState<any>([
    {
      id: "77d38f91-cca6-4424-858b-da53c4807b1f",
      content: "Annual Objectives created for cycle Jan 2023 - Dec 2023",
      from: "0e8bcf54-c99d-4b36-a282-bf4a65e4830f",
      to: "0f78525a-4302-4d90-88ef-a76dec306fd8",
      sentAt: "2023-08-17T06:54:50.128Z",
      seenAt: "2023-08-17T06:55:09.523Z",
      card: null,
    },
    {
      id: "c6fa1af8-08b9-4f20-8909-6b4394c625ff",
      content:
        "New cycle is created. Please plan your objectives and goal plan for the upcoming cycle AY 2024 - 2025.",
      to: "0e8bcf54-c99d-4b36-a282-bf4a65e4830f",
      from: "0f78525a-4302-4d90-88ef-a76dec306fd8",
      sentAt: "2023-09-07T08:33:23.241Z",
      seenAt: "2023-09-07T08:36:14.497Z",
      card: null,
    },
    {
      id: "c33dbd4f-e6ab-459d-aa54-8b18db0453be",
      content:
        "User attributes for Aabir U1 is incorrect suspend him or add or update his details.",
      from: "0e8bcf54-c99d-4b36-a282-bf4a65e4830f",
      to: "0f78525a-4302-4d90-88ef-a76dec306fd8",
      sentAt: "2023-10-04T07:12:39.957Z",
      seenAt: "2023-10-04T07:35:21.347Z",
      card: null,
      buttons: [
        { label: "Add", url: "/add" },
        { label: "Update", url: "/update" },
      ],
    },
    {
      id: "51f28dff-3bc1-4bf4-aa46-33bf9aa40fca",
      content: "User attributes updated for Aabir U1",
      from: "0e8bcf54-c99d-4b36-a282-bf4a65e4830f",
      to: "0f78525a-4302-4d90-88ef-a76dec306fd8",
      sentAt: "2023-10-04T07:12:51.457Z",
      seenAt: "2023-10-04T07:35:21.347Z",
      card: null,
    },
    {
      id: "000f4474-e876-4eb3-a459-00ed8fd93432",
      content: "User attributes updated for Aabir U2",
      from: "0e8bcf54-c99d-4b36-a282-bf4a65e4830f",
      to: "0f78525a-4302-4d90-88ef-a76dec306fd8",
      sentAt: "2023-10-04T07:13:08.960Z",
      seenAt: "2023-10-04T07:35:21.347Z",
      card: null,
    },
    {
      id: "6567cf62-099e-4449-9964-0e696a0baade",
      content: "User attributes updated for Aabir U22",
      from: "0e8bcf54-c99d-4b36-a282-bf4a65e4830f",
      to: "0f78525a-4302-4d90-88ef-a76dec306fd8",
      sentAt: "2023-10-04T07:13:31.105Z",
      seenAt: "2023-10-04T07:35:21.347Z",
      card: null,
    },
    {
      id: "36166851-5bc5-4497-8ea1-bfbb348f4bf0",
      content: "User attributes updated for Aabir U23",
      from: "0e8bcf54-c99d-4b36-a282-bf4a65e4830f",
      to: "0f78525a-4302-4d90-88ef-a76dec306fd8",
      sentAt: "2023-10-04T07:13:57.322Z",
      seenAt: "2023-10-04T07:35:21.347Z",
      card: null,
    },
    {
      id: "435328cc-9d36-4d1f-98db-6c1d95566f35",
      content: "User attributes updated for Aabir U21",
      from: "0e8bcf54-c99d-4b36-a282-bf4a65e4830f",
      to: "0f78525a-4302-4d90-88ef-a76dec306fd8",
      sentAt: "2023-10-04T07:14:36.956Z",
      seenAt: "2023-10-04T07:35:21.347Z",
      card: null,
    },
    {
      id: "529ba005-3d88-4208-98f7-145432b17a59",
      content: "User attributes updated for aabiru231",
      from: "0e8bcf54-c99d-4b36-a282-bf4a65e4830f",
      to: "0f78525a-4302-4d90-88ef-a76dec306fd8",
      sentAt: "2023-10-04T07:16:37.165Z",
      seenAt: "2023-10-04T07:35:21.347Z",
      card: null,
    },
    {
      id: "800df6eb-44d0-47ec-af80-c85b8d0aa1b9",
      content: "User attributes updated for Aabir U1",
      from: "0e8bcf54-c99d-4b36-a282-bf4a65e4830f",
      to: "0f78525a-4302-4d90-88ef-a76dec306fd8",
      sentAt: "2023-11-02T05:52:49.726Z",
      seenAt: "2023-11-02T06:33:20.871Z",
      card: null,
    },
    {
      id: "3072cb76-c24c-47bd-ba33-d663d9dc08dd",
      content: "User attributes updated for Aabir U11",
      from: "0e8bcf54-c99d-4b36-a282-bf4a65e4830f",
      to: "0f78525a-4302-4d90-88ef-a76dec306fd8",
      sentAt: "2023-11-02T05:57:46.334Z",
      seenAt: "2023-11-02T06:33:20.871Z",
      card: null,
    },
    {
      id: "65fff693-210f-4094-b78c-f244c7bb2a73",
      content: "User attributes updated for Aabir U11",
      from: "0e8bcf54-c99d-4b36-a282-bf4a65e4830f",
      to: "0f78525a-4302-4d90-88ef-a76dec306fd8",
      sentAt: "2023-11-02T06:00:12.722Z",
      seenAt: "2023-11-02T06:33:20.871Z",
      card: null,
    },
    {
      id: "b97cb2e4-0055-4ab1-b6b3-78720dcf6ab6",
      content: "User attributes updated for Aabir U11",
      from: "0e8bcf54-c99d-4b36-a282-bf4a65e4830f",
      to: "0f78525a-4302-4d90-88ef-a76dec306fd8",
      sentAt: "2023-11-02T06:09:10.799Z",
      seenAt: "2023-11-02T06:33:20.871Z",
      card: null,
    },
    {
      id: "5bbd6497-14d7-4e15-8c22-f26767af9af3",
      content: "User attributes updated for Aabir U2",
      from: "0e8bcf54-c99d-4b36-a282-bf4a65e4830f",
      to: "0f78525a-4302-4d90-88ef-a76dec306fd8",
      sentAt: "2023-11-02T06:23:02.531Z",
      seenAt: "2023-11-02T06:33:20.871Z",
      card: null,
    },
    {
      id: "a1fd7b10-4d63-4465-a93a-8e0510a820ed",
      content: "User attributes updated for Aabir U21",
      from: "0e8bcf54-c99d-4b36-a282-bf4a65e4830f",
      to: "0f78525a-4302-4d90-88ef-a76dec306fd8",
      sentAt: "2023-11-02T06:23:13.793Z",
      seenAt: "2023-11-02T06:33:20.871Z",
      card: null,
    },
    {
      id: "2995eefb-8ba5-4fc0-a611-364422b7b30e",
      content: "User attributes updated for Aabir U231",
      from: "0e8bcf54-c99d-4b36-a282-bf4a65e4830f",
      to: "0f78525a-4302-4d90-88ef-a76dec306fd8",
      sentAt: "2023-11-15T03:40:40.603Z",
      seenAt: "2023-11-15T04:28:33.349Z",
      card: null,
    },
    {
      id: "1a444acd-f4b2-48c1-a554-4b5c9670563d",
      content: "User attributes updated for Aabir CEO",
      from: "0e8bcf54-c99d-4b36-a282-bf4a65e4830f",
      to: "0f78525a-4302-4d90-88ef-a76dec306fd8",
      sentAt: "2023-11-22T05:15:42.856Z",
      seenAt: "2023-11-22T05:21:09.783Z",
      card: null,
    },
    {
      id: "9cce0402-b66b-473b-8aeb-b2c5d19784f7",
      content: "User attributes updated for Aabir U1",
      from: "0e8bcf54-c99d-4b36-a282-bf4a65e4830f",
      to: "0f78525a-4302-4d90-88ef-a76dec306fd8",
      sentAt: "2023-11-22T05:16:22.653Z",
      seenAt: "2023-11-22T05:21:09.783Z",
      card: null,
    },
    {
      id: "272c2599-e4f1-48a4-b840-e5181b1c04bc",
      content: "User attributes updated for Aabir U2",
      from: "0e8bcf54-c99d-4b36-a282-bf4a65e4830f",
      to: "0f78525a-4302-4d90-88ef-a76dec306fd8",
      sentAt: "2023-11-22T05:16:35.071Z",
      seenAt: "2023-11-22T05:21:09.783Z",
      card: null,
    },
    {
      id: "a3de7ed7-ee79-41ff-beb1-89a118717199",
      content: "User attributes updated for Aabir U11",
      from: "0e8bcf54-c99d-4b36-a282-bf4a65e4830f",
      to: "0f78525a-4302-4d90-88ef-a76dec306fd8",
      sentAt: "2023-11-22T05:16:56.132Z",
      seenAt: "2023-11-22T05:21:09.783Z",
      card: null,
    },
    {
      id: "fc598c03-b5f9-4944-abdd-5e7985278857",
      content: "User attributes updated for Aabir U21",
      from: "0e8bcf54-c99d-4b36-a282-bf4a65e4830f",
      to: "0f78525a-4302-4d90-88ef-a76dec306fd8",
      sentAt: "2023-11-22T05:17:16.114Z",
      seenAt: "2023-11-22T05:21:09.783Z",
      card: null,
    },
    {
      id: "eef7f61b-69bb-4606-97ff-80df2ddc65f8",
      content: "User attributes updated for Aabir U22",
      from: "0e8bcf54-c99d-4b36-a282-bf4a65e4830f",
      to: "0f78525a-4302-4d90-88ef-a76dec306fd8",
      sentAt: "2023-11-22T05:17:29.708Z",
      seenAt: "2023-11-22T05:21:09.783Z",
      card: null,
    },
    {
      id: "56e6082a-6dff-43b3-9ce4-0bf01fe4983d",
      content: "User attributes updated for Aabir U1 Kalyan",
      from: "0e8bcf54-c99d-4b36-a282-bf4a65e4830f",
      to: "0f78525a-4302-4d90-88ef-a76dec306fd8",
      sentAt: "2023-11-22T05:18:42.054Z",
      seenAt: "2023-11-22T05:21:09.783Z",
      card: null,
    },
    {
      id: "9bae2d12-8007-49e7-b35f-d3fb94eac161",
      content: "User attributes updated for Aabir U2 Sunil",
      from: "0e8bcf54-c99d-4b36-a282-bf4a65e4830f",
      to: "0f78525a-4302-4d90-88ef-a76dec306fd8",
      sentAt: "2023-11-22T05:18:53.148Z",
      seenAt: "2023-11-22T05:21:09.783Z",
      card: null,
    },
    {
      id: "aee8f414-19ad-45ea-904d-4d5494874dfb",
      content: "User attributes updated for Aabir U11 Prabhath",
      from: "0e8bcf54-c99d-4b36-a282-bf4a65e4830f",
      to: "0f78525a-4302-4d90-88ef-a76dec306fd8",
      sentAt: "2023-11-22T05:19:38.666Z",
      seenAt: "2023-11-22T05:21:09.783Z",
      card: null,
    },
    {
      id: "7d1bb390-5186-4b27-a20c-8a5126a27225",
      content: "User attributes updated for Aabir U231",
      from: "0e8bcf54-c99d-4b36-a282-bf4a65e4830f",
      to: "0f78525a-4302-4d90-88ef-a76dec306fd8",
      sentAt: "2023-12-15T08:08:54.474Z",
      seenAt: "2023-12-18T04:53:15.219Z",
      card: null,
    },
    {
      id: "3a9e5784-9504-42be-9190-c61264671f5f",
      content: "User attributes updated for Aabir U22 Dhanvi",
      from: "0e8bcf54-c99d-4b36-a282-bf4a65e4830f",
      to: "0f78525a-4302-4d90-88ef-a76dec306fd8",
      sentAt: "2023-12-18T08:23:35.187Z",
      seenAt: "2023-12-18T08:23:58.450Z",
      card: null,
    },
    {
      id: "5c85e92e-3ead-4f13-8360-3b379f043d4f",
      content: "Modified attributes updated for Aabir U22 Dhanvi",
      from: "0e8bcf54-c99d-4b36-a282-bf4a65e4830f",
      to: "0f78525a-4302-4d90-88ef-a76dec306fd8",
      sentAt: "2023-12-20T09:52:05.739Z",
      seenAt: "2023-12-20T09:52:05.739Z",
      card: null,
    },
  ]);

  return (
    <ChatPageContainer>
      <div className="chat-messages-container">
        {message.map((m: any) => {
          return <Message m={m} selectedTimeZone={selectedTimeZone} />;
        })}
      </div>
      <div className="input-container">
        <input
          className="input"
          type="text"
          placeholder="Click on the up-arrow for actions/ Message to ALTR by clicking in here"
          name=""
          id=""
        />
      </div>
      {open && (
        <Dialog open={open}>
          <TimeZoneSelectComponent
            close={setOpen}
            setTimeZone={setSelectedTimeZone}
          />
        </Dialog>
      )}
    </ChatPageContainer>
  );
}

export default Chat;
