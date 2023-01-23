import { ApiService } from "./api.service";
import { WorkspaceDto } from "./interfaces/workspaces.interface";

class WorkspaceService {
  public async getWorkspaces() {
    const workspaces: WorkspaceDto[] = await ApiService.get(
      "/workspaces",
      true
    );
    return workspaces;
  }

  public async createWorkspace(data: any) {
    const newWorkspace: WorkspaceDto = await ApiService.post(
      "/workspaces",
      data,
      true
    );
    return newWorkspace;
  }

  public async updateWorkspace(data: any) {
    const updatedWorkspace = await ApiService.patch(
      "/workspaces/" + data.id,
      data,
      true
    );
    return updatedWorkspace;
  }

  public async deleteWorkspace(workspaceId: number) {
    const deletedWorkspace = await ApiService.delete(
      "/workspaces/" + workspaceId,
      true
    );
    return deletedWorkspace;
  }
}

const workspaceService = new WorkspaceService();

export default workspaceService;
