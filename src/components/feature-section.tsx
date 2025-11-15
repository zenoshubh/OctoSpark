import {
  ChartBar,
  Github,
  Zap,
} from "lucide-react";
import React from "react";

function FeatureCard({
  title,
  description,
  icon,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="bg-gray-900/30 backdrop-blur-sm p-6 rounded-xl border border-gray-800/50 hover:border-purple-500/20 transition-all">
      <div className="p-3 bg-purple-500/10 rounded-lg w-fit mb-4">{icon}</div>
      <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
      <p className="text-gray-400 text-sm">{description}</p>
    </div>
  );
}

export function FeatureSection() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl w-full mx-auto">
      <FeatureCard
        title="Real-time Analysis"
        description="Get instant insights into any GitHub developer's activity and contributions."
        icon={<ChartBar className="w-6 h-6 text-purple-400" />}
      />
      <FeatureCard
        title="Comprehensive Metrics"
        description="Evaluate repository quality, community engagement, and technical diversity."
        icon={<Github className="w-6 h-6 text-purple-400" />}
      />
      <FeatureCard
        title="Developer Spark"
        description="Monitor the heartbeat of coding activity with our proprietary scoring system."
        icon={<Zap className="w-6 h-6 text-purple-400" />}
      />
    </div>
  );
}
