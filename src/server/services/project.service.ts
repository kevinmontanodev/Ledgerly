import { IProjectRepository } from "../interfaces/repositories"
import { ProjectDTO } from "../types/project.types"

export class ProjectService {
    constructor(private readonly repository: IProjectRepository){}

    async getAllProjectsByUserId(userId:string) {
        return await this.repository.findAllByUserId(userId)
    }

    async getProjectById(projectId:string) {
        return await this.repository.findById(projectId)
    }

    async saveProject(projectData: ProjectDTO){
        return await this.repository.save(projectData)
    }

    async deleteProject(projectId:string, userId: string){
        return await this.repository.deleteProject(projectId, userId)
    }
}