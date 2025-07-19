
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import Index from "./pages/Index";
import About from "./pages/About";
import Contact from "./pages/Contact";
import FactCheck from "./pages/FactCheck";
import SearchResults from "./pages/SearchResults";
import NewsDetail from "./pages/NewsDetail";
import NewsDetailView from "./pages/NewsDetailView";
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
import UserProfile from "./pages/UserProfile";
import UserSubmissions from "./pages/UserSubmissions";
import Notifications from "./pages/Notifications";
import NewsAPI from "./pages/NewsAPI";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
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
            <Route path="/article/:id" element={<NewsDetailView />} />
            <Route path="/news-api" element={<NewsAPI />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/bookmarks" element={<ProtectedRoute><Bookmarks /></ProtectedRoute>} />
            <Route path="/profile" element={<ProtectedRoute><UserProfile /></ProtectedRoute>} />
            <Route path="/profile-settings" element={<ProtectedRoute><ProfileSettings /></ProtectedRoute>} />
            <Route path="/user-submissions" element={<ProtectedRoute><UserSubmissions /></ProtectedRoute>} />
            <Route path="/notifications" element={<ProtectedRoute><Notifications /></ProtectedRoute>} />
            <Route path="/claim-submission" element={<ProtectedRoute><ClaimSubmission /></ProtectedRoute>} />
            <Route path="/fact-check-dashboard" element={<ProtectedRoute><FactCheckDashboard /></ProtectedRoute>} />
            <Route path="/fact-check-report/:id" element={<ProtectedRoute><FactCheckReport /></ProtectedRoute>} />
            <Route path="/admin/dashboard" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
            <Route path="/admin/sources" element={<ProtectedRoute><AdminSources /></ProtectedRoute>} />
            <Route path="/admin/users" element={<ProtectedRoute><AdminUsers /></ProtectedRoute>} />
            <Route path="/admin/analytics" element={<ProtectedRoute><AdminAnalytics /></ProtectedRoute>} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
