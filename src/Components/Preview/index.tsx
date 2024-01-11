import {
	Backdrop,
	Button,
	Dialog,
} from "@mui/material";
import FileViewer from "react-file-viewer";
type PreviewDialogProps = {
	hide: any;
	file: any;
	open: boolean;
};

const PreviewDialog = ({ hide, file, open }: PreviewDialogProps) => {
	return (
		<Dialog
			open={open}
			BackdropComponent={Backdrop}
			fullWidth
			maxWidth="md"
			BackdropProps={{ style: { backgroundColor: "rgba(0, 0, 0, 0.3)" } }}
		>
			<Button
				onClick={() => {
					hide();
				}}
				variant="outlined"
				fullWidth
			>
				Close
			</Button>
			<FileViewer fileType={file.extension} filePath={file.url} />
		</Dialog>
	);
};

export default PreviewDialog;
