import styled from "@emotion/styled";

export const AttachedFileBoxContainer = styled.div`
	.attached-file {
		display: flex;
		align-items: center;
		gap: 12px;
		border: 1px solid black;
		border-radius: 10px;
		width: 300px; 
		padding: 8px 12px;
		background-color: #f8fbff;
		border: 1px solid rgba(66, 133, 244, 0.3);
		box-shadow: rgba(66, 133, 244, 0.3) 0px 0px 1px 1px;
		border-radius: 0.75rem;
	}
	.attached-file-img {
		width: 350px;
	}
	.attached-file-img img {
		width: 100%;
		height: 100%;
	}
	.attached-file-icon {
		height: 25px;
		width: 25px;
	}
	.attached-file-name {
		max-width: 22ch;
		text-overflow: ellipsis;
		overflow: hidden;
		white-space: nowrap;
	}
	.attached-file-content {
		display: flex;
		align-items: center;
		justify-content: space-between;
		flex: 1;
	}
`;
