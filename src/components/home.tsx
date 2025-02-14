import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Shield,
  Wand2,
  ArrowRight,
  CheckCircle,
  Play,
  Zap,
  Lock,
  Users,
  Github,
  Twitter,
  Linkedin,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";

import { useEffect, useState } from "react";
import { Layout } from "./layout";
import { SplashScreen } from "./splash/SplashScreen";
import { TeamCarousel } from "./TeamCarousel";
import { AuthCheck } from "./auth/AuthCheck";

const teamMembers = [
  {
    name: "Shivansh Srivastava",
    role: "Team Leader",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=shivansh",
    social: {
      twitter: "https://twitter.com",
      linkedin: "https://linkedin.com",
      github: "https://github.com/ShivanshSrivastava136",
    },
  },
  {
    name: "Hitarth Soni",
    role: "Backend Developer",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=hitarth",
    social: {
      twitter: "https://twitter.com",
      linkedin: "https://linkedin.com",
      github: "https://github.com/hitarth0710",
    },
  },
  {
    name: "Harshil Vadalia",
    role: "Designer and ML Work",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=harshil",
    social: {
      twitter: "https://twitter.com",
      linkedin: "https://linkedin.com",
      github: "https://github.com/harshilvadalia",
    },
  },
  {
    name: "Harsh Kadecha",
    role: "Frontend Developer",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=harsh",
    social: {
      twitter: "https://twitter.com",
      linkedin: "https://linkedin.com",
      github: "https://github.com/HarshKadecha11",
    },
  },
];

export default function Home() {
  const { scrollY } = useScroll();
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const unsubscribe = scrollY.onChange((latest) => {
      setScrollPosition(latest);
    });
    return () => unsubscribe();
  }, [scrollY]);
  const navigate = useNavigate();

  const features = [
    {
      icon: Shield,
      title: "Advanced AI Detection",
      description: "Industry-leading deepfake detection with 99.9% accuracy",
    },
    {
      icon: Zap,
      title: "Real-time Analysis",
      description: "Process videos in seconds with our optimized AI pipeline",
    },
    {
      icon: Lock,
      title: "Enterprise Security",
      description: "Bank-grade encryption and secure video processing",
    },
    {
      icon: Users,
      title: "Team Collaboration",
      description: "Share results and collaborate with team members",
    },
  ];

  const stats = [
    { value: "99.9%", label: "Detection Accuracy" },
    { value: "500K+", label: "Videos Analyzed" },
    { value: "200+", label: "Enterprise Clients" },
    { value: "24/7", label: "Expert Support" },
  ];

  return (
    <>
      <SplashScreen />
      <Layout>
        {/* Hero Section */}
        <section className="container pt-32 pb-40 relative overflow-hidden min-h-screen">
          <div className="fixed inset-0 pointer-events-none z-0 opacity-10">
            <div className="absolute inset-0 bg-grid-pattern animate-grid" />
          </div>
          <motion.div
            className="fixed inset-0 w-full h-full overflow-hidden pointer-events-none z-0"
            style={{
              opacity: useTransform(scrollY, [0, 300], [1, 0.15]),
              y: useTransform(scrollY, [0, 300], [0, 100]),
            }}
          >
            <div className="w-full h-full flex items-center justify-center">
              <span
                className="text-[20vw] font-bold leading-none tracking-tighter select-none whitespace-nowrap"
                style={{
                  color: "#ff6b00",
                  opacity: 0.95,
                  WebkitTextStroke: "1px rgba(255, 107, 0, 0.1)",
                  letterSpacing: "-0.05em",
                }}
              >
                MASKOFF
              </span>
            </div>
          </motion.div>
          <div className="relative z-10">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-primary/10 rounded-3xl blur-3xl" />
            <div className="relative text-center min-h-[70vh] flex flex-col justify-center items-center">
              <div className="flex flex-wrap justify-center gap-4 mb-16">
                <AuthCheck>
                  <Button
                    size="lg"
                    className="group fixed bottom-8 right-8 z-50 shadow-lg hover:shadow-xl transition-all duration-200 bg-primary/90 hover:bg-primary backdrop-blur-sm"
                    onClick={() => navigate("/video-detection")}
                  >
                    Get Started
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </AuthCheck>
              </div>
            </div>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto mb-20 mt-40">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl font-bold mb-2">{stat.value}</div>
                <div className="text-muted-foreground text-sm">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto mb-20">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="p-6 rounded-xl border bg-card/50 backdrop-blur-sm"
              >
                <feature.icon className="h-12 w-12 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>

          {/* Team Section */}
          <div className="max-w-6xl mx-auto mb-20">
            <h2 className="text-3xl font-bold text-center mb-12">
              Meet Our Team
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {teamMembers.map((member) => (
                <div
                  key={member.name}
                  className="p-6 rounded-xl border bg-card/50 backdrop-blur-sm hover:bg-card/80 transition-all duration-200 hover:scale-[1.02] text-center group"
                >
                  <Avatar className="h-24 w-24 mx-auto border-2 border-primary/20 mb-4 group-hover:border-primary transition-colors">
                    <AvatarImage src={member.avatar} alt={member.name} />
                    <AvatarFallback>{member.name[0]}</AvatarFallback>
                  </Avatar>
                  <div className="space-y-1 mb-4">
                    <div className="font-semibold text-lg">{member.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {member.role}
                    </div>
                  </div>
                  <div className="flex justify-center gap-4">
                    {Object.entries(member.social).map(([platform, url]) => (
                      <a
                        key={platform}
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-primary hover:scale-110 transition-all duration-200"
                      >
                        {platform === "github" && (
                          <Github className="h-5 w-5" />
                        )}
                        {platform === "twitter" && (
                          <Twitter className="h-5 w-5" />
                        )}
                        {platform === "linkedin" && (
                          <Linkedin className="h-5 w-5" />
                        )}
                      </a>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
}
