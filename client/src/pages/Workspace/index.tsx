import { FC, useEffect, useState } from "react";
import { useLocation, useNavigate, createSearchParams } from "react-router-dom";

import { Box, Button, Grid, Typography } from "@mui/material";

import WorkspaceItem from "../../components/WorkspaceItem";
import WorkspaceDialogForm from "../../components/WorkspaceDialogForm";

import AuthService from "../../services/auth.service";
import { WorkspaceDto } from "../../services/interfaces/workspaces.interface";
import workspaceService from "../../services/workspace.service";
import subdomainService from "../../services/subdomain.service";
import debounce from "../../helpers/debounce";

const Workspace: FC = () => {
  const [workspaces, setWorkspaces] = useState<WorkspaceDto[]>([]);
  const [updatingWorkspaceId, setUpdatingWorkspaceId] = useState(0);

  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false);

  const [suggestedSubdomains, setSuggestedSubdomains] = useState<string[]>([]);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const data = await workspaceService.getWorkspaces();
      setWorkspaces(data);
    })();
  }, []);

  const createHandler = async (workspaceData: any) => {
    const newWorkspace = await workspaceService.createWorkspace(workspaceData);

    setWorkspaces((prevWorkspaces) => [...prevWorkspaces, newWorkspace]);
    setIsCreateDialogOpen(false);
  };

  const updateHandler = async (workspaceUpdateData: any) => {
    workspaceUpdateData.id = updatingWorkspaceId;
    const updatedWorkspace = await workspaceService.updateWorkspace(
      workspaceUpdateData
    );

    const updatedIndex = workspaces.findIndex(
      ({ id }) => id === updatedWorkspace.id
    );
    setWorkspaces((prevWorkspaces) =>
      prevWorkspaces.map((workspace, index) => {
        if (updatedIndex === index) {
          return updatedWorkspace;
        }
        return workspace;
      })
    );

    setIsUpdateDialogOpen(false);
  };

  const deleteHandler = async (workspaceId: number) => {
    const { deletedCount } = await workspaceService.deleteWorkspace(
      workspaceId
    );

    if (deletedCount) {
      setWorkspaces((prevWorkspaces) =>
        prevWorkspaces.filter(({ id }) => id !== workspaceId)
      );
    }
  };

  const changeHandler = debounce(async (event: any) => {
    const searchParams = createSearchParams({ subdomain: event.target.value });

    const data = await subdomainService.getSubdomainSuggestions(
      searchParams.toString()
    );
    if (!data.isAvailable && !data.suggestions) {
      setSuggestedSubdomains([]);
      return;
    }
    if (data.isAvailable && data.suggestions) {
      setSuggestedSubdomains([]);
      return;
    }
    if (!data.isAvailable && data.suggestions?.length) {
      setSuggestedSubdomains(data.suggestions);
      return;
    }
  }, 1000);

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

          <Typography variant="h6">{location.state?.user.fullName}</Typography>

          <Button
            variant="contained"
            onClick={() => setIsCreateDialogOpen(true)}
          >
            Create a new workspace
          </Button>
        </Box>
        <Grid container spacing={2}>
          {workspaces.map((workspace) => (
            <Grid item xs={12} sm={6} md={3} lg={2} key={workspace.id}>
              <WorkspaceItem
                workspace={workspace}
                openDialogAndGetWSId={(id: number) => {
                  setIsUpdateDialogOpen(true);
                  setUpdatingWorkspaceId(id);
                }}
                deleteHandler={deleteHandler}
              />
            </Grid>
          ))}
        </Grid>
        <Box marginTop={80}>
          <Button
            variant="contained"
            onClick={() => {
              AuthService.removeToken();
              navigate("/login");
            }}
          >
            LOG OUT
          </Button>
        </Box>
      </Box>

      <WorkspaceDialogForm
        formTitle="Create Workspace"
        buttonText="CREATE"
        isOpen={isCreateDialogOpen}
        setIsOpen={setIsCreateDialogOpen}
        buttonClickHandler={createHandler}
        fieldsConfigs={[
          { name: "name", label: "Name", isRequired: true },
          {
            name: "subdomain",
            label: "Subdomain",
            isRequired: true,
          },
        ]}
        changeHandler={changeHandler}
        suggestedSubdomains={suggestedSubdomains}
      />

      <WorkspaceDialogForm
        formTitle="Update Workspace"
        buttonText="UPDATE"
        isOpen={isUpdateDialogOpen}
        setIsOpen={setIsUpdateDialogOpen}
        buttonClickHandler={updateHandler}
        fieldsConfigs={[{ name: "name", label: "Name", isRequired: true }]}
      />
    </>
  );
};

export default Workspace;
