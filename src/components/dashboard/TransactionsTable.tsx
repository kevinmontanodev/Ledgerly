import { formatAmount } from "@/utils/amountFormatter";
import { CardWrapper } from "../ui/CardWrapper";

interface Transaction {
    id: string,
    date: string,
    account: string,
    description: string,
    type: 'DEBIT' | 'CREDIT',
    amount: string,
}

export function TransactionsTable(){
    const transactions = [
  {
    id: '1',
    date: 'Oct 24, 2023',
    account: 'operating cash',
    description: 'Cloud infraestructure Subscription',
    type: 'DEBIT',
    amount: 1250
  },
  {
    id: '2',
    date: 'Oct 23, 2023',
    account: 'account recevable',
    description: 'Client Payment - Project Delta',
    type: 'CREDIT',
    amount: 12400
  },
  {
    id: '3',
    date: 'Oct 22, 2023',
    account: 'Payroll Accrual',
    description: 'Consultancy Fees - Q4 Audit',
    type: 'DEBIT',
    amount: 4800
  },
  {
    id: '4',
    date: 'Oct 21, 2023',
    account: 'marketing fund',
    description: 'Social Media Campaign Reallocation',
    type: 'DEBIT',
    amount: 2100
  },
]
    return (
        <CardWrapper styles="p-3 md:p-6 w-full overflow-hidden shadow-sm border border-zinc-100">
            <div className="pb-4">
                <h3 className="text-lg md:text-2xl font-semibold">Recent Transactions</h3>
                <p className="text-zinc-500 text-xs md:text-base">Real-time ledger entries across all accounts</p>
            </div>
            <div className="w-full">
                <table className="w-full">
                    <thead className="bg-zinc-50">
                        <tr className="text-xs md:text-sm">
                            <th className="py-3 md:px-4 font-medium hidden md:table-cell">DATE</th>
                            <th className="py-3 md:px-4 font-medium">ACCOUNT</th>
                            <th className="py-3 md:px-4 font-medium hidden lg:table-cell">DESCRIPTION</th>
                            <th className="py-3 md:px-4 font-medium text-center">DEBIT</th>
                            <th className="py-3 md:px-4 font-medium text-center">CREDIT</th>
                        </tr>
                    </thead>
                    <tbody>
                        {transactions.map(t => (
                            <tr className="border-b border-zinc-200 last:border-0 text-xs md:text-sm" key={t.id}>
                                <td className="py-4 md:px-4 text-center text-sm whitespace-nowrap hidden md:table-cell">{t.date}</td>
                                <td>
                                    <span className="p-1 rounded-md uppercase text-xs bg-blue-400 text-blue-800">
                                        {t.account}
                                    </span>
                                </td>
                                <td className="text-zinc-600 text-shadow-mauve-100 px-2 md:px-4 truncate hidden lg:table-cell">{t.description}</td>
                                <td className="py-4 md:px-4 text-center font-mono text-sm">
                                    {t.type === 'DEBIT' ? `${formatAmount(t.amount)}` : '-'}
                                </td>
                                <td className="py-4 md:px-4 text-center font-mono text-sm">
                                    {t.type === 'CREDIT' ? `${formatAmount(t.amount)}` : '-'}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </CardWrapper>
    )
}