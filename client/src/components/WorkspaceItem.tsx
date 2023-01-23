import { FC } from "react";

import {
  IconButton,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import { WorkspaceDto } from "../services/interfaces/workspaces.interface";

interface Props {
  workspace: WorkspaceDto;
  openDialogAndGetWSId: (id: number) => void;
  deleteHandler: (deleteData: any) => void;
}

const WorkspaceItem: FC<Props> = ({
  workspace,
  openDialogAndGetWSId,
  deleteHandler,
}) => {
  return (
    <Card variant="outlined">
      <CardContent>
        <Typography variant="h6">{workspace.name}</Typography>
        <Typography variant="body2">{workspace.subdomain}</Typography>
      </CardContent>
      <CardActions>
        <IconButton
          color="primary"
          size="small"
          onClick={() => {
            openDialogAndGetWSId(workspace.id);
          }}
        >
          <EditIcon />
        </IconButton>
        <IconButton
          color="error"
          size="small"
          onClick={() => deleteHandler(workspace.id)}
        >
          <DeleteIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default WorkspaceItem;
