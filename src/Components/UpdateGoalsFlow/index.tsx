import {
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Box,
  TextField,
  CardActions,
  Button,
} from "@mui/material";
import axios from "axios";
import { useState, useEffect, FunctionComponent } from "react";
import { useSocket } from "../../contexts/SocketProvider";

type Goal = {
  title: string;
  actual: number;
  target: number;
  uuid: string;
};

const cardContentSx = { p: 1, pb: "0 !important", overflow: "auto" };

const UpdateGoalsFlow: FunctionComponent<{ hideCommandDialog: () => void }> = ({
  hideCommandDialog,
}) => {
  const [selectedGoal, setSelectedGoal] = useState<Goal | undefined>();
  const [goals, setGoals] = useState<Goal[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [goalActualValue, setGoalActualValue] = useState<string>();
  const { updateGoal } = useSocket();

  const getGoals = async () => {
    const goals = await axios.get("http://localhost:8000/api/goal/2");
    setGoals(goals.data?.goals);
  };

  const handleUpdateGoal = async () => {
    if (!selectedGoal || !goalActualValue) return;
    updateGoal(selectedGoal.uuid, parseInt(goalActualValue));
    hideCommandDialog();
  };

  useEffect(() => {
    getGoals();
  }, []);

  const onGoalSelected = (goal: Goal) => {
    setSelectedGoal(goal);
    setCurrentStep((prev) => prev + 1);
    setGoalActualValue(goal.actual.toString());
  };

  const renderGoalsList = () => {
    return (
      goals &&
      goals.length > 0 &&
      goals.map((goal) => (
        <ListItem sx={{ p: 0 }} key={goal.uuid}>
          <ListItemButton onClick={() => onGoalSelected(goal)}>
            <ListItemText secondary={goal.title} />
          </ListItemButton>
        </ListItem>
      ))
    );
  };

  useEffect(() => {
    return () => {
      setCurrentStep(0);
    };
  }, []);

  if (currentStep == 0) {
    return (
      <Card sx={{ maxWidth: 600 }}>
        <CardContent sx={cardContentSx}>
          <Typography variant="subtitle2">Select a goal</Typography>
          <List dense>{renderGoalsList()}</List>
        </CardContent>
      </Card>
    );
  } else if (currentStep == 1 && selectedGoal) {
    return (
      <Card sx={{ maxWidth: 600 }}>
        <CardContent>
          <Typography variant="overline">{selectedGoal.title}</Typography>
          <Box
            display={"flex"}
            mt={1}
            alignContent={"center"}
            alignItems={"center"}
          >
            <TextField
              variant="outlined"
              size="small"
              value={goalActualValue}
              defaultValue={selectedGoal.actual}
              onChange={(e) => setGoalActualValue(e.target.value)}
            />
            <Typography
              variant="overline"
              ml={1}
            >{` / ${selectedGoal.target}`}</Typography>
          </Box>
        </CardContent>
        <CardActions>
          <Button
            size="small"
            color="primary"
            onClick={() => setCurrentStep(currentStep - 1)}
          >
            Back
          </Button>
          <Button
            size="small"
            color="primary"
            onClick={() => handleUpdateGoal()}
          >
            Save
          </Button>
        </CardActions>
      </Card>
    );
  }

  return <Box>{currentStep}</Box>;
};

export default UpdateGoalsFlow;
