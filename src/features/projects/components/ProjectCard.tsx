import { ArrowLeft } from "@/components/icons/ArrowLeft"
import { Delete } from "@/components/icons/Delete"
import { Edit } from "@/components/icons/Edit"
import { Button } from "@/components/ui/Button"
import { CardWrapper } from "@/components/ui/CardWrapper"
import { useTransactionStore } from "@/features/transactions/store/transaction.store"
import { ProjectDTO } from "@/server/types/project.types"
import { useCurrentProjectStore } from "@/store/useCurrentProjectStore"
import { useRouter } from "next/navigation"

interface Props {
    project:ProjectDTO
    edit: (project: ProjectDTO, origin: HTMLElement) => void
    remove: (projectId: string, userId: string) => Promise<void>
}

export function ProjectCard({project, edit, remove}: Props){

    const router = useRouter()
    const {setCurrentProject} = useCurrentProjectStore()
    const { setProjectId } = useTransactionStore()

    const handleNavigateToProject = () => {
        setCurrentProject({id: project.id, name: project.name})
        setProjectId(project.id)

        router.push(`/projects/${project.id}`)
    }

    return (
        <CardWrapper styles="p-4 flex justify-between group">
            <div>
                <h2 className="font-semibold">{project.name}</h2>
                <Button variant="CLEAN" onClick={handleNavigateToProject}>
                    <ArrowLeft styles="rotate-180"/>
                </Button>
            </div>
            <div className="flex flex-col gap-2 opacity-0 translate-y-4  group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                <button className="text-zinc-600 hover:text-zinc-900 cursor-pointer transition-all"
                onClick={(e) => edit(project, e.currentTarget)}>
                    <Edit/>
                </button>
                <button className="text-zinc-600 hover:text-red-600 cursor-pointer transition-all"
                onClick={() => remove(project.id, project.userId)}>
                    <Delete/>
                </button>
            </div>
        </CardWrapper>
    )
}