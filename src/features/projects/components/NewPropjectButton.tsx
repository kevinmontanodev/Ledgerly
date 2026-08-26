import { Plus } from "@/components/icons/Plus";
import { Button } from "@/components/ui/Button";

export function NewProjectButton({openModal}:{openModal: (originElement: HTMLElement | null) => Promise<void>}){
    return (
        <div onClick={(e) => openModal(e.currentTarget)}>
            <Button variant="PRIMARY" className="px-4 py-2 flex gap-1 items-center mt-1">
                Crear un Proyecto
                <Plus/>
            </Button>
        </div>
    )
}