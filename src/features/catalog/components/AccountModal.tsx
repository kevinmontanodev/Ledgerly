import { useAccountStore } from "@/features/catalog/store/account.store";
import { RefObject, useEffect, useState } from "react";
import { PrettySelect } from "@/components/ui/PrettySelect";
import { Button } from "@/components/ui/Button";
import { getAccountTypes } from "@/server/actions/account.actions";
import { AccountDTO } from "@/server/dto/account.dto";
import { SelectItems } from "@/shared/shared";
import { DialogModal } from "@/components/ui/DialogModal";

export function AccountModal({modalRef, closeModal, onSubmit}: {modalRef: RefObject<HTMLDialogElement | null>, closeModal: () => Promise<void>, onSubmit: (accountData: AccountDTO) => Promise<void>}){
    const {startDraft, draftAccount, updateDraft, discardDraft} = useAccountStore()
    const [accountTypesSelect, setAccountTypesSelect] = useState<SelectItems[]>([])

    useEffect(() => {
        const getTypes = async () => {
            const accountTypes = await getAccountTypes()

            const selectItems = accountTypes.map(acct => ({
                label: acct.name,
                id: acct.id
            }))

            return selectItems
        }

        getTypes().then((items) => setAccountTypesSelect(items))
    }, [])

    useEffect(() => {
           if (!draftAccount) {
               startDraft()
           }
    }, [draftAccount, startDraft])

    return (
        <DialogModal
        closeModal={closeModal}
        modalRef={modalRef}>
            <div className="w-full">
                <form className="p-4"
                onSubmit={(e) => {
                    e.preventDefault()
                    if (draftAccount)
                    onSubmit(draftAccount)
                }}>
                    <div className="grid grid-cols-3 gap-2">
                        <fieldset className="col-span-1">
                            <label htmlFor="accountCode"  className="text-xs font-semibold">Codigo <span className="text-red-500">*</span></label>
                            <input type="text" placeholder="1010"
                            className=" bg-zinc-100 p-2 rounded-xl w-full outline-none"
                            value={draftAccount?.code ?? ""}
                            id="accountCode"
                            onChange={(e) => updateDraft({code: e.target.value})} />
                        </fieldset>

                        <fieldset>
                            <label htmlFor="acountName"  className="text-xs font-semibold">Nombre <span className="text-red-500">*</span></label>
                            <input type="text" placeholder="Efectivo"
                            className="col-span-2 bg-zinc-100 p-2 rounded-xl outline-none"
                            value={draftAccount?.name ?? ""}
                            onChange={(e) => updateDraft({name: e.target.value})} />
                        </fieldset>
                    </div>

                    <fieldset className="my-2">
                        <label htmlFor="" className="text-xs font-semibold">Tipo de cuenta <span className="text-red-500">*</span></label>
                        <PrettySelect onSelect={(e) => {
                            const item = accountTypesSelect.find(item => item.id === e)

                            updateDraft({accountTypeId: item?.id, typeName: item?.label })
                        }} value={draftAccount?.accountTypeId ?? "select type"}
                        className="w-full"
                        placeHolder="Seleccione un tipo"
                        selectItems={accountTypesSelect}
                        >

                        </PrettySelect>
                    </fieldset>

                    <fieldset>
                        <label htmlFor="accountDescription"  className="text-xs font-semibold">Descripcion</label>
                        <textarea name="accountDescription" id="accountDescription"
                        className="w-full bg-zinc-100 rounded-2xl resize-none h-24 p-2 outline-none"
                        placeholder="Se usa cuando hay un movimiento de dinero en efectivo"
                        value={draftAccount?.description ?? ""}
                        onChange={(e) => updateDraft({description: e.target.value})}
                        >

                        </textarea>
                    </fieldset>

                    <fieldset className="flex justify-end gap-2 mt-1">
                        <Button onClick={() => {
                            discardDraft()
                            closeModal()
                        }} variant="SECONDARY"
                        className="px-4 py-2 text-sm">Cancelar</Button>

                        <Button variant="PRIMARY" type="submit" className="px-4 py-2 text-sm">
                            Guardar
                        </Button>
                    </fieldset>
                </form>
            </div>
        </DialogModal>
    )
}                                        