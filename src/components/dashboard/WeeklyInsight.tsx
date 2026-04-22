import { Tip } from "../icons/Tip"

export function WeeklyInsight(){
    return (
        <div className="text-white bg-indigo-700 p-3 md:p-6 rounded-xl flex flex-col items-start h-full w-full">
            <span className="bg-white/40 p-2 rounded-full block">
                <Tip style="w-8 h-8"/>
            </span>
            <h3 className="text-md md:text-lg font-semibold">Weekly Insight</h3>
            <p className="opacity-80 text-sm">
                Your expenses increased this week by 14% compared last week. Most of the shift
                is in Consuling Fees
            </p>
            <button className="uppercase border-b-2 border-white/20 mt-2 text-sm">
                view breakdown
            </button>
        </div>
    )
}