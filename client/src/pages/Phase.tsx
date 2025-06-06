import { useState, useEffect } from "react";
import { useRoute } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { PhasePage } from "@/components/PhasePage";
import { NavigationHeader } from "@/components/NavigationHeader";
import { TeamModal } from "@/components/TeamModal";
import { getTeamByCode } from "@/lib/db";
import { Card, CardContent } from "@/components/ui/card";
import { AlertTriangle } from "lucide-react";

interface PhaseConfig {
  phase: number;
  title: string;
  intro: string;
  estimatedTime?: string;
  fields: Array<{
    id: string;
    label: string;
    type: "text" | "textarea" | "select" | "color";
    placeholder?: string;
    options?: { value: string; label: string }[];
    required?: boolean;
    persist?: boolean;
    help?: string;
  }>;
  promptTemplate: string;
  instructions?: string[];
}

export default function Phase() {
  const [match, params] = useRoute("/phase/:id");
  const [teamModalOpen, setTeamModalOpen] = useState(false);
  const [teamData, setTeamData] = useState<any>(null);
  
  const phaseId = params?.id ? parseInt(params.id) : 1;
  const urlParams = new URLSearchParams(window.location.search);
  const teamCode = urlParams.get('team_id');

  // Fetch phase configuration
  const { data: phaseConfig, isLoading: configLoading, error: configError } = useQuery<PhaseConfig>({
    queryKey: [`/api/configs/phase-${phaseId}`],
    enabled: phaseId >= 1 && phaseId <= 8,
  });

  // Fetch team data if team code is provided
  const { data: team, isLoading: teamLoading } = useQuery({
    queryKey: [`/api/teams/${teamCode}`],
    enabled: !!teamCode,
    queryFn: async () => {
      if (!teamCode) return null;
      return getTeamByCode(teamCode);
    },
  });

  useEffect(() => {
    if (team) {
      setTeamData(team);
    }
  }, [team]);

  // Show team modal if no team is selected and no local data exists
  useEffect(() => {
    if (!teamCode && !localStorage.getItem('phase1_data')) {
      setTeamModalOpen(true);
    }
  }, [teamCode]);

  const handleTeamSelected = (selectedTeamCode: string) => {
    window.location.href = `/phase/${phaseId}?team_id=${selectedTeamCode}`;
  };

  if (!match) {
    return null;
  }

  if (phaseId < 1 || phaseId > 7) {
    return (
      <div className="min-h-screen bg-gray-50">
        <NavigationHeader team={teamData} />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Card className="max-w-md mx-auto">
            <CardContent className="pt-6 text-center">
              <AlertTriangle className="w-12 h-12 text-accent-600 mx-auto mb-4" />
              <h1 className="text-2xl font-bold text-neutral-800 mb-2">Phase Not Found</h1>
              <p className="text-gray-600">
                Please select a valid phase between 1 and 7.
              </p>
            </CardContent>
          </Card>
        </main>
      </div>
    );
  }

  if (configLoading || teamLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <NavigationHeader team={teamData} />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        </main>
      </div>
    );
  }

  if (configError || !phaseConfig) {
    return (
      <div className="min-h-screen bg-gray-50">
        <NavigationHeader team={teamData} />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Card className="max-w-md mx-auto">
            <CardContent className="pt-6 text-center">
              <AlertTriangle className="w-12 h-12 text-accent-600 mx-auto mb-4" />
              <h1 className="text-2xl font-bold text-neutral-800 mb-2">Configuration Error</h1>
              <p className="text-gray-600">
                Unable to load phase configuration. Please try again later.
              </p>
            </CardContent>
          </Card>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <NavigationHeader team={teamData} />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <PhasePage
          config={phaseConfig}
          teamId={teamData?.id}
          teamCode={teamCode || undefined}
        />
      </main>

      <TeamModal
        isOpen={teamModalOpen}
        onClose={() => setTeamModalOpen(false)}
        onTeamSelected={handleTeamSelected}
      />
    </div>
  );
}
