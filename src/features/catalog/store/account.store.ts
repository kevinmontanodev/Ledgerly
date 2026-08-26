import { AccountDTO } from "@/server/dto/account.dto"
import { create } from "zustand"

type AccountStore = {
    accounts: AccountDTO[]
    draftAccount: AccountDTO | null
    loadAccounts: (acc: AccountDTO[]) => void
    startDraft: (acc?: AccountDTO) => void
    updateDraft: (data: Partial<AccountDTO>) => void
    removeAccount: (id:string) => void,
    restoreAccount: (data: AccountDTO) => void
    getAccountById: (id:string) => AccountDTO | undefined

    
    saveDraft: () => void
    discardDraft: () => void

    reset: () => void
}

export const useAccountStore = create<AccountStore>((set, get) => ({
	accounts: [],
	draftAccount: null,

	getAccountById: (id) => {
		return get().accounts.find((acc) => acc.id === id)
	},

	startDraft: (acc) => {
		const base = acc ?? {
			id: crypto.randomUUID(),
			name: "",
			accountTypeId: "",
			source: 'USER',
			description: "",
			code: "",
			projectId: ''
		}

		set({
			draftAccount: JSON.parse(JSON.stringify(base))
		})
  	},

	updateDraft: (data: Partial<AccountDTO>) =>
		set(state => {
			if (!state.draftAccount) return state
	
			return {
				draftAccount: {
					...state.draftAccount,
					...data
				}
			}
    }),

    saveDraft: () =>
		set(state => {
			const draft = state.draftAccount
			if (!draft) return state

			const exists = state.accounts.some(t => t.id === draft.id)

			return {
				accounts: exists
					? state.accounts.map(t =>
						t.id === draft.id ? draft : t
					)
					: [...state.accounts, draft],

				draftAccount: null
			}
	}),

	restoreAccount: (data)  => {
		set(state => (
			{accounts: state.accounts.map(t =>
				t.id === data.id ? data : t
			)}
		))
	},

    removeAccount: (id) => {
		set(state => (
			{accounts: state.accounts.filter(acc => acc.id !== id && acc.source !== 'SYSTEM')}
		))
    },

    discardDraft: () => set({ draftAccount: null }),

	loadAccounts: (acc: AccountDTO[]) => {
		set({
			accounts: acc
		})
	},

	reset: () => {
		set({
			accounts: [],
			draftAccount: null
		})
	},
}))