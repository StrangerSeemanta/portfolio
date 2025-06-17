"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ExternalLink, Github, Filter, ExternalLinkIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

import Image from "next/image";
import ProjectDialog from "../projectDialog";
import Link from "next/link";
export interface ProjectType {
  id: number;
  title: string;
  category: string;
  description: string;
  image: string;
  tech: string[];
  liveUrl: string;
  githubUrl: string;
  featured: boolean;
  details: {
    overview: string;
    features: string[];
    challenges: string;
  };
}
const projects: ProjectType[] = [
  {
    id: 1,
    title: "E-Commerce Platform",
    category: "Full-Stack",
    description:
      "A complete e-commerce solution with React, Node.js, and MongoDB featuring payment integration, admin panel, and real-time inventory management.",
    image:
      "https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    tech: ["React", "Node.js", "MongoDB", "Stripe", "JWT"],
    liveUrl: "https://demo-ecommerce.com",
    githubUrl: "https://github.com/shuvosarker/ecommerce",
    featured: true,
    details: {
      overview:
        "Built a comprehensive e-commerce platform from scratch with modern technologies and best practices.",
      features: [
        "User authentication and authorization",
        "Product catalog with search and filtering",
        "Shopping cart and checkout process",
        "Payment integration with Stripe",
        "Admin dashboard for inventory management",
        "Real-time order tracking",
      ],
      challenges:
        "Implemented complex state management, optimized database queries, and ensured secure payment processing.",
    },
  },
  {
    id: 2,
    title: "POS System",
    category: "Full-Stack",
    description:
      "Point of Sale system for restaurants with real-time order management, inventory tracking, and analytics dashboard.",
    image:
      "https://images.pexels.com/photos/4386321/pexels-photo-4386321.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    tech: ["React", "Express", "PostgreSQL", "Socket.io", "Chart.js"],
    liveUrl: "https://demo-pos.com",
    githubUrl: "https://github.com/shuvosarker/pos-system",
    featured: true,
    details: {
      overview:
        "Developed a comprehensive POS system for restaurants with real-time capabilities.",
      features: [
        "Real-time order management",
        "Inventory tracking and alerts",
        "Sales analytics and reporting",
        "Multi-location support",
        "Staff management system",
        "Receipt printing integration",
      ],
      challenges:
        "Handled real-time data synchronization across multiple devices and locations.",
    },
  },
  {
    id: 3,
    title: "Task Management App",
    category: "Frontend",
    description:
      "Modern task management application with drag-and-drop functionality, team collaboration, and progress tracking.",
    image:
      "https://images.pexels.com/photos/669622/pexels-photo-669622.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    tech: ["React", "TypeScript", "Tailwind CSS", "React DnD"],
    liveUrl: "https://demo-tasks.com",
    githubUrl: "https://github.com/shuvosarker/task-manager",
    featured: false,
    details: {
      overview:
        "Created an intuitive task management application with modern UI/UX design.",
      features: [
        "Drag and drop task organization",
        "Team collaboration tools",
        "Progress tracking and analytics",
        "Deadline management",
        "File attachment support",
        "Dark/light theme toggle",
      ],
      challenges:
        "Implemented complex drag-and-drop interactions while maintaining performance.",
    },
  },
  {
    id: 4,
    title: "Weather Dashboard",
    category: "Frontend",
    description:
      "Beautiful weather dashboard with location-based forecasts, interactive maps, and data visualization.",
    image:
      "https://images.pexels.com/photos/1118873/pexels-photo-1118873.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    tech: ["React", "OpenWeather API", "Chart.js", "Mapbox"],
    liveUrl: "https://demo-weather.com",
    githubUrl: "https://github.com/shuvosarker/weather-dashboard",
    featured: false,
    details: {
      overview:
        "Built a comprehensive weather dashboard with beautiful visualizations.",
      features: [
        "Location-based weather data",
        "7-day weather forecast",
        "Interactive weather maps",
        "Weather alerts and notifications",
        "Historical weather data",
        "Responsive design",
      ],
      challenges:
        "Integrated multiple APIs and created smooth data visualization animations.",
    },
  },
];

const categories = ["All", "Full-Stack", "Frontend", "Backend"];

export function ProjectsSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedProject, setSelectedProject] = useState<
    (typeof projects)[0] | null
  >(null);

  const filteredProjects =
    selectedCategory === "All"
      ? projects
      : projects.filter((project) => project.category === selectedCategory);

  return (
    <section
      id="projects"
      className="relative py-20 px-4 sm:px-6 lg:px-8 "
      ref={ref}
    >
      <div className="relative z-10 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">
            Featured Projects
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            A showcase of my recent work, demonstrating expertise in full-stack
            development and modern web technologies.
          </p>
        </motion.div>
        {/* Show All Works */}
        <div className="w-full my-12 flex justify-center items-center">
          <Link href={"showcase"}>
            <Button size={"lg"} variant={"themed_glowing"}>
              View All Works <ExternalLinkIcon className="ml-3" />
            </Button>
          </Link>
        </div>
        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          <Filter className="w-5 h-5 text-gray-400 self-center mr-2" />
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              onClick={() => setSelectedCategory(category)}
              className={`${
                selectedCategory === category
                  ? "bg-gradient-to-r from-[#00b4d8] to-[#7209b7] text-white"
                  : "border-[#00b4d8] text-[#00b4d8] hover:bg-[#00b4d8] hover:text-white"
              }`}
            >
              {category}
            </Button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 md:px-28 gap-6 auto-rows-auto"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ staggerChildren: 0.2 }}
        >
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
                ease: "easeOut",
              }}
            >
              <Card className="project-card glass-card border-0 h-full hover:scale-[1.02] transition-transform duration-300 hover-glow">
                <CardContent className="p-0 flex flex-col h-full">
                  <div className="relative">
                    <Image
                      src={project.image}
                      alt={project.title}
                      width={400}
                      height={225}
                      className="w-full h-[200px] object-cover rounded-t-lg"
                      priority={project.featured}
                    />
                    {project.featured && (
                      <Badge className="absolute top-3 left-3 bg-gradient-to-r from-[#00b4d8] to-[#7209b7] animate-pulse">
                        Featured
                      </Badge>
                    )}
                  </div>

                  <div className="p-5 space-y-4 flex-1 flex flex-col">
                    <div>
                      <h3 className="text-xl font-bold text-white mb-2 hover:text-[#00b4d8] transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-gray-400 text-sm line-clamp-2">
                        {project.description}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-2 mt-auto">
                      {project.tech.slice(0, 3).map((tech) => (
                        <Badge
                          key={tech}
                          variant="secondary"
                          className="text-xs bg-opacity-20 hover:bg-opacity-30 transition-all"
                        >
                          {tech}
                        </Badge>
                      ))}
                      {project.tech.length > 3 && (
                        <Badge variant="secondary" className="text-xs">
                          +{project.tech.length - 3}
                        </Badge>
                      )}
                    </div>

                    <div className="flex items-center justify-between pt-3">
                      <div className="flex space-x-2">
                        <Button
                          size="sm"
                          variant="ghost"
                          className="hover:scale-110 transition-transform"
                          asChild
                        >
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-[#00b4d8]"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="hover:scale-110 transition-transform"
                          asChild
                        >
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-[#00b4d8]"
                          >
                            <Github className="w-4 h-4" />
                          </a>
                        </Button>
                      </div>
                      <ProjectDialog project={project} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
