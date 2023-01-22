import { Box, Button, Grid } from "@mui/material";
import { FC, useEffect, useState } from "react";
import WorkspaceItem from "../../components/WorkspaceItem";
import { WorkspaceDto } from "../../services/interfaces/workspaces.interface";
import workspaceService from "../../services/workspace.service";
import { Typography } from "@mui/material";
import WorkspaceForm from "../../components/WorkspaceForm";

const Workspace: FC = () => {
  const [workspaces, setWorkspaces] = useState<WorkspaceDto[]>([]);
  const [isOpenDialog, setIsOpenDialog] = useState(false);

  useEffect(() => {
    (async () => {
      const data = await workspaceService.getWorkspaces();
      setWorkspaces(data);
    })();
  }, []);

  const createHandler = async (workspaceData: any) => {
    const newWorkspace = await workspaceService.createWorkspace(workspaceData);
    console.log(newWorkspace);
    setWorkspaces([...workspaces, newWorkspace]);
    setIsOpenDialog(false);
  };

  return (
    <>
      <Box padding="60px">
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            paddingBottom: "30px",
          }}
        >
          <Typography variant="h4">Workspaces</Typography>
          <Button variant="contained" onClick={() => setIsOpenDialog(true)}>
            Create a new workspace
          </Button>
        </Box>
        <Grid container spacing={2}>
          {workspaces.map((workspace) => (
            <Grid item xs={12} sm={6} md={3} lg={2} key={workspace.id}>
              <WorkspaceItem workspace={workspace} />
            </Grid>
          ))}
        </Grid>
      </Box>
      <WorkspaceForm
        formTitle="Create Workspace"
        buttonText="CREATE"
        isOpen={isOpenDialog}
        setIsOpen={setIsOpenDialog}
        buttonClickHandler={createHandler}
        fieldsConfigs={[
          { name: "name", label: "Name", isRequired: true },
          {
            name: "subdomain",
            label: "Subdomain",
            isRequired: true,
          },
        ]}
      />
    </>
  );
};

export default Workspace;
