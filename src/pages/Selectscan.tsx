"use client"

import { Button } from "@/components/ui/Button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import {
  TypographyH1,
  TypographyH2,
  TypographyP,
  TypographyMuted,
  TypographySmall,
} from "@/components/ui/typography"

import { Info, Search, Shield, Gavel, Puzzle, Key } from "lucide-react"

const Selectscan = () => {
  return (
    <div className="min-h-screen bg-zinc-900 p-12 flex flex-col items-center font-sans space-y-6">
      <div className=" text-center">
        <TypographyH1 className="text-gray-100">Select Scan Type</TypographyH1>
        <TypographyP className="text-gray-400 text-sm">
          Choose the type of scan to run on your repository
        </TypographyP>
      </div>

      <div className="bg-zinc-800 p-8 rounded-xl shadow-lg space-y-8 border border-gray-700 w-full max-w-5xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">

          {/* Basic Scan */}
          <div className="bg-zinc-900 hover:bg-zinc-800 border border-gray-700 rounded-lg p-6 text-white space-y-2">
            <div className="flex items-center gap-4">
              <Shield className="text-gray-500" />
              <div>
                <TypographyH2 className="text-gray-100 text-xl">
                  Basic Scan (Recommended)
                </TypographyH2>
                <TypographyMuted className="text-gray-400">
                  Covers common vulnerabilities and basic code checks.
                </TypographyMuted>
              </div>
            </div>
            <div className="pl-12 text-sm text-gray-400">
              <ul className="list-disc ml-4">
                <li>Vulnerability scanning</li>
                <li>Dependency check</li>
                <li>Basic code quality</li>
              </ul>
            </div>
          </div>

          {/* Deep Static Analysis */}
          <div className="bg-zinc-900 hover:bg-zinc-800 border border-gray-700 rounded-lg p-6 text-white space-y-2">
            <div className="flex items-center gap-4">
              <Search className="text-gray-500" />
              <div>
                <TypographyH2 className="text-gray-100 text-xl">
                  Deep Static Analysis
                </TypographyH2>
                <TypographyMuted className="text-gray-400">
                  In-depth static code analysis and architecture insights.
                </TypographyMuted>
              </div>
            </div>
            <div className="pl-12 text-sm text-gray-400">
              <ul className="list-disc ml-4">
                <li>Advanced vulnerability detection</li>
                <li>Code metrics</li>
                <li>Architecture analysis</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Toggle Options */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {[
            { id: "secrets", icon: <Key className="text-gray-400" />, label: "Secrets Detection" },
            { id: "dependencies", icon: <Puzzle className="text-gray-400" />, label: "Dependencies Scan" },
            { id: "license", icon: <Gavel className="text-gray-400" />, label: "License Compliance" }
          ].map(({ id, icon, label }) => (
            <div
              key={id}
              className="flex items-center justify-between bg-zinc-900 p-4 rounded-lg border border-gray-700"
            >
              <div className="flex items-center gap-3 text-white">
                {icon}
                <Label htmlFor={id} className="text-gray-100">
                  {label}
                </Label>
              </div>
              <Switch id={id} />
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="flex justify-between items-center pt-4 border-t border-gray-700 text-sm text-gray-400">
          <div className="flex items-center gap-2">
            <Info className="w-4 h-4 text-gray-500" />
            <TypographySmall className="text-gray-400">
              Scan results will be available in the Security tab once completed.
            </TypographySmall>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-gray-500 text-xs">Est. Time: 5–10 mins</span>
            <Button className="bg-gray-700 hover:bg-gray-600 text-white">
              Start Scan
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Selectscan;
