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
  .message-footer{
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 12px;
    color: gray;
    padding: 0px;
    margin-top: 12px;
  }
`;

