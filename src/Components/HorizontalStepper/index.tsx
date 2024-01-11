import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import { Card, CardActionArea } from "@mui/material";

const steps = ["Select a Goal", "Update Goal"];

const HorizontalStepper = () => {
	const [activeStep, setActiveStep] = React.useState(0);

	const handleNext = () => {
		setActiveStep((prevActiveStep) => prevActiveStep + 1);
	};

	const handleBack = () => {
		setActiveStep((prevActiveStep) => prevActiveStep - 1);
	};

	return (
		<Box sx={{ width: "100%" }}>
			<Stepper activeStep={activeStep}>
				{steps.map((label) => {
					const stepProps: { completed?: boolean } = {};
					const labelProps: {
						optional?: React.ReactNode;
					} = {};
					return (
						<Step key={label} {...stepProps}>
							<StepLabel {...labelProps}>{label}</StepLabel>
						</Step>
					);
				})}
			</Stepper>
			<React.Fragment>
				<Box>
					{activeStep + 1 == 1 && (
						<Card
							sx={{
								minHeight: 100,
								maxWidth: 100,
							}}
						>
							<CardActionArea
								sx={{
									minHeight: 100,
									maxWidth: 100,
									alignContent: "center",
									justifyContent: "center",
								}}
							>
								Goal 1
							</CardActionArea>
						</Card>
					)}
					<Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
						<Button
							color="inherit"
							disabled={activeStep === 0}
							onClick={handleBack}
							sx={{ mr: 1 }}
						>
							Back
						</Button>
						<Box sx={{ flex: "1 1 auto" }} />
						<Button onClick={handleNext}>
							{activeStep === steps.length - 1 ? "Finish" : "Next"}
						</Button>
					</Box>
				</Box>
			</React.Fragment>
		</Box>
	);
};

export default HorizontalStepper;
