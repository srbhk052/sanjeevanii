import { Heart, Cross, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-muted/30 border-t border-border mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="relative">
                <Cross className="w-6 h-6 text-primary" />
                <Heart className="w-2.5 h-2.5 text-primary absolute top-1.5 left-1.5" />
              </div>
              <span className="text-lg font-bold text-primary">Sanjeevani</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Connecting donors, hospitals, and patients for better healthcare outcomes. 
              Save lives through efficient medical resource management.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="/emergency" className="text-muted-foreground hover:text-emergency transition-colors">Emergency Request</a></li>
              <li><a href="/donor" className="text-muted-foreground hover:text-primary transition-colors">Become a Donor</a></li>
              <li><a href="/dashboard" className="text-muted-foreground hover:text-primary transition-colors">Hospital Portal</a></li>
              <li><a href="/patient" className="text-muted-foreground hover:text-primary transition-colors">Find Resources</a></li>
            </ul>
          </div>

          {/* Resources */}
          <div className="space-y-4">
            <h3 className="font-semibold">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">About Blood Donation</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Organ Donation Guide</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">FAQs</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Support</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="font-semibold">Contact Us</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-emergency" />
                <span className="text-muted-foreground">Emergency: 1800-SANJEEVANI</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-primary" />
                <span className="text-muted-foreground">info@sanjeevani.health</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-primary" />
                <span className="text-muted-foreground">Healthcare Centers Nationwide</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            © 2025 Sanjeevani Healthcare Network. All rights reserved.
          </p>
          <div className="flex space-x-6 text-sm mt-4 md:mt-0">
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">Privacy Policy</a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">Terms of Service</a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">Contact Us</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;