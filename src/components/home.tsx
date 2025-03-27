import { Button } from "@/components/ui/button";
import { LoadingScreen } from "./LoadingScreen";
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
    name: "Hitarth Soni",
    role: "Full Stack Developer",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=hitarth",
    social: {
      twitter: "https://twitter.com",
      linkedin: "https://linkedin.com",
      github: "https://github.com/hitarth0710",
    },
  },
  {
    name: "Shivnash Srivastava",
    role: "Frontend Developer",
    avatar:
      "https://api.dicebear.com/7.x/avataaars/svg?seed=jayan&gender=male&hairColor=black&facialHairChance=100&facialHairType=beardMedium",
    social: {
      twitter: "https://twitter.com",
      linkedin: "https://linkedin.com",
      github: "https://github.com",
    },
  },
];

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
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
              <div className="flex">
                {"MASKOFF".split("").map((letter, index) => (
                  <motion.span
                    key={index}
                    className="text-[20vw] font-bold leading-none tracking-tighter select-none relative"
                    style={{
                      color: "#ff6b00",
                      opacity: 0.95,
                      WebkitTextStroke: "1px rgba(255, 107, 0, 0.1)",
                      letterSpacing: "-0.05em",
                      display: "inline-block",
                    }}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{
                      opacity: 1,
                      y: 0,
                      rotate: [0, -5, 5, -5, 0],
                      scale: [1, 1.1, 1],
                      transition: {
                        duration: 2,
                        delay: index * 0.1,
                        repeat: Infinity,
                        repeatDelay: 3,
                      },
                    }}
                    whileHover={{
                      scale: 1.4,
                      y: -30,
                      rotate: [0, -15, 15, -15, 0],
                      transition: {
                        type: "spring",
                        stiffness: 300,
                        damping: 10,
                        duration: 0.5,
                      },
                    }}
                  >
                    <motion.span
                      className="absolute -inset-1 blur-lg"
                      style={{ color: "#ff6b00", opacity: 0.3 }}
                      animate={{
                        opacity: [0.3, 0.6, 0.3],
                        scale: [1, 1.1, 1],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        repeatType: "reverse",
                      }}
                    >
                      {letter}
                    </motion.span>
                    {letter}
                  </motion.span>
                ))}
              </div>
            </div>
          </motion.div>
          <div className="relative z-10">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-primary/10 rounded-3xl blur-3xl" />
            <div className="relative text-center min-h-[70vh] flex flex-col justify-center items-center">
              <div className="flex flex-wrap justify-center gap-4 mb-16">
                <Button
                  size="lg"
                  variant="outline"
                  className="group fixed bottom-8 left-8 z-50 shadow-lg hover:shadow-xl transition-all duration-200 border-primary text-primary hover:bg-primary hover:text-primary-foreground backdrop-blur-sm"
                  onClick={() => navigate("/team")}
                >
                  Contact Us
                  <Users className="ml-2 h-4 w-4 group-hover:scale-110 transition-transform" />
                </Button>
                <AuthCheck>
                  <Button
                    size="lg"
                    className="group fixed bottom-8 right-8 z-50 shadow-lg hover:shadow-xl transition-all duration-200 bg-primary/90 hover:bg-primary backdrop-blur-sm"
                    onClick={() => {
                      setIsLoading(true);
                    }}
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
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 30 }}
                viewport={{ once: false, amount: 0.8 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.2,
                  ease: "easeOut",
                }}
                className="p-6 rounded-xl border border-[#ff6b00] bg-black hover:bg-[#ff6b00] group transition-all duration-300"
              >
                <feature.icon className="h-12 w-12 text-[#ff6b00] group-hover:text-black mb-4 transition-colors" />
                <h3 className="text-xl font-semibold mb-2 text-[#ff6b00] group-hover:text-black transition-colors">
                  {feature.title}
                </h3>
                <p className="text-[#ff6b00]/70 group-hover:text-black/90 transition-colors">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Team Section */}
          <div className="max-w-6xl mx-auto mb-20">
            <h2 className="text-3xl font-bold text-center mb-12">
              Meet Our Team
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {teamMembers.map((member, index) => (
                <motion.div
                  key={member.name}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 30 }}
                  viewport={{ once: false, amount: 0.8 }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.2,
                    ease: "easeOut",
                  }}
                  className="p-6 rounded-xl border border-[#ff6b00] bg-black backdrop-blur-sm hover:bg-[#ff6b00]/10 transition-all duration-200 hover:scale-[1.02] text-center group"
                >
                  <Avatar className="h-24 w-24 mx-auto border-2 border-[#ff6b00] mb-4 group-hover:border-[#ff6b00] transition-colors">
                    <AvatarImage src={member.avatar} alt={member.name} />
                    <AvatarFallback>{member.name[0]}</AvatarFallback>
                  </Avatar>
                  <div className="space-y-1 mb-4">
                    <div className="font-semibold text-lg text-[#ff6b00]">
                      {member.name}
                    </div>
                    <div className="text-sm text-[#ff6b00]/70">
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
                        className="text-[#ff6b00]/70 hover:text-[#ff6b00] hover:scale-110 transition-all duration-200"
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
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </Layout>
      {isLoading && (
        <LoadingScreen
          onComplete={() => {
            setIsLoading(false);
            navigate("/video-detection");
          }}
        />
      )}
    </>
  );
}
