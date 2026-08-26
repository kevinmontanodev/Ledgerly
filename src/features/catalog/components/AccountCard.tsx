import { AccountDTO } from "@/server/dto/account.dto"
import { Edit } from "@/components/icons/Edit"
import { CardWrapper } from "@/components/ui/CardWrapper"
import { CategoryIcon } from "@/components/ui/CategoryIcon"

export function AccountCard({account, startDraft, openModal}: {account: AccountDTO, startDraft: (acc?: AccountDTO | undefined) => void, openModal: (originElement: HTMLElement | null) => Promise<void>}) {
    return (
        <CardWrapper styles="flex items-start justify-between p-6 h-full">
            <div className="flex gap-2 items-start">
                
                <CategoryIcon className="p-4 rounded-xl" categoryName={account.typeName} accountIcons />
                <div>
                    <p className="text-sm md:text-xl font-semibold">{account.name}</p>
                    <span className="text-xs md:text-sm text-zinc-600 font-semibold">{account.code} - {account.typeName}</span>
                </div>
            </div>

            {account.source !== 'SYSTEM' && (<button className="cursor-pointer" onClick={(e) => {
                startDraft(account)
                openModal(e.currentTarget)
            }}
            ><Edit/></button>)}

            {account.source === 'SYSTEM' && (<span className="text-xs uppercase bg-indigo-700/40 text-indigo-700 py-1 px-4 rounded-xl font-semibold hidden lg:block">base</span>)}
        </CardWrapper>
    )
}