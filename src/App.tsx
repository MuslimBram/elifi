import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import AppLayout from "@/components/AppLayout";
import PointsToast from "@/components/gamification/PointsToast";
import OnboardingModal from "@/components/gamification/OnboardingModal";
import Index from "./pages/Index.tsx";
import Alphabet from "./pages/Alphabet.tsx";
import Quran from "./pages/Quran.tsx";
import Tajweed from "./pages/Tajweed.tsx";
import UmraHajj from "./pages/UmraHajj.tsx";
import Fikh from "./pages/Fikh.tsx";
import Games from "./pages/Games.tsx";
import Progress from "./pages/Progress.tsx";
import Settings from "./pages/Settings.tsx";
import Favorites from "./pages/Favorites.tsx";
import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <PointsToast />
      <OnboardingModal />
      <BrowserRouter>
        <AppLayout>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/alphabet" element={<Alphabet />} />
            <Route path="/quran" element={<Quran />} />
            <Route path="/tajweed" element={<Tajweed />} />
            <Route path="/umra-hajj" element={<UmraHajj />} />
            <Route path="/fikh" element={<Fikh />} />
            <Route path="/games" element={<Games />} />
            <Route path="/progress" element={<Progress />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/favorites" element={<Favorites />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AppLayout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
