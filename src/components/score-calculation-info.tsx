"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronDown, ChevronUp, Calculator, GitBranch, Star, Users, Activity } from "lucide-react"

export function ScoreCalculationInfo() {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <div className="w-full max-w-4xl mx-auto">
      <Button
        variant="ghost"
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-center space-x-2 text-gray-400 hover:text-white hover:bg-purple-400/5 transition-colors"
      >
        <Calculator className="w-4 h-4" />
        <span>How do we calculate your developer score?</span>
        {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
      </Button>

      {isExpanded && (
        <Card className="mt-4 bg-gray-900/50 backdrop-blur-xl border-gray-700/50">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-lg">
              <Calculator className="w-5 h-5 text-purple-400" />
              <span>Score Calculation Methodology</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-sm text-gray-300">
              <p className="mb-4">
                OctoSpark analyzes your GitHub profile using the <strong>GitHub GraphQL API</strong> to fetch comprehensive data about your contributions, repositories, and community engagement. Our scoring algorithm evaluates 6 specific dimensions of your developer impact:
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <Card className="bg-gray-800/50 border-gray-600">
                <CardContent className="pt-4">
                  <div className="flex items-center space-x-2 mb-3">
                    <GitBranch className="w-4 h-4 text-blue-400" />
                    <h4 className="font-semibold text-sm text-blue-400">Open Source Contributions (25 points)</h4>
                  </div>
                  <ul className="text-xs text-gray-400 space-y-1">
                    <li>• External merged pull requests (0.5 points each)</li>
                    <li>• Unique repositories contributed to (1 point each)</li>
                    <li>• Total PR contributions (0.1 points each)</li>
                    <li>• Total contributions in last year (0.1 points each, max 5)</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="bg-gray-800/50 border-gray-600">
                <CardContent className="pt-4">
                  <div className="flex items-center space-x-2 mb-3">
                    <Star className="w-4 h-4 text-green-400" />
                    <h4 className="font-semibold text-sm text-green-400">Repository Quality (20 points)</h4>
                  </div>
                  <ul className="text-xs text-gray-400 space-y-1">
                    <li>• Total stars received (0.1 points each, max 8)</li>
                    <li>• Total forks received (0.2 points each, max 4)</li>
                    <li>• Total public repositories (0.5 points each, max 4)</li>
                    <li>• Recently active repos (0.8 points each, max 4)</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="bg-gray-800/50 border-gray-600">
                <CardContent className="pt-4">
                  <div className="flex items-center space-x-2 mb-3">
                    <Activity className="w-4 h-4 text-yellow-400" />
                    <h4 className="font-semibold text-sm text-yellow-400">Project Presentation (20 points)</h4>
                  </div>
                  <ul className="text-xs text-gray-400 space-y-1">
                    <li>• Repositories with detailed descriptions (max 5)</li>
                    <li>• Repositories with README files (max 5)</li>
                    <li>• Repositories with live demo links (max 10)</li>
                    <li>• Based on percentage of total repositories</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="bg-gray-800/50 border-gray-600">
                <CardContent className="pt-4">
                  <div className="flex items-center space-x-2 mb-3">
                    <Users className="w-4 h-4 text-purple-400" />
                    <h4 className="font-semibold text-sm text-purple-400">Community Engagement (15 points)</h4>
                  </div>
                  <ul className="text-xs text-gray-400 space-y-1">
                    <li>• GitHub followers (0.2 points each, max 3)</li>
                    <li>• Issue contributions (0.4 points each, max 9)</li>
                    <li>• Public gists created (0.5 points each, max 3)</li>
                    <li>• Community interaction and support</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="bg-gray-800/50 border-gray-600">
                <CardContent className="pt-4">
                  <div className="flex items-center space-x-2 mb-3">
                    <GitBranch className="w-4 h-4 text-orange-400" />
                    <h4 className="font-semibold text-sm text-orange-400">Technical Diversity (10 points)</h4>
                  </div>
                  <ul className="text-xs text-gray-400 space-y-1">
                    <li>• Programming languages used (2.5 points each)</li>
                    <li>• Based on primary language of repositories</li>
                    <li>• Encourages polyglot development</li>
                    <li>• Maximum 10 points for 4+ languages</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="bg-gray-800/50 border-gray-600">
                <CardContent className="pt-4">
                  <div className="flex items-center space-x-2 mb-3">
                    <Activity className="w-4 h-4 text-pink-400" />
                    <h4 className="font-semibold text-sm text-pink-400">Profile Completeness (10 points)</h4>
                  </div>
                  <ul className="text-xs text-gray-400 space-y-1">
                    <li>• Full name provided (2 points)</li>
                    <li>• Bio/description added (2 points)</li>
                    <li>• Location specified (2 points)</li>
                    <li>• Website/portfolio URL (2 points)</li>
                    <li>• Profile README repository (2 points)</li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            <div className="border-t border-gray-700 pt-4">
              <h4 className="font-semibold text-gray-200 mb-2">Technical Implementation</h4>
              <div className="text-xs text-gray-400 space-y-2">
                <p>
                  <strong>Data Source:</strong> GitHub GraphQL API for comprehensive profile data, repository metadata, contribution graphs, and social metrics.
                </p>
                <p>
                  <strong>Scoring Algorithm:</strong> Fixed-point scoring system (0-100 total) with specific point allocations per metric. Uses capped scoring to prevent outliers from dominating results.
                </p>
                <p>
                  <strong>Real-time Analysis:</strong> Fresh data fetched on each analysis including last 100 repositories, merged PRs, and contribution statistics.
                </p>
              </div>
            </div>

            <div className="bg-gradient-to-r from-purple-900/20 to-blue-900/20 p-3 rounded-lg border border-purple-700/30">
              <p className="text-xs text-gray-300">
                <strong>Total Score:</strong> Maximum 100 points across all 6 categories. Scores are calculated based on public GitHub data only. Private repository contributions and organization-specific metrics are not included due to API limitations.
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
