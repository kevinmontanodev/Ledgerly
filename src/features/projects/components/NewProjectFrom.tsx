import { Button } from "@/components/ui/Button"
import { DialogModal } from "@/components/ui/DialogModal"
import { ProjectDTO } from "@/server/types/project.types"
import { RefObject, SetStateAction } from "react"

interface Props {
    modalRef: RefObject<HTMLDialogElement | null>
    handleSubmit: () => Promise<void>
    closeToDown: () => Promise<void>
    setNewProject: (value: SetStateAction<ProjectDTO>) => void
    newProject: ProjectDTO
    initialNewProjectData: ProjectDTO
}

export function NewProjectForm({modalRef, closeToDown, handleSubmit, setNewProject, newProject, initialNewProjectData}:Props){
    return (
        <DialogModal modalRef={modalRef} closeModal={closeToDown}>
            <form className="p-4"
                onSubmit={(e) => {
                    e.preventDefault()
                    handleSubmit()
                }}
            >
                <h2 className="font-semibold text-xl mb-1">Nuevo Proyecto</h2>
            
                <fieldset>
                    <label htmlFor="projectName" className="text-sm">Nombre del Proyecto <span className="text-red-600 font-semibold">*</span></label>
                    <input type="text" id="projectName" className="p-2 bg-zinc-100 outline-none w-full rounded-2xl" required
                        value={newProject.name}
                        onChange={(e) => {
                            setNewProject((prev) => ({
                                ...prev,
                                name: e.target.value
                            }))
                        }} 
                    />    
                </fieldset>

                <fieldset className="mt-2">
                    <label htmlFor="projectName" className="text-sm">Descripcion del Proyecto</label>
                    <input type="text" id="projectName" className="p-2 bg-zinc-100 outline-none w-full rounded-2xl" 
                        value={newProject.description ?? ''}
                        onChange={(e) => {
                            setNewProject((prev) => ({
                                ...prev,
                                description: e.target.value
                            }))
                        }}
                    />
                </fieldset>
                    
                <fieldset className="flex justify-end gap-2 pt-3">
                    <Button variant="SECONDARY" type="button" className="px-3 py-1"
                        onClick={() => {
                            closeToDown()
                            setNewProject(initialNewProjectData)
                        }}
                    >
                        Cancelar
                    </Button>
                    <Button variant="PRIMARY" type="submit" className="px-3 py-1">
                        Guardar
                    </Button>
                </fieldset>
            </form>
        </DialogModal>
    )
}