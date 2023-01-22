import { ApiService } from "./api.service";

class WorkspaceService {
  public async getWorkspaces() {
    const workspaces = await ApiService.get("/workspaces", true);
    return workspaces;
  }

  public async createWorkspace(data: any) {
    const newWorkspace = await ApiService.post("/workspaces", data, true);
    return newWorkspace;
  }
}

const workspaceService = new WorkspaceService();

export default workspaceService;
