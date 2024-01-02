import { StyledMessage } from "./style";

function Message({ m }: { m: any }) {
    // console.log(this, "ldsk")
  const userId = "0e8bcf54-c99d-4b36-a282-bf4a65e4830f";
  const direction = m.from === userId ? "left" : "right";
  return (
    <StyledMessage direction={direction}>
      <div className={`message-content ${direction}`}>
        <p>{m.content}</p>
        <span className="message-footer">
          <p>{m.from}</p>
          <p>
            07-Sep-2023 14:03
            <span className="double-tick">
              <img
                src="https://r.lykkeworks.com/assets/doubletick-66431f34.svg"
                alt=""
              />
            </span>
          </p>
        </span>
      </div>
    </StyledMessage>
  );
}

export default Message;
