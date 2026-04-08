"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ParticleField } from "@/components/particleField";
import { TechStackIcons } from "../tech-stack-icons";

const skillCategories = [
  {
    title: "Frontend Development",
    color: "#00b4d8",
    skills: [
      { name: "React / Next.js", level: 95 },
      { name: "TypeScript", level: 90 },
      { name: "Tailwind CSS", level: 88 },
      { name: "JavaScript (ES6+)", level: 92 },
      { name: "HTML5 & CSS3", level: 95 },
      { name: "Redux / Zustand", level: 85 },
    ],
  },
  {
    title: "Backend Development",
    color: "#7209b7",
    skills: [
      { name: "Node.js / Express", level: 92 },
      { name: "MongoDB / Mongoose", level: 88 },
      { name: "PostgreSQL", level: 85 },
      { name: "RESTful APIs", level: 93 },
      { name: "GraphQL", level: 80 },
      { name: "Socket.io", level: 85 },
    ],
  },
  {
    title: "Tools & Technologies",
    color: "#00b4d8",
    skills: [
      { name: "Git / GitHub", level: 95 },
      { name: "Docker", level: 82 },
      { name: "AWS / Cloud Services", level: 78 },
      { name: "Webpack / Vite", level: 85 },
      { name: "Jest / Testing", level: 80 },
      { name: "CI/CD", level: 75 },
    ],
  },
];

const techStack = [
  "React",
  "Next.js",
  "TypeScript",
  "Node.js",
  "Express",
  "MongoDB",
  "PostgreSQL",
  "Tailwind CSS",
  "Redux",
  "GraphQL",
  "Docker",
  "AWS",
  "Git",
  "Jest",
  "Socket.io",
  "Webpack",
  "Framer Motion",
  "Prisma",
];

export function SkillsSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section
      id="skills"
      className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden"
      ref={ref}
    >
      <ParticleField />
      <div className="relative z-10 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 relative pt-20"
        >
          {/* Floating Tech Stack Icons - Bottom Right width : w-24 */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 1.5 }}
            className="absolute -top-16 -ml-12 transform z-20 w-full flex justify-center"
          >
            <TechStackIcons />
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">
            Skills & Expertise
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            A comprehensive overview of my technical skills and proficiency
            levels across different technologies and tools.
          </p>
        </motion.div>

        {/* Skills Categories */}
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: categoryIndex * 0.2 }}
            >
              <Card className="glass-card border-0 h-full">
                <CardContent className="p-8">
                  <div className="flex items-center mb-6">
                    <div
                      className="w-4 h-4 rounded-full mr-3"
                      style={{ backgroundColor: category.color }}
                    />
                    <h3 className="text-xl font-bold text-white">
                      {category.title}
                    </h3>
                  </div>

                  <div className="space-y-6">
                    {category.skills.map((skill, skillIndex) => (
                      <motion.div
                        key={skill.name}
                        initial={{ opacity: 0, x: -20 }}
                        animate={inView ? { opacity: 1, x: 0 } : {}}
                        transition={{
                          duration: 0.5,
                          delay: categoryIndex * 0.2 + skillIndex * 0.1,
                        }}
                        className="space-y-2"
                      >
                        <div className="flex justify-between items-center">
                          <span className="text-gray-300 font-medium">
                            {skill.name}
                          </span>
                          <span className="text-sm text-gray-400">
                            {skill.level > 90 ? "Expert" : skill.level > 70 ? "Excellent" : skill.level > 50 ? "Intermediate" : "Learning"}  
                          </span>
                        </div>
                        <div className="skill-progress">
                          <motion.div
                            className="skill-progress-fill"
                            initial={{ width: 0 }}
                            animate={inView ? { width: `${skill.level}%` } : {}}
                            transition={{
                              duration: 1.5,
                              delay: categoryIndex * 0.2 + skillIndex * 0.1,
                              ease: "easeOut",
                            }}
                          />
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Tech Stack Cloud */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <Card className="glass-card border-0">
            <CardContent className="p-8">
              <h3 className="text-3xl font-bold text-white mb-6 text-center">
                Technology Stack
              </h3>
              <div className="flex flex-wrap justify-center gap-3">
                {techStack.map((tech, index) => (
                  <motion.div
                    key={tech}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.5,
                      delay: 0.8 + index * 0.1,
                      type: "spring",
                      stiffness: 100,
                    }}
                  >
                    <Badge
                      className="px-4 py-2 text-sm font-medium glass hover-glow  text-white"
                      style={{
                        background:
                          index % 2 === 0
                            ? "linear-gradient(135deg, #00b4d8, rgba(0, 180, 216, 0.1))"
                            : "linear-gradient(135deg, #7209b7, rgba(114, 9, 183, 0.1))",
                        border: "1px solid rgba(255, 255, 255, 0.1)",
                      }}
                    >
                      {tech}
                    </Badge>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Proficiency Overview */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-16 grid md:grid-cols-3 gap-8"
        >
          {[
            {
              title: "Frontend",
              percentage: 92,
              description: "Modern UI/UX with React ecosystem",
            },
            {
              title: "Backend",
              percentage: 88,
              description: "Scalable APIs and databases",
            },
            {
              title: "DevOps",
              percentage: 78,
              description: "CI/CD, Docker, and cloud deployment",
            },
          ].map((item, index) => (
            <Card key={item.title} className="glass-card border-0 text-center">
              <CardContent className="p-8">
                <motion.div
                  className="relative w-24 h-24 mx-auto mb-4"
                  initial={{ rotate: 0 }}
                  animate={inView ? { rotate: 360 } : {}}
                  transition={{ duration: 2, delay: 1 + index * 0.2 }}
                >
                  <svg className="w-24 h-24 transform -rotate-90">
                    <circle
                      cx="48"
                      cy="48"
                      r="40"
                      stroke="rgba(255, 255, 255, 0.1)"
                      strokeWidth="8"
                      fill="none"
                    />
                    <motion.circle
                      cx="48"
                      cy="48"
                      r="40"
                      stroke={index % 2 === 0 ? "#00b4d8" : "#7209b7"}
                      strokeWidth="8"
                      fill="none"
                      strokeLinecap="round"
                      initial={{ pathLength: 0 }}
                      animate={
                        inView ? { pathLength: item.percentage / 100 } : {}
                      }
                      transition={{ duration: 2, delay: 1 + index * 0.2 }}
                      style={{ pathLength: 0 }}
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-2xl font-bold text-white">
                      {item.percentage}%
                    </span>
                  </div>
                </motion.div>
                <h4 className="text-xl font-bold text-white mb-2">
                  {item.title}
                </h4>
                <p className="text-gray-400 text-sm">{item.description}</p>
              </CardContent>
            </Card>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
