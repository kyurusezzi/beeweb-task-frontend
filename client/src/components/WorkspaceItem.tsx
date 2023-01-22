import { IconButton, Card, CardActions, CardContent } from "@mui/material";
import { FC } from "react";
import { WorkspaceDto } from "../services/interfaces/workspaces.interface";

interface Props {
  workspace: WorkspaceDto;
}

const WorkspaceItem: FC<Props> = ({ workspace }) => {
  return (
    <Card variant="outlined">
      <CardContent>{workspace.name}</CardContent>
      <CardActions>
        <IconButton color="primary" size="small">
          edit
        </IconButton>
        <IconButton color="error" size="small">
          delete
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default WorkspaceItem;
