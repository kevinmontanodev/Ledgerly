'use client'

import { useTransactionPanel } from "@/store/useTransactionsPanel"
import { useRef } from "react"
import gsap from "gsap"
import { CustomEase } from "gsap/CustomEase"
import { useGSAP } from "@gsap/react"
import { ArrowLeft } from "./icons/ArrowLeft"
import { CardWrapper } from "./ui/CardWrapper"
import { IABrain } from "./icons/Ai"
import { Verified } from "./icons/Verified"
import { AddCircle } from "./icons/AddCircle"
import { RemoveCircle } from "./icons/RemoveCircle"
import { Mic } from "./icons/Mic"
import { PopUpModalWrapper } from "./ui/PopUpModalWrapper"
import { Tip } from "./icons/Tip"
import { Edit } from "./icons/Edit"

gsap.registerPlugin(CustomEase)
CustomEase.create("appleEase", "0.32, 0.72, 0, 1")

export function NewTransactionPanel(){
    const {showView, setCloseView} = useTransactionPanel()
    const ref = useRef(null)

    useGSAP(() => {
        if (showView === null) return

        if (showView){
            gsap.to(ref.current, 
                {yPercent: -100,
                    scale: 1,
                    duration: 0.8,
                    ease: "appleEase",
                    display: "block"
                },
                
            )
        } else {
            gsap.to(ref.current, {
                yPercent: 0, 
                scale: 0.2,
                duration: 0.6,
                ease: "power2.inOut"
            });
        }
    }, [showView])

    return (
        <div className="fixed inset-0 z-60 transform translate-y-full bg-zinc-100 shadow-xs overflow-y-auto" ref={ref}>
            <div className="max-w-7xl mx-auto flex flex-col gap-4 pb-6">
                <header className="flex p-4 bg-zinc-50 gap-2 items-center">
                    <button onClick={setCloseView} className="cursor-pointer">
                        <ArrowLeft styles="text-indigo-700 w-8 h-8"/>
                    </button>
                    <h1 className="text-lg md:text-2xl font-semibold">New Transaction</h1>
                </header>

                <div className="px-4 grid grid-cols-1 gap-4 max-w-xl mx-auto">
                    <CardWrapper styles="p-6">
                        <h4 className="font-semibold text-zinc-600 uppercase text-xs mb-4">Intuitive entry</h4>
                        <div className="relative">
                            <textarea name="transactionDesciption" id="transactionDesciption"
                            placeholder="Describe your transaction... (e.g. Bought inventory for $50 in cash)"
                            className="bg-zinc-200 resize-none w-full rounded-2xl min-h-28 outline-0 p-4 placeholder:text-zinc-500 text-sm md:text-base">
                            </textarea>
                            <div className="absolute bottom-4 right-4 text-black hover:text-indigo-700 cursor-pointer">
                                <Mic styles="" />
                            </div>
                        </div>
                        <button className="w-full text-center bg-indigo-600 hover:bg-indigo-800 text-white p-2.5 md:p-4 rounded-full mt-2 md:mt-4 cursor-pointer">Analyze</button>
                    </CardWrapper>

                    <CardWrapper styles="border-l-4 border-indigo-600 py-5 px-2 md:p-6 relative">
                        <div className="absolute bg-zinc-200 text-indigo-600 uppercase text-xs top-4 right-4 flex gap-1 rounded-full p-1 md:px-2.5 items-center">
                            <Verified/> <span className="font-semibold">98% confidence</span>
                        </div>
                        <div className="flex gap-3 pb-4 border-b border-zinc-100 ml-2 md:items-center flex-col md:flex-row">
                            <div className="bg-zinc-100 text-indigo-800 w-10 h-10 p-2 rounded-full">
                                <IABrain/>
                            </div>
                            <div>
                                <h4 className="uppercase font-semibold text-zinc-600 text-xs md:text-sm">Ai  intelligence</h4>
                                <h3 className="text-md md:text-xl font-semibold mt-1">Inventory Purchase Detected</h3>
                            </div>
                        </div>
                        <div className="md:py-4 pt-3 grid grid-cols-2 ml-2">
                            <div>
                                <span className="uppercase text-xs text-zinc-600 font-semibold">Suggested Account</span>
                                <p className="font-semibold text-md md:text-base">Inventory</p>
                            </div>
                            <div>
                                <span className="uppercase text-xs text-zinc-600 font-semibold">Classification</span>
                                <p className="font-semibold text-md md:text-base">Asset / Increase</p>
                            </div>
                        </div>
                    </CardWrapper>
                    <div className="bg-zinc-100 rounded-2xl shadow-md overflow-hidden">
                        <div className="p-6">
                            <h4 className="font-semibold text-md md:text-lg px-2">Ledger Preview</h4>
                        </div>
                        <div className="grid grid-cols-2">
                            <div className="flex flex-col gap-1 p-6 border-r border-zinc-50 bg-zinc-50">
                                <span className="text-indigo-700 uppercase font-semibold text-xs flex gap-2 items-center py-2"><AddCircle/> Debit</span>
                                <span className="font-semibold text-md md:text-base">Inventory</span>
                                <span className="text-xl md:text-3xl font-semibold text-indigo-700">$50.00</span>
                            </div>
                            <div className="flex flex-col gap-1 p-6 bg-white">
                                <span className="text-zinc-700 uppercase font-semibold text-xs flex gap-2 items-center py-2"><RemoveCircle/> credit</span>
                                <span className="font-semibold text-md md:text-base">Cash</span>
                                <span className="text-xl md:text-3xl text-zinc-700 font-semibold">$50.00</span>
                            </div>
                        </div>
                    </div>

                    <div className="p-6 rounded-2xl bg-indigo-200/20 flex gap-3 items-center">
                        <div className="py-4 px-2 bg-white rounded-xl text-indigo-700">
                            <Tip/>
                        </div>
                        <div>
                            <p className="text-xs text-blue-950/80 font-extrabold">This was recorded as a Debit because inventory is an Assest account. Increasing assets requires a debit entry.</p>
                        </div>
                    </div>

                    <div className="bg-zinc-50 p-6">
                        <h4 className="font-semibold text-md md:text-lg uppercase text-zinc-600">Manual adjustments</h4>
                        
                        <div className="mt-4">
                            <div className="grid grid-cols-2 gap-2 items-center">
                                <div className="p-4 rounded-lg bg-zinc-100 relative">
                                    <span className="text-xs text-zinc-500">Adjust Category</span>
                                    <p className="text-sm font-semibold">Inventory</p>
                                    <PopUpModalWrapper
                                        trigger={
                                            <Edit styles="w-5 h-5" />
                                        }

                                        triggerStyles="absolute bottom-2 right-2"

                                        content={
                                            <form action="" className="">
                                                <fieldset>
                                                    <label htmlFor="">Edit</label>
                                                    <input type="text" placeholder="como?" />
                                                </fieldset>
                                                <fieldset>
                                                    <label htmlFor="">Hola for you</label>
                                                    <input type="text" placeholder="Como?" />
                                                </fieldset>
                                            </form>
                                        }

                                        contentStyles="w-72 p-4 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-2xl"
                                    >

                                    </PopUpModalWrapper>
                                    
                                </div>
                                <div className="p-4 rounded-lg bg-zinc-100 relative">
                                    <span className="text-xs text-zinc-500">Payment Method</span>
                                    <p className="text-sm font-semibold">Cash</p>
                                    <button className="absolute bottom-2 right-2 cursor-pointer">
                                        <Edit styles="w-5 h-5" />
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-2 mt-6">
                            <button className="px-3 py-3 bg-zinc-300 hover:bg-zinc-400 rounded-full font-semibold">Cancel</button>
                            <button className="px-3 py-3 text-white bg-indigo-600 hover:bg-indigo-700 rounded-full font-semibold">Save Transaction</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}