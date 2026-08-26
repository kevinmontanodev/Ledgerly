'use client'
import { ProjectDTO } from "@/server/types/project.types";
import { CardWrapper } from "@/components/ui/CardWrapper";
import { useViewTransitionModal } from "@/hooks/useViewTransitionModal";
import { useEffect, useState } from "react";
import { deleteProject, saveProject } from "@/server/actions/project.actions";
import {motion, AnimatePresence} from "framer-motion"
import { ProjectCard } from "./ProjectCard";
import { NewProjectButton } from "./NewPropjectButton";
import { NewProjectForm } from "./NewProjectFrom";

const userId = "cmpneztcp00054hwwz30x67zw"

export const initialNewProjectData : ProjectDTO = {
    id: crypto.randomUUID(),
    name: '',
    userId: userId,
    description: ''
}

export function ProjectsContainer({projectsDTO}:{projectsDTO:ProjectDTO[]}){
    const [projects, setProjects] = useState<ProjectDTO[]>([])
    const { modalRef, openModal, closeToDown} = useViewTransitionModal()
    const [newProject, setNewProject] = useState<ProjectDTO>(initialNewProjectData)
    const [loading, setLoading] = useState(false)

    const handleSubmit = async () => {
        const currentRef = modalRef.current
        const projectsCopy = projects

        const projectEdit = projects.find(p => p.id === newProject.id)

        const newProjects = projectEdit ? projects.map(p => p.id !== newProject.id ? p : ({
            ...p,
            name: newProject.name
        })) : [...projects, newProject]
        
        const currentProjectData = newProject

        setProjects(newProjects)
        setNewProject(initialNewProjectData)
        closeToDown()

        try {
            await saveProject(newProject)
        } catch {
            setNewProject(currentProjectData)
            setProjects(projectsCopy)
            openModal(currentRef)
        }
    }

    const editProject = (project:ProjectDTO, origin: HTMLElement) => {
        setNewProject(project)
        openModal(origin)
    }

    const handleRemoveProject = async (projectId:string, userId:string) => {
        const prevProjects = projects
        setProjects((prev) => prev.filter(p => p.id !== projectId))

        try {
            await deleteProject(projectId, userId)
        } catch {
            setProjects(prevProjects)
        }
    }

    useEffect(() => {
        const loadProjects = async () => {
            setLoading(true)

            setProjects(projectsDTO)
        }

        loadProjects().finally(() => {setLoading(false)})
    }, [projectsDTO])

    return (
         <main className="pt-16 px-4 pb-4">
            <div className="flex justify-between pb-1.5">
                <h3 className="text-2xl font-semibold my-2">Tus Projectos</h3>

                {projects.length > 0 && <NewProjectButton openModal={openModal}/>}
            </div>
            
            {projects.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-1.5">
                    <AnimatePresence>
                        {projects.map(p => (
                            <motion.div
                                key={p.id}
                                layout
                                initial={{opacity: 0, scale: 0.95}}
                                animate={{opacity: 1, scale: 1}}
                                exit={{opacity: 0, scale: 0.95}}
                                transition={{duration: 0.2}}
                            >
                                <ProjectCard project={p} edit={editProject} remove={handleRemoveProject} />
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            ) : (
                <AnimatePresence>
                    <CardWrapper styles="p-6 rounded-3xl flex items-center justify-center">
                        <div className="">
                            <p>
                                Aun no tienes ningun proyecto
                            </p>
                            
                            <NewProjectButton openModal={openModal} />
                        </div>
                    </CardWrapper>
                </AnimatePresence>
            )}

            <NewProjectForm
                modalRef={modalRef}
                initialNewProjectData={initialNewProjectData}
                newProject={newProject}
                setNewProject={setNewProject}
                closeToDown={closeToDown}
                handleSubmit={handleSubmit}
            />
        
        </main>
    )
}

