import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  CreditCard,
  Globe,
  Shield,
  Users2,
} from "lucide-react";
const BodyMiddle = () => {
   const mainFeatures = [
    {
      icon: <CreditCard className="w-8 h-8 text-purple-400" />,
      title: "Tourist Experience Magic",
      description: "Show your KYC and your digital NFT ID is ready. Just a QR code in your pocket making your travel smooth, secure, and futuristic.",
      badge: "NFT Powered"
    },
    {
      icon: <Shield className="w-8 h-8 text-purple-400" />,
      title: "Safety Meets Tech", 
      description: "Your trip's got its own digital bodyguard - geo-fencing keeps you inside safe zones, and a panic button calls backup with just one tap.",
      badge: "AI Powered"
    },
    {
      icon: <Globe className="w-8 h-8 text-purple-400" />,
      title: "Smart Officer Tools",
      description: "Cops just scan your QR and boom—your trip details pop up. Plus, they get live heatmaps and even auto-missing reports.",
      badge: "Real-time"
    },
    {
      icon: <Users2 className="w-8 h-8 text-purple-400" />,
      title: "Inclusive & Secure", 
      description: "No matter who you are or where you're from, the app speaks your language and keeps you covered with end-to-end encryption.",
      badge: "Global"
    }
  ];
  // 
  return (
    <section className="px-6 lg:px-10 py-16">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Features that make it special and powerful
          </h2>
          <p className="text-xl text-purple-200/80 max-w-3xl mx-auto">
            Experience the future of safe travel with our cutting-edge blockchain and AI technology
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {mainFeatures.map((feature, index) => (
            <Card key={index} className="bg-white/5 border-purple-500/20 hover:bg-white/10 hover:border-purple-400/40 transition-all duration-300 group">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-purple-500/20 rounded-xl group-hover:bg-purple-500/30 transition-colors">
                    {feature.icon}
                  </div>
                  <Badge variant="secondary" className="bg-purple-500/20 text-purple-300 border-purple-400/30">
                    {feature.badge}
                  </Badge>
                </div>
                <CardTitle className="text-purple-100 text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-purple-200/70 leading-relaxed">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BodyMiddle;
