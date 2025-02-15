import { motion } from "framer-motion";
import { Layout } from "@/components/layout";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Github, Twitter, Linkedin } from "lucide-react";

const teamMembers = [
  {
    name: "Shivansh Srivastava",
    role: "Team Leader",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=shivansh",
    bio: "Leading the vision and development of MaskOff's deepfake detection technology.",
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
    bio: "Architecting robust backend systems and AI integration pipelines.",
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
    bio: "Creating intuitive user experiences and implementing ML models.",
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
    bio: "Building responsive and engaging user interfaces with modern web technologies.",
    social: {
      twitter: "https://twitter.com",
      linkedin: "https://linkedin.com",
      github: "https://github.com/HarshKadecha11",
    },
  },
];

export default function Team() {
  return (
    <Layout>
      <div className="container pt-32 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl font-bold mb-4 text-[#ff6b00]">
            Meet Our Team
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            We're a passionate team of developers and designers working to make
            the internet a more authentic place through advanced deepfake
            detection.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              whileHover={{ y: -10 }}
              className="p-6 rounded-xl border border-[#ff6b00] bg-black/50 backdrop-blur-sm hover:bg-[#ff6b00]/10 transition-all duration-300"
            >
              <motion.div
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Avatar className="h-32 w-32 mx-auto border-4 border-[#ff6b00] mb-6">
                  <AvatarImage src={member.avatar} alt={member.name} />
                  <AvatarFallback>{member.name[0]}</AvatarFallback>
                </Avatar>
              </motion.div>

              <motion.div className="text-center space-y-3">
                <h3 className="text-xl font-bold text-[#ff6b00]">
                  {member.name}
                </h3>
                <p className="text-[#ff6b00]/80 font-medium">{member.role}</p>
                <p className="text-muted-foreground text-sm">{member.bio}</p>

                <motion.div
                  className="flex justify-center gap-4 pt-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 + index * 0.2 }}
                >
                  {Object.entries(member.social).map(([platform, url]) => (
                    <motion.a
                      key={platform}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#ff6b00]/70 hover:text-[#ff6b00] transition-colors"
                      whileHover={{ scale: 1.2, rotate: 5 }}
                    >
                      {platform === "github" && <Github className="h-5 w-5" />}
                      {platform === "twitter" && (
                        <Twitter className="h-5 w-5" />
                      )}
                      {platform === "linkedin" && (
                        <Linkedin className="h-5 w-5" />
                      )}
                    </motion.a>
                  ))}
                </motion.div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </Layout>
  );
}
