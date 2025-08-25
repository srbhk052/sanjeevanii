import { Link, useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Heart, Cross, User, LogOut } from "lucide-react";
import { useAuthStore } from "@/stores/authStore";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuthStore();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (!user || location.pathname === '/splash' || location.pathname === '/login' || location.pathname === '/register') {
    return null;
  }

  return (
    <nav className="bg-background border-b border-border shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <div className="relative">
                <Cross className="w-8 h-8 text-primary" />
                <Heart className="w-3 h-3 text-primary absolute top-2.5 left-2.5" />
              </div>
              <span className="text-xl font-bold text-primary">Sanjeevani</span>
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <Link 
              to={user.role === 'hospital' ? '/dashboard' : user.role === 'donor' ? '/donor' : '/patient'}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                location.pathname.includes('dashboard') || location.pathname.includes('donor') || location.pathname.includes('patient')
                  ? 'bg-primary text-primary-foreground' 
                  : 'text-foreground hover:bg-accent'
              }`}
            >
              Dashboard
            </Link>
            <Link 
              to="/requests"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                location.pathname.includes('requests')
                  ? 'bg-primary text-primary-foreground' 
                  : 'text-foreground hover:bg-accent'
              }`}
            >
              Requests
            </Link>
            <Link 
              to="/emergency"
              className="px-3 py-2 rounded-md text-sm font-medium text-emergency-foreground bg-emergency hover:bg-emergency/90 transition-colors"
            >
              Emergency
            </Link>
            <div className="flex items-center space-x-2">
              <User className="w-5 h-5 text-muted-foreground" />
              <span className="text-sm font-medium">{user.name}</span>
              <Button variant="ghost" size="sm" onClick={handleLogout}>
                <LogOut className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;