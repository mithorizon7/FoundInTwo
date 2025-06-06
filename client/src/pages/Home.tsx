import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TeamModal } from "@/components/TeamModal";
import { NavigationHeader } from "@/components/NavigationHeader";
import { ArrowRight, Users, Clock, Target } from "lucide-react";
import logoSrc from "@/assets/logo.png";

export default function Home() {
  const [teamModalOpen, setTeamModalOpen] = useState(false);
  const [, setLocation] = useLocation();

  // Removed automatic modal popup - now only opens when user clicks "Get Started"

  const handleGetStarted = () => {
    setTeamModalOpen(true);
  };

  const handleContinue = () => {
    setLocation('/phase/1');
  };

  const handleTeamSelected = (teamCode: string) => {
    setLocation(`/phase/1?team_id=${teamCode}`);
  };

  const features = [
    {
      icon: Target,
      title: "8 Strategic Phases",
      description: "From market research to product launch, follow a proven framework used by successful startups."
    },
    {
      icon: Users,
      title: "Team Collaboration",
      description: "Work together with your team in real-time. All progress is automatically saved and synced."
    },
    {
      icon: Clock,
      title: "AI-Powered Prompts",
      description: "Generate professional-grade prompts for AI tools like ChatGPT and Gemini to accelerate your research."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-accent-50">
      <NavigationHeader />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center shadow-lg">
              <img 
                src={logoSrc} 
                alt="Found-in-Two Logo" 
                className="w-16 h-16 object-contain"
              />
            </div>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-neutral-800 mb-8 leading-tight tracking-tight">
            Found a Company in <span className="text-primary">Two Hours</span>
          </h1>
          
          <p className="text-lg md:text-xl text-neutral-600 mb-10 max-w-4xl mx-auto leading-relaxed font-medium">
            A sprint that shows how a small team armed with today's generative-AI tools can do—in a single workshop—what once took weeks: scout a market, design a differentiated offer, create a full media kit, and launch a live, interactive, AI-powered website.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={handleGetStarted}
              size="lg"
              className="bg-primary hover:bg-primary/90 text-white px-8 py-4 text-lg"
            >
              Get Started
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            

          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-10 mb-20">
          {features.map((feature, index) => (
            <Card key={index} className="text-center p-2 hover:shadow-lg transition-shadow">
              <CardHeader className="pb-4">
                <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-6">
                  <feature.icon className="w-8 h-8 text-primary" />
                </div>
                <CardTitle className="text-xl font-bold text-neutral-800 mb-3">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-base text-neutral-600 leading-relaxed font-medium">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Process Overview */}
        <Card className="bg-white shadow-lg border-0">
          <CardHeader className="pb-8">
            <CardTitle className="text-2xl md:text-3xl font-bold text-center text-neutral-800 mb-4">The 8-Phase Journey</CardTitle>
            <p className="text-lg text-neutral-600 text-center max-w-3xl mx-auto leading-relaxed">
              A systematic approach to building a complete startup from market research to live deployment
            </p>
          </CardHeader>
          <CardContent className="px-8 pb-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {[
                { phase: 1, title: "Market & Competitor Research", description: "Panoramic, data-backed view of market size, competitors, and customer pain points using AI analysis" },
                { phase: 2, title: "Competitor Matrix Construction", description: "Transform research into quantitative competitor matrix with threat scoring and strategic gaps" },
                { phase: 3, title: "Background Research: OpenAI Deep-Research", description: "Commission AI-powered research to compile peer-reviewed evidence validating your core benefit" },
                { phase: 4, title: "Design & Select the Hero Offer", description: "Generate and score three product concepts to crown your single 'hero offer' for market" },
                { phase: 5, title: "Product Design & Feature Definition", description: "Transform hero concept into detailed MVP specification with features and user experience" },
                { phase: 6, title: "Media Kit & Brand Assets", description: "Create comprehensive brand messaging, visual guidelines, and marketing materials" },
                { phase: 7, title: "Website & Digital Presence", description: "Build conversion-optimized website with clear value proposition and lead generation" },
                { phase: 8, title: "Launch Strategy & Go-to-Market", description: "Comprehensive launch plan with customer acquisition, marketing channels, and success metrics" }
              ].map((phase) => (
                <div key={phase.phase} className="text-center space-y-4">
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto shadow-md">
                    <span className="text-white font-bold text-lg">{phase.phase}</span>
                  </div>
                  <h3 className="font-bold text-lg text-neutral-800 leading-tight">{phase.title}</h3>
                  <p className="text-sm text-neutral-600 leading-relaxed font-medium">{phase.description}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>

      <TeamModal
        isOpen={teamModalOpen}
        onClose={() => setTeamModalOpen(false)}
        onTeamSelected={handleTeamSelected}
      />
    </div>
  );
}
