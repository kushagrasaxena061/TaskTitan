import React from "react";
import Link from "next/link";
import {
  ChevronRight,
  Layout,
  Calendar,
  BarChart,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

const features = [
  {
    title: "Intuitive Kanban Boards",
    description:
      "Visualize your workflow and optimize team productivity with our easy-to-use Kanban boards.",
    icon: Layout,
  },
  {
    title: "Powerful Sprint Planning",
    description:
      "Plan and manage sprints effectively, ensuring your team stays focused on delivering value.",
    icon: Calendar,
  },
  {
    title: "Comprehensive Reporting",
    description:
      "Gain insights into your team's performance with detailed, customizable reports and analytics.",
    icon: BarChart,
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#141420] to-[#0b0b12] text-white">
      {/* Hero Section */}
      <section className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center pt-32 overflow-hidden">
        {/* Glow or Blob Background */}
        <div className="absolute inset-0 -z-10 flex justify-center">
          <div className="w-[500px] h-[500px] bg-purple-600/20 blur-3xl rounded-full opacity-50 animate-pulse"></div>
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-6xl font-extrabold leading-tight mb-6">
          <span className="bg-gradient-to-r from-purple-400 via-purple-200 to-purple-400 bg-clip-text text-transparent drop-shadow-[0_2px_2px_rgba(192,132,252,0.3)]">
            Streamline Your Workflow
          </span>
        </h1>

        <p className="text-lg sm:text-xl text-gray-300 mb-10 max-w-3xl mx-auto font-light">
          Empower your team with our intuitive project management solution.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link href="/onboarding">
            <Button size="lg" className="bg-purple-600 hover:bg-purple-700 text-white transition-all shadow-md shadow-purple-700/40">
              Get Started <ChevronRight size={18} className="ml-1" />
            </Button>
          </Link>
          <Link href="#features">
            <Button
              size="lg"
              variant="outline"
              className="border border-purple-500/50 text-purple-400 hover:bg-purple-900/30 transition-all shadow-sm"
            >
              Learn More
            </Button>
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          <h3 className="text-3xl sm:text-4xl font-bold mb-14 text-center text-white">
            <span className="bg-gradient-to-r from-purple-200 via-purple-100 to-purple-200 bg-clip-text text-transparent">Key Features</span>
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="bg-[#1f1f2e] hover:scale-105 transition-transform duration-300 border border-purple-700"
              >
                <CardContent className="pt-6 px-6 pb-8">
                  <feature.icon className="h-12 w-12 mb-4 text-purple-400" />
                  <h4 className="text-xl font-semibold mb-2 text-white">
                    {feature.title}
                  </h4>
                  <p className="text-gray-400">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 text-center px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          <h3 className="text-3xl sm:text-4xl font-bold mb-6 text-white">
            <span className="bg-gradient-to-r from-purple-50 via-purple-100 to-purple-300 bg-clip-text text-transparent">Ready to Transform Your Workflow?</span>
          </h3>
          <p className="text-lg sm:text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
            Join thousands of teams already using{" "}
            <span className="text-purple-400 font-semibold">Tasktitan</span> to
            streamline their projects and boost productivity.
          </p>
          <Link href="/onboarding">
            <Button size="lg" className="bg-purple-600 hover:bg-purple-700 text-white animate-bounce transition-all">
              Start For Free <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
