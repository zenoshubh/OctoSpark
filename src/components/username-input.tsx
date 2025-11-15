"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Github, Zap } from "lucide-react"
import Image from "next/image"

interface UsernameInputProps {
  username: string
  onUsernameChange: (username: string) => void
  onSearch: () => void
  showSignInHint?: boolean
  disabled?: boolean
  placeholder?: string
}

export function UsernameInput({
  username,
  onUsernameChange,
  onSearch,
  showSignInHint = false,
  disabled = false,
  placeholder = "Enter GitHub username"
}: UsernameInputProps) {
  return (
    <div className="flex flex-col items-center justify-center py-8 space-y-8">
      <div className="text-center space-y-4 max-w-2xl">
        <div className="flex justify-center mb-2">
          <div className="w-20 h-20 overflow-hidden relative">
            <Image
              src="/OctoSpark_Final.png"
              alt="OctoSpark Logo"
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>
        <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
          Reveal the Spark
        </h1>
        <p className="text-md text-gray-400">
          Enter a GitHub username to analyze their developer journey, measure contribution metrics, and uncover insights that reflect their real impact on open source.
          
        </p>
      </div>

      <Card className="w-full max-w-md bg-gray-900/50 backdrop-blur-xl border-gray-700/50">
        <CardContent className="pt-6">
          <div className="flex space-x-2">
            <Input
              type="text"
              placeholder={placeholder}
              value={username}
              onChange={(e) => onUsernameChange(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && onSearch()}
              className="h-12 bg-gray-800/50 border-gray-600 text-white"
            />
            <Button
              onClick={onSearch}
              disabled={disabled || !username.trim()}
              className="h-12 px-6 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
            >
              {showSignInHint ? <Github className="w-5 h-5" /> : <Zap className="w-5 h-5" />}
            </Button>
          </div>
          {showSignInHint && username.trim() && (
            <p className="text-xs text-gray-500 mt-2 text-center">
              You&apos;ll be signed in and then @{username}&apos;s profile will be analyzed
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
