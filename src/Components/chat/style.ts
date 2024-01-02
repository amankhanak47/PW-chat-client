import styled from "@emotion/styled";

export const ChatPageContainer = styled.div`
  padding: 0;
  margin: 0;
  background: #f8fbff;
  height: 100vh;
  width: 100vw;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  .chat-messages-container {
    width: min(72rem, 100%);
    margin: 12px auto;
    box-sizing: border-box;
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 1rem 1rem 1rem 1.1rem;
    overflow-y: scroll;
  }
  .input-container {
    width: min(72rem, 100%);
    box-sizing: border-box;
    height: fit-content;
    display: flex;
    background-color: rgb(255, 255, 255);
    position: relative;
    margin: 0px auto;
    border-radius: 0.25rem;
    filter: drop-shadow(rgba(0, 0, 0, 0.1) 2px 2px 4px);
    position: sticky;
    bottom: 2.187rem;
  }

  .input {
    flex: 1 1 0%;
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    padding: 10px 16px;
    border-radius: 0.25rem;
    border: none;
    outline: none;
}
`;
