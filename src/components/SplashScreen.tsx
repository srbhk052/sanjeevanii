import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Heart, Cross } from "lucide-react";

const SplashScreen = () => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(() => navigate('/login'), 300);
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center transition-opacity duration-300 ${
      isVisible ? 'opacity-100' : 'opacity-0'
    }`} style={{ background: 'var(--gradient-primary)' }}>
      <div className="text-center fade-in-medical">
        <div className="flex items-center justify-center mb-6">
          <div className="relative">
            <Cross className="w-20 h-20 text-white pulse-healing" />
            <Heart className="w-8 h-8 text-white absolute top-6 left-6" />
          </div>
        </div>
        <h1 className="text-6xl font-bold text-white mb-4">
          🌿 Sanjeevani
        </h1>
        <p className="text-2xl text-white/90 font-medium">
          Healthcare Resource Management
        </p>
        <div className="mt-8">
          <div className="w-12 h-1 bg-white/50 mx-auto rounded animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;