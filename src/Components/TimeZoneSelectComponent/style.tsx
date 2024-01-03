import styled from "@emotion/styled";

export const TimeZoneSelectComponentContainer = styled.div`
  min-height: 100px;
  width: 500px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 10px 8px;
  box-sizing: border-box;
  .buttons {
    width: 100%;
    display: flex;
    justify-content: space-between;
    & > * {
      width: 49%;
    }
  }
  .zone-selector {
    width: 100%;
  }
  .time-zone-element {
    width: 100%;
    padding: 20px 0px;
    box-sizing: border-box;
  }
  .select-element {
    width: 100%;
    height: 40px;
    font-size: 16px;
    border-radius: 8px;
    border: 1px solid #a7aeba;
  }
`;
