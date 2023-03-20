import { Box, CircularProgress } from "@mui/material";
import BottomNavigation from "@mui/material/BottomNavigation";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import Copyright from "./Copyright";

export default function Footer(props) {
  var task;
  if (!props.loading) {
    task = <TaskAltIcon className="task" />;
  } else if (props.loading) {
    task = <CircularProgress className="task" />;
  }
  return (
    <BottomNavigation className="footer">
      <Box
        width={"100%"}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mx: 2,
        }}>
        <span> </span>
        <Copyright />
        {task}
      </Box>
    </BottomNavigation>
  );
}
