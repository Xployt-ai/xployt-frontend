"use client"

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Switch } from "@/components/ui/switch";
import { Check, Clock, Shield, Zap, Cpu } from "lucide-react";

export default function SecurityScanUI() {
  const [enableAI, setEnableAI] = useState(false);

  return (
    <div className="min-h-screen p-12 flex flex-col items-center font-sans bg-gray-950">
      <div className="w-full max-w-6xl space-y-10">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-200 mb-2">
            Select Scan Type
          </h1>
          <p className="text-gray-400 text-base">
            Choose the security scan that best fits your needs
          </p>
        </div>

        {/* Recommended Templates */}
        <section>
          <h2 className="text-lg font-semibold text-gray-200 mb-4">
            Recommended Templates
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Full Scan */}
            <div className="hover:bg-gray-900 border border-gray-700 rounded-xl shadow-lg transition p-6 bg-transparent">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-gray-200 text-xl font-semibold">
                  Full Scan
                </h3>
                <span className="inline-block bg-gray-600 text-gray-200 rounded px-2 py-1 text-xs">
                  Recommended
                </span>
              </div>
              <p className="text-gray-400 mb-4">
                Comprehensive security analysis with AI assistance
              </p>
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-gray-400 text-sm font-medium">
                  <Check className="w-4 h-4 filter grayscale opacity-75" /> Static Analysis
                </div>
                <div className="flex items-center gap-2 text-gray-400 text-sm font-medium">
                  <Check className="w-4 h-4 filter grayscale opacity-75" /> Dynamic Testing
                </div>
                <div className="flex items-center gap-2 text-gray-400 text-sm font-medium">
                  <Cpu className="w-4 h-4 filter grayscale opacity-75" /> AI-Powered Review
                </div>
                <Button className="w-full bg-gray-300 text-gray-900 hover:bg-gray-100 mt-4 rounded-md font-semibold transition">
                  Select Template
                </Button>
              </div>
            </div>

            {/* No AI Scan */}
            <div className="hover:bg-gray-900 border border-gray-700 rounded-xl shadow-lg transition p-6 bg-transparent">
              <div className="mb-4">
                <h3 className="text-gray-200 text-xl font-semibold">
                  No AI Scan
                </h3>
              </div>
              <p className="text-gray-400 mb-4">
                Traditional security scanning without AI integration
              </p>
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-gray-400 text-sm font-medium">
                  <Check className="w-4 h-4 filter grayscale opacity-75" /> Static Analysis
                </div>
                <div className="flex items-center gap-2 text-gray-400 text-sm font-medium">
                  <Check className="w-4 h-4 filter grayscale opacity-75" /> Dynamic Testing
                </div>
                <div className="flex items-center gap-2 text-gray-400 text-sm font-medium">
                  <Check className="w-4 h-4 filter grayscale opacity-75" /> Manual Review
                </div>
                <Button className="w-full bg-gray-300 text-gray-900 hover:bg-gray-100 mt-4 rounded-md font-semibold transition">
                  Select Template
                </Button>
              </div>
            </div>

            {/* Basic Scan */}
            <div className="hover:bg-gray-900 border border-gray-700 rounded-xl shadow-lg transition p-6 bg-transparent">
              <div className="mb-4">
                <h3 className="text-gray-200 text-xl font-semibold">
                  Basic Scan
                </h3>
              </div>
              <p className="text-gray-400 mb-4">
                Quick security check for basic vulnerabilities
              </p>
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-gray-400 text-sm font-medium">
                  <Check className="w-4 h-4 filter grayscale opacity-75" /> Static Analysis
                </div>
                <div className="flex items-center gap-2 text-gray-400 text-sm font-medium">
                  <Check className="w-4 h-4 filter grayscale opacity-75" /> Basic Testing
                </div>
                <div className="flex items-center gap-2 text-gray-400 text-sm font-medium">
                  <Check className="w-4 h-4 filter grayscale opacity-75" /> Quick Report
                </div>
                <Button className="w-full bg-gray-300 text-gray-900 hover:bg-gray-100 mt-4 rounded-md font-semibold transition">
                  Select Template
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Individual Scan Options */}
        <section className="space-y-4">
          <h2 className="text-lg font-semibold text-gray-200 mb-2">
            Individual Scan Options
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Static Scan */}
            <div className="border border-gray-700 rounded-xl shadow-lg p-6 bg-transparent">
              <div className="pb-4 flex items-center gap-4">
                <Shield className="w-7 h-7 filter grayscale opacity-75" />
                <div>
                  <h4 className="text-gray-200 text-lg font-semibold">
                    Static Scan
                  </h4>
                  <p className="text-gray-400">
                    Code analysis for security vulnerabilities
                  </p>
                </div>
              </div>
              <div className="space-y-3 pt-0">
                <div className="flex items-center text-gray-400 text-sm">
                  <Clock className="w-4 h-4 mr-2 filter grayscale opacity-75" /> Duration: 5-10 min
                </div>
                <div className="flex items-center text-gray-400 text-sm">
                  <Zap className="w-4 h-4 mr-2 filter grayscale opacity-75" /> Resource: Low
                </div>
              </div>
            </div>

            {/* LLM Deep Dive */}
            <div className="border border-gray-700 rounded-xl shadow-lg p-6 bg-transparent">
              <div className="pb-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Cpu className="w-7 h-7 filter grayscale opacity-75" />
                  <div>
                    <h4 className="text-gray-200 text-lg font-semibold">
                      LLM Deep Dive
                    </h4>
                    <p className="text-gray-400">
                      AI-powered security assessment
                    </p>
                  </div>
                </div>
                <span className="bg-gray-500 text-gray-100 rounded px-2 py-1 text-xs">
                  Pro
                </span>
              </div>
              <div className="space-y-3 pt-0">
                <div className="flex items-center text-gray-400 text-sm">
                  <Clock className="w-4 h-4 mr-2 filter grayscale opacity-75" /> Duration: 15-20 min
                </div>
                <div className="flex items-center text-gray-400 text-sm">
                  <Zap className="w-4 h-4 mr-2 filter grayscale opacity-75" /> Resource: Medium
                </div>
              </div>
            </div>

            {/* Dynamic Scan */}
            <div className="border border-gray-700 rounded-xl shadow-lg p-6 bg-transparent">
              <div className="pb-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Zap className="w-7 h-7 filter grayscale opacity-75" />
                  <div>
                    <h4 className="text-gray-200 text-lg font-semibold">
                      Dynamic Scan
                    </h4>
                    <p className="text-gray-400">
                      Runtime security testing
                    </p>
                  </div>
                </div>
                <span className="bg-gray-500 text-gray-100 rounded px-2 py-1 text-xs">
                  Pro
                </span>
              </div>
              <div className="space-y-3 pt-0">
                <div className="flex items-center text-gray-400 text-sm">
                  <Clock className="w-4 h-4 mr-2 filter grayscale opacity-75" /> Duration: 20-30 min
                </div>
                <div className="flex items-center text-gray-400 text-sm">
                  <Zap className="w-4 h-4 mr-2 filter grayscale opacity-75" /> Resource: High
                </div>
              </div>
            </div>

            {/* Enable AI Integration */}
            <div className="border border-gray-700 rounded-xl shadow-lg p-6 bg-transparent">
              <div className="pb-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Cpu className="w-7 h-7 filter grayscale opacity-75" />
                  <div>
                    <h4 className="text-gray-200 text-lg font-semibold">
                      Enable AI Integration
                    </h4>
                    <p className="text-gray-400">
                      Enhance results with LLM-powered analysis
                    </p>
                  </div>
                </div>
                <Switch
                  checked={enableAI}
                  onCheckedChange={setEnableAI}
                  className="data-[state=checked]:bg-gray-400"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Footer Button */}
        <div className="pt-6 flex justify-end border-t border-gray-700">
          <Button
            size="lg"
            className="bg-gray-300 hover:bg-gray-100 text-gray-900 font-semibold px-8 py-2 rounded-md shadow"
          >
            Start Scan
          </Button>
        </div>
      </div>
    </div>
  );
}
