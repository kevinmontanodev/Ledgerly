'use server'
import { ProjectDTO } from "../types/project.types";
import { projectService } from "../container";

export async function saveProject(projectData: ProjectDTO){
    return await projectService.saveProject(projectData)
}

export async function deleteProject(projectId:string, userId:string) {
    return await projectService.deleteProject(projectId, userId)
}