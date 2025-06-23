
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import About from "./pages/About";
import Contact from "./pages/Contact";
import FactCheck from "./pages/FactCheck";
import SearchResults from "./pages/SearchResults";
import NewsDetail from "./pages/NewsDetail";
import NotFound from "./pages/NotFound";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Dashboard from "./pages/Dashboard";
import ClaimSubmission from "./pages/ClaimSubmission";
import FactCheckDashboard from "./pages/FactCheckDashboard";
import FactCheckReport from "./pages/FactCheckReport";
import AdminDashboard from "./pages/AdminDashboard";
import AdminSources from "./pages/AdminSources";
import AdminUsers from "./pages/AdminUsers";
import AdminAnalytics from "./pages/AdminAnalytics";
import Bookmarks from "./pages/Bookmarks";
import ProfileSettings from "./pages/ProfileSettings";
import UserSubmissions from "./pages/UserSubmissions";
import Notifications from "./pages/Notifications";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/fact-check" element={<FactCheck />} />
          <Route path="/search" element={<SearchResults />} />
          <Route path="/news/:id" element={<NewsDetail />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/bookmarks" element={<Bookmarks />} />
          <Route path="/profile-settings" element={<ProfileSettings />} />
          <Route path="/user-submissions" element={<UserSubmissions />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/claim-submission" element={<ClaimSubmission />} />
          <Route path="/fact-check-dashboard" element={<FactCheckDashboard />} />
          <Route path="/fact-check-report/:id" element={<FactCheckReport />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/sources" element={<AdminSources />} />
          <Route path="/admin/users" element={<AdminUsers />} />
          <Route path="/admin/analytics" element={<AdminAnalytics />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
