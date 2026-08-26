import { getSelectOptions } from "@/server/actions/account.actions";
import { SelectOptionAccount } from "@/server/repositories/records/payload.records";
import { create } from "zustand";


type AccountOptionStore = {
    options: SelectOptionAccount[];
    loaded: boolean;

    load: (projectId: string, userId:string) => Promise<void>;
    add: (account: SelectOptionAccount) => void;
    update: (account: SelectOptionAccount) => void;
    remove: (id: string) => void;
    clear: () => void;
}

export const useAccountOptionStore = create<AccountOptionStore>((set, get) => ({
    options: [],
    loaded: false,

    load: async (projectId) => {
        if (get().loaded) return

        const options = await getSelectOptions(projectId)

        set({
            options,
            loaded: true
        })
    },

    add: async (account) => {
        set(prev => ({
            options: [...prev.options, account]
        }))
    },

    update(account) {
        set({
            options: this.options.map(acc => acc.id === account.id ? account : acc)
        })
    },

    remove(id) {
        set(state => (
            {options: state.options.filter(acc => acc.id !== id)}
        ))
    },

    clear: () => {
        set({
            options: [],
            loaded: false
        })
    }
}))
