"use client";

import { TransactionDraft, useTransactionStore } from "@/features/transactions/store/transaction.store";
import {motion, AnimatePresence} from "framer-motion"
import { AddCircle } from "@/components/icons/AddCircle";
import { Verified } from "@/components/icons/Verified";
import { Close } from "@/components/icons/Close";
import { RefObject, useEffect } from "react";
import { EntryFormRow } from "./EntryFormRow";
import { formatAmount } from "@/utils/amountFormatter";
import { Button } from "@/components/ui/Button";
import { PrettySelect } from "@/components/ui/PrettySelect";
import { useTransactionsForm } from "@/hooks/useTransactionsForm";
import { DialogModal } from "@/components/ui/DialogModal";
import { useAccountOptionStore } from "@/features/catalog/store/account.select.store";
import { useCurrentProjectStore } from "@/store/useCurrentProjectStore";

export interface TransactionFormProps {
    modalRef: RefObject<HTMLDialogElement | null>
    closeModal: () => Promise<void>
    onSubmit?: (tx: TransactionDraft) => Promise<void>
}

export function TransactionForm({modalRef, closeModal, onSubmit}: TransactionFormProps ) {
    const { discardDraft, saveDraft, updateDraft, draftTransaction, startDraft, addDraftEntry, updateDraftEntry, removeDraftEntry, setProjectId } = useTransactionStore();
    const {entries, totals, selectItems} = useTransactionsForm(draftTransaction)
    const {currentProject} = useCurrentProjectStore()
    const {load} = useAccountOptionStore()

    useEffect(() => {
        if (!draftTransaction) {
            startDraft()
        }

    }, [draftTransaction, startDraft])

    useEffect(() => {
        // to-do: get the user id from store 
        if (!currentProject) return
        const userId = 'cmr7z7erp00055jww5lu3pkwj'
        setProjectId(currentProject.id)
        load(currentProject.id, userId)

    }, [currentProject, load, setProjectId])


    const handleAddRow = async () => {
        addDraftEntry()
    }

    const handleRemove = (id: string) => {
        removeDraftEntry(id)
    }

    useEffect(() => {
        if (!modalRef.current) return
        const handler = (e: KeyboardEvent) => {
            if (e.key === "Escape"){
                e.preventDefault()
                closeModal()
            }
        }

        document.addEventListener('keydown', handler)

        return () => document.removeEventListener('keydown', handler)
    }, [modalRef, closeModal])

    return (
        <DialogModal closeModal={closeModal}
        className="md:w-md"
        modalRef={modalRef}>
            <motion.div
                initial={{ opacity: 0, filter: "blur(8px)" }}
                animate={{ opacity: 1, filter: "blur(0px)" }}
                transition={{ duration: 3, ease: "easeOut" }}
                className="w-full"
            >
                <button className="absolute top-3 right-3 cursor-pointer hover:rotate-180 transition-all duration-500" onClick={closeModal}>
                    <Close className="w-5 h-5"/>
                </button>
                <form onSubmit={(e) => {
                        e.preventDefault()
                        closeModal()
                        saveDraft()

                        if (onSubmit && draftTransaction){
                            onSubmit(draftTransaction)
                        }
                    }} 
                    className="w-full"
                >
                    <div className="p-4">
                        <h5 className="text-lg font-semibold">Transaccion</h5>
                        <p className="my-0 py-0 text-xs text-zinc-500">
                            Crea una entrada de libro diario
                        </p>

                        <div className="mt-2 relative">
                            <fieldset>
                                <label htmlFor="transationTitle" className="text-xs font-semibold">Titulo <span className="text-red-600">*</span></label>
                                <input type="text" placeholder="Title of transaction" 
                                    className="p-2 bg-indigo-300/20 rounded-lg text-xs w-full outline-none"
                                    id="transationTitle"
                                    value={draftTransaction?.title ?? ""}
                                    onChange={(e) => {
                                        updateDraft({title: e.target.value})
                                    }}
                                />
                            </fieldset>
                            <fieldset>
                                <label htmlFor="transactionDescription" className="text-xs font-semibold">Descripcion</label>
                                <textarea placeholder="Description of transaction" 
                                    className="w-full resize-none bg-indigo-300/20 mt-1 rounded-lg text-xs h-16 p-2 outline-none"
                                    value={draftTransaction?.description ?? ""}
                                    onChange={(e) => {
                                        updateDraft({description: e.target.value})
                                    }}
                                >
                                </textarea>
                            </fieldset>
                        </div>

                        <div className="grid grid-cols-2 gap-1 mb-1">
                            <fieldset className="w-full">
                                <label htmlFor="transactionDate" className="text-xs font-semibold">Fecha <span className="text-red-600">*</span></label>
                                <input
                                    type="date"
                                    value={draftTransaction?.date ?? ""}
                                    onChange={(e) =>
                                        updateDraft({
                                            date: e.target.value
                                        })
                                    }
                                    className="bg-indigo-300/10 rounded-md px-2 py-1.5 text-sm hover:cursor-pointer w-full"
                                />
                            </fieldset>

                            <fieldset className="w-full">
                                <label htmlFor="transactionType" className="text-xs font-semibold">Tipo Transaccion <span className="text-red-600">*</span></label>
                                <PrettySelect
                                    className="w-full rounded-md bg-indigo-300/10"
                                    selectItems={selectItems}
                                    value={draftTransaction?.categoryId}
                                    onSelect={(id) => {
                                        const selected = selectItems.find(s => s.id === id)
                                        updateDraft({categoryId: id, categoryName: selected?.label})
                                    }}
                                />
                            </fieldset>
                        </div>

                        <div className="py-1">
                            <div className="w-full flex justify-between uppercase text-zinc-600 font-semibold text-xs mb-2">
                                <span>Cuenta</span>
                                <span>Tipo</span>
                                <span className="pr-8">Monto</span>
                            </div>
                            <div className="flex flex-col gap-2">
                                <AnimatePresence>
                                    {entries.map(e => (
                                        <motion.div
                                            key={e.id}
                                            layout
                                            initial={{opacity: 0, scale: 0.95}}
                                            animate={{opacity: 1, scale: 1}}
                                            exit={{opacity: 0, scale: 0.95}}
                                            transition={{duration: 0.2}}
                                        >
                                            <EntryFormRow entry={e} update={updateDraftEntry} remove={handleRemove} />
                                        </motion.div>
                                    ))}
                                </AnimatePresence>
                                <Button 
                                    type="button"
                                    variant="CLEAN"
                                    className="p-2 w-full flex items-center justify-center gap-2 text-sm border-dashed border border-zinc-300 hover:scale-105 duration-300"
                                    onClick={handleAddRow}
                                >
                                    <AddCircle styles="w-4 h-4" /> Add line
                                </Button>
                            </div>
                        </div>
                    </div>

                    <div className="bg-zinc-100 p-4">
                        <div className="flex justify-between items-start">
                            {(totals.credit === 0 || totals.debit === 0) && <div></div>}
                            {(totals.credit > 0 || totals.debit > 0) && (<div className="flex flex-col gap-1">
                                {totals.balanced ? 
                                    <span key={totals.credit + totals.debit} className="appear text-green-600 bg-green-600/10 px-2 py-0.5 rounded-full flex items-center gap-2 uppercase font-semibold text-xs">
                                        <Verified styles="w-5 h-5" /> balanciado
                                    </span> : 
                                    <span key={totals.credit + totals.debit} className="appear text-red-600 bg-red-600/10 px-2 py-0.5 rounded-full flex items-center gap-2 uppercase font-semibold text-xs">
                                        <Close className="w-5 h-5"/> No balanciado
                                    </span>
                                }

                                <span key={`${totals.difference}-${draftTransaction?.id}`} className={`appear ${totals.difference > 0 ? 'text-green-600' : 'text-red-600'} pl-2 text-sm font-semibold`}>
                                    {!totals.balanced && 
                                        <>
                                            {formatAmount(totals.difference)}
                                        </>
                                    }
                                </span>
                            </div>)}
                            <div className="flex gap-3">
                                <div className="flex flex-col text-right">
                                    <span className="text-xs text-zinc-500 uppercase font-semibold">
                                        total debito
                                    </span>
                                    <span className="font-semibold text-lg">{formatAmount(totals.debit)}</span>
                                </div>
                                <div className="flex flex-col text-right">
                                    <span className="text-xs text-zinc-500 uppercase font-semibold">
                                        total credito
                                    </span>
                                    <span className="font-semibold text-lg">{formatAmount(totals.credit)}</span>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center justify-end pt-4 gap-2">
                            <Button 
                            variant="SECONDARY"
                            type="button" 
                            className="text-zinc-600 text-sm font-semibold bg-zinc-200 px-5 py-1.5 rounded-full" 
                            onClick={() => {
                                closeModal()
                                discardDraft()
                            }}>
                                Cancelar
                            </Button>
                            <Button 
                                disabled={!totals.balanced} 
                                variant="PRIMARY" 
                                className={`text-sm px-5 py-1.5 `}
                                type="submit"
                            >
                                Agregar
                            </Button>
                        </div>
                    </div>
                </form>
            </motion.div>
        </DialogModal>
    );
}


