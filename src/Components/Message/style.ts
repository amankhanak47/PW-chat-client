import React from "react";
import styled from "@emotion/styled";

export type MessageProps = React.HTMLAttributes<HTMLDivElement> & {
  direction: any;
};

export const StyledMessage = styled.div<MessageProps>`
  display: flex;
  flex-direction: row;
  gap: 0.5rem;
  position: relative;
  flex-flow: ${(props: any) => {
    if (props.direction === "right") return "row-reverse";
  }};
  .message-content {
    padding: 0.75rem;
    background-color: rgb(255, 255, 255);
    border: 1px solid rgba(66, 133, 244, 0.3);
    box-shadow: rgba(66, 133, 244, 0.3) 2px 2px 4px;
    border-radius: 0.75rem 0.75rem 0.75rem 0px;
    width: 450px;
  }
  .message-body{
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  .buttons{
    display: flex;
    gap: 1rem;
    justify-content: end;

  }
  .chat-btn{
    font-weight: 500;
    border: none;
    font-size: 16px;
    font-family: Rubik, Helvetica, Arial, sans-serif;
    min-width: 90px;
    padding: 6px 16px;
    border-radius: 4px;
    color: rgb(248, 251, 255);
    background-color: rgb(83, 148, 255);
    cursor: pointer;
    box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 0.5px -1px, rgba(0, 0, 0, 0.1) 0px 1px 2px 0px, rgba(0, 0, 0, 0.08) 0px 0px 2px 0px;
  }
  .message-footer{
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 12px;
    color: gray;
    padding: 0px;
    margin-top: 12px;
  }
  .double-tick{
    margin-left: 4px;
  }
`;

