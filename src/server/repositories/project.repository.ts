import {prisma} from "@/lib/prisma"
import { IProjectRepository } from "../interfaces/repositories"
import { ProjectDTO } from "../types/project.types"
import { projectSelect } from "./records/payload.records"

export class ProjectRepository implements IProjectRepository {

    async save (projectData: ProjectDTO){
        const {id, name, description, userId} = projectData

        const exist = await prisma.project.findUnique({
            where: {id}
        })

        if (exist){
            return prisma.project.update({
                where: {id},
                data : { name, description, userId },
                select: projectSelect
            })
        }

        return prisma.project.create({
            data : {id, name, description, userId},
            select: projectSelect
        })
    }

    async findById(id: string) {
        return prisma.project.findUnique({
            where: { id },
            select: projectSelect
        })
    }

    async findAllByUserId(userId: string) {
        return prisma.project.findMany({
            where: { userId },
            select: projectSelect
        })
    }

    async deleteProject(projectId: string, userId:string){
        return prisma.project.delete({
            where: {id: projectId, userId },
            select: projectSelect
        })
    }

}