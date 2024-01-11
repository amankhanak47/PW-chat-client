import styled from "@emotion/styled";

export const ChatPageContainer = styled.div`
  padding: 24px;
  margin: 0;
  background: #f8fbff;
  height: 100vh;
  width: 100vw;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  .chat-messages-container {
    box-sizing: border-box;
    flex: 1;
    display: flex;
    gap: 1rem;
    padding: 1rem;
    overflow-y: scroll;
    flex-direction: column;
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
  .editor {
    width: 100%;
    border: 1px solid grey;
    border-radius: 4px;
    background-color: #fff;
  }
  ._rootContentEditableWrapper_11eqz_1047,
  ._contentEditable_11eqz_352 {
    height: 100%;
    align-items: center;
    overflow: hidden;
  }
`;
