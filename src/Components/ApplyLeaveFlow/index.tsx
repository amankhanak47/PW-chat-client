import {
  Card,
  CardContent,
  Typography,
  Box,
  CardActions,
  Button,
  Step,
  StepLabel,
  Stepper,
  Autocomplete,
  TextField,
} from "@mui/material";
import { useState, useEffect, FunctionComponent, Fragment } from "react";
import { useSocket } from "../../contexts/SocketProvider";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

const cardContentSx = { p: 1, pb: "0 !important", overflow: "auto" };

const steps = ["Select Dates", "Select Leave Type"];

const leaveOptions = ["Casual Leave", "Annual Leave", "Bevearment Leave"];

const ApplyLeaveFlow: FunctionComponent<{ hideCommandDialog: () => void }> = ({
  hideCommandDialog,
}) => {
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const [selectedGoal, setSelectedGoal] = useState<Goal | undefined>();
  const [leaveType, setLeaveType] = useState<string | undefined>();
  const [goalActualValue, setGoalActualValue] = useState<string>();
  const [startDate, setStartDate] = useState<unknown>();
  const [endDate, setEndDate] = useState<unknown>();
  const { updateGoal } = useSocket();

  useEffect(() => {
    return () => {
      setActiveStep(0);
    };
  }, []);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Card sx={{ maxWidth: 600 }}>
        <CardContent sx={cardContentSx}>
          <Stepper activeStep={activeStep} alternativeLabel>
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
          {activeStep == 0 ? (
            <Box display={"flex"} gap={2} m={2}>
              <DatePicker
                label="Start Date"
                onAccept={(value) =>
                  value && setStartDate(new Date(value as Date))
                }
              />
              <DatePicker
                label="End Date"
                onAccept={(value) =>
                  value && setEndDate(new Date(value as Date))
                }
              />
            </Box>
          ) : activeStep == 1 ? (
            <Box m={2}>
              <Autocomplete
                renderInput={(params) => (
                  <TextField {...params} size="small" label="Leave Type" />
                )}
                onChange={(_e, v) => v && setLeaveType(v)}
                options={leaveOptions}
              />
            </Box>
          ) : (
            <Fragment />
          )}
        </CardContent>
        <CardActions>
          <Box display={"flex"} flex={1} />
          {activeStep == 1 && (
            <Fragment>
              <Button size="small" color="primary" onClick={() => handleBack()}>
                Back
              </Button>

              <Button
                size="small"
                color="primary"
                onClick={() => {
                  console.log(startDate, endDate, leaveType);
                  hideCommandDialog();
                }}
              >
                Save
              </Button>
            </Fragment>
          )}
          {activeStep != 1 && (
            <Button size="small" color="primary" onClick={() => handleNext()}>
              Next
            </Button>
          )}
        </CardActions>
      </Card>
    </LocalizationProvider>
  );
};

export default ApplyLeaveFlow;
