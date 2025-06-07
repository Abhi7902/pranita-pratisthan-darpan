
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppProvider } from "./contexts/AppContext";
import { MELProvider } from "./contexts/MELContext";
import { SupabaseMELProvider } from "./contexts/SupabaseMELContext";
import { AuthProvider } from "./contexts/AuthContext";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import ProgramPage from "./pages/ProgramPage";
import MELPage from "./pages/MELPage";
import LoginPage from "./components/auth/LoginPage";
import UnifiedAdminPanel from "./components/UnifiedAdminPanel";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <AppProvider>
        <MELProvider>
          <SupabaseMELProvider>
            <TooltipProvider>
              <Toaster />
              <Sonner />
              <BrowserRouter>
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/admin" element={<UnifiedAdminPanel />} />
                  <Route path="/program/:programId" element={<ProgramPage />} />
                  <Route path="/mel" element={<MELPage />} />
                  {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </BrowserRouter>
            </TooltipProvider>
          </SupabaseMELProvider>
        </MELProvider>
      </AppProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
