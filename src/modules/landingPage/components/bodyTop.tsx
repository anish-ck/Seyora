import { Button } from '@/components/ui/button'
import { Bot, IdCard, MoveRight, Siren } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const BodyTop = () => {
  return (
    <div className="md:flex-row flex h-fit flex-col mb-16 w-full justify-between px-4">
      <div className="pl-10 pt-16 flex flex-col text-center md:text-start h-fit">
        <h1 className="text-2xl md:text-3xl pb-7 lg:text-5xl font-extrabold leading-tight">
          Empower Safe Travel
          <br />
          with <span className="text-blue-600">Blockchain</span> NFTs
          <br />& <span className="text-blue-600">AI</span> Alerts
        </h1>
        <div className="flex flex-col gap-y-3  items-start font-medium max-w-lg">
          <div
            className="flex justify-center gap-4 items-center  font-medium 
  transition-all duration-500 text-slate-600 hover:text-slate-900 hover:tracking-wide"
          >
            <IdCard />
            <p>Trusted NFT IDs for secure tourist verification.</p>
          </div>
          <div
            className="flex justify-center gap-4 items-center  font-medium 
  transition-all duration-500 text-slate-600 hover:text-slate-900 hover:tracking-wide"
          >
            <Bot />
            <p>AI-driven alerts and geo-fencing for real-time safety.</p>
          </div>
          <div
            className="flex justify-center gap-4 items-center  font-medium 
  transition-all duration-500 text-slate-600 hover:text-slate-900 hover:tracking-wide"
          >
            <Siren />
            <p>Panic button with multilingual access for all travelers.</p>
          </div>
        </div>

        <div className="flex justify-center md:justify-start gap-4 mt-4">
            <Link href="/dashboard">
          <Button className="px-5 py-3 lg:px-6 lg:py-4  md:text-2xl  font-medium text-white bg-blue-600 hover:bg-blue-700 hover:font-bold transition-all rounded-none duration-300 cursor-pointer">
            Dashboard
          </Button>
            </Link>
          <Button
            variant="outline"
            className="px-5 py-3 lg:px-6 lg:py-4 md:text-lg rounded-none font-medium text-blue-600 border-blue-600 hover:bg-blue-50 hover:font-bold transition-all duration-300 flex gap-2 items-center cursor-pointer"
          >
            <MoveRight className="w-5 h-5 lg:w-6 lg:h-6" />
            How it works
          </Button>
        </div>
      </div>
      <div className="w-1/2 flex justify-center md:justify-end">
        <img
          src="/landingCard.png" // Replace with your image path
          alt="Tourist exploring India"
          className="rounded-lg hover:scale-105 object-cover transition-all duration-300 w-[550px] h-[400px] shadow-lg"
        />
      </div>
    </div>
  )
}

export default BodyTop