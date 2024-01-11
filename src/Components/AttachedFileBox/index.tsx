import { FileIcon, defaultStyles } from "react-file-icon";
import DownloadIcon from "@mui/icons-material/Download";
import CloseIcon from '@mui/icons-material/Close';
import { FunctionComponent, useState } from "react";
import { AttachedFileBoxContainer } from "./style";
import PreviewDialog from "../Preview";
import { IconButton } from "@mui/material";
type AttachedFileBoxprops = {
	name: string;
	url?: string;
    type?: string;
    deleteFile?: any
};
const AttachedFileBox: FunctionComponent<AttachedFileBoxprops> = ({
	name,
    url,
    deleteFile,
    type,
    
}) => {
	const [show, setShow] = useState<boolean>(false);
	const extension = name.split(".").pop();
	return (
		<AttachedFileBoxContainer>
			{type?.includes("image") && url ? (
				<div className="attached-file-img" onClick={() => setShow(true)}>
					<img src={url} alt="" />
				</div>
			) : (
				<div className="attached-file" onClick={() =>url && setShow(true)}>
					<div className="attached-file-icon">
						<FileIcon extension={extension} {...defaultStyles[extension]} />
					</div>
					<div className="attached-file-content">
						<p className="attached-file-name">{name}</p>
						{url ? (
							<a href={url} download={name}>
								<DownloadIcon />
							</a>
						): <IconButton onClick={()=>deleteFile(name)}><CloseIcon/></IconButton> }
					</div>
				</div>
			)}

			<PreviewDialog
				open={show}
				hide={() => {
					console.log(name);
					setShow(false);
				}}
				file={{ url, extension }}
			/>
		</AttachedFileBoxContainer>
	);
};
export default AttachedFileBox;
