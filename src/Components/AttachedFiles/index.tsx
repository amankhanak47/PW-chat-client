import { FunctionComponent } from "react";
import { AttachedFileContainer } from "./style";
import AttachedFileBox from "../AttachedFileBox";
type AttachedFileprops = {
	files: any;
	setFiles?: any
};

const AttachedFiles: FunctionComponent<AttachedFileprops> = ({ files, setFiles }) => {
	const deleteFile = (fileName: string) => {
		setFiles((prevFiles: any) =>
			prevFiles.filter((file: any) => file.name !== fileName)
		);
	};
	return (
		<AttachedFileContainer>
			{files.map((file: any) => {
				return (
					<AttachedFileBox name={file.name} type={file.type} url={file.url}  deleteFile={deleteFile}/>
				);
			})}
		</AttachedFileContainer>
	);
};
export default AttachedFiles;
