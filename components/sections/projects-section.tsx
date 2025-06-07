"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ExternalLink, Github, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { ParticleField } from '@/components/particle-field';

const projects = [
  {
    id: 1,
    title: 'E-Commerce Platform',
    category: 'Full-Stack',
    description: 'A complete e-commerce solution with React, Node.js, and MongoDB featuring payment integration, admin panel, and real-time inventory management.',
    image: 'https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
    tech: ['React', 'Node.js', 'MongoDB', 'Stripe', 'JWT'],
    liveUrl: 'https://demo-ecommerce.com',
    githubUrl: 'https://github.com/shuvosarker/ecommerce',
    featured: true,
    details: {
      overview: 'Built a comprehensive e-commerce platform from scratch with modern technologies and best practices.',
      features: [
        'User authentication and authorization',
        'Product catalog with search and filtering',
        'Shopping cart and checkout process',
        'Payment integration with Stripe',
        'Admin dashboard for inventory management',
        'Real-time order tracking'
      ],
      challenges: 'Implemented complex state management, optimized database queries, and ensured secure payment processing.',
    }
  },
  {
    id: 2,
    title: 'POS System',
    category: 'Full-Stack',
    description: 'Point of Sale system for restaurants with real-time order management, inventory tracking, and analytics dashboard.',
    image: 'https://images.pexels.com/photos/4386321/pexels-photo-4386321.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
    tech: ['React', 'Express', 'PostgreSQL', 'Socket.io', 'Chart.js'],
    liveUrl: 'https://demo-pos.com',
    githubUrl: 'https://github.com/shuvosarker/pos-system',
    featured: true,
    details: {
      overview: 'Developed a comprehensive POS system for restaurants with real-time capabilities.',
      features: [
        'Real-time order management',
        'Inventory tracking and alerts',
        'Sales analytics and reporting',
        'Multi-location support',
        'Staff management system',
        'Receipt printing integration'
      ],
      challenges: 'Handled real-time data synchronization across multiple devices and locations.',
    }
  },
  // {
  //   id: 3,
  //   title: 'Task Management App',
  //   category: 'Frontend',
  //   description: 'Modern task management application with drag-and-drop functionality, team collaboration, and progress tracking.',
  //   image: 'https://images.pexels.com/photos/1496192/pexels-photo-1496192.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
  //   tech: ['React', 'TypeScript', 'Tailwind CSS', 'React DnD'],
  //   liveUrl: 'https://demo-tasks.com',
  //   githubUrl: 'https://github.com/shuvosarker/task-manager',
  //   featured: false,
  //   details: {
  //     overview: 'Created an intuitive task management application with modern UI/UX design.',
  //     features: [
  //       'Drag and drop task organization',
  //       'Team collaboration tools',
  //       'Progress tracking and analytics',
  //       'Deadline management',
  //       'File attachment support',
  //       'Dark/light theme toggle'
  //     ],
  //     challenges: 'Implemented complex drag-and-drop interactions while maintaining performance.',
  //   }
  // },
  {
    id: 4,
    title: 'Weather Dashboard',
    category: 'Frontend',
    description: 'Beautiful weather dashboard with location-based forecasts, interactive maps, and data visualization.',
    image: 'https://images.pexels.com/photos/1118873/pexels-photo-1118873.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
    tech: ['React', 'OpenWeather API', 'Chart.js', 'Mapbox'],
    liveUrl: 'https://demo-weather.com',
    githubUrl: 'https://github.com/shuvosarker/weather-dashboard',
    featured: false,
    details: {
      overview: 'Built a comprehensive weather dashboard with beautiful visualizations.',
      features: [
        'Location-based weather data',
        '7-day weather forecast',
        'Interactive weather maps',
        'Weather alerts and notifications',
        'Historical weather data',
        'Responsive design'
      ],
      challenges: 'Integrated multiple APIs and created smooth data visualization animations.',
    }
  },
];

const categories = ['All', 'Full-Stack', 'Frontend', 'Backend'];

export function ProjectsSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);

  const filteredProjects = selectedCategory === 'All' 
    ? projects 
    : projects.filter(project => project.category === selectedCategory);

  return (
    <section id="projects" className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden" ref={ref}>
      <ParticleField />
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
            A showcase of my recent work, demonstrating expertise in full-stack development 
            and modern web technologies.
          </p>
        </motion.div>

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
                  ? 'bg-gradient-to-r from-[#00b4d8] to-[#7209b7] text-white'
                  : 'border-[#00b4d8] text-[#00b4d8] hover:bg-[#00b4d8] hover:text-white'
              }`}
            >
              {category}
            </Button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 * index }}
            >
              <Card className="project-card glass-card border-0 h-full hover-glow">
                <CardContent className="p-0">
                  <div className="relative overflow-hidden rounded-t-lg">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="project-image w-full h-48 object-cover"
                    />
                    {project.featured && (
                      <Badge className="absolute top-4 left-4 bg-gradient-to-r from-[#00b4d8] to-[#7209b7]">
                        Featured
                      </Badge>
                    )}
                  </div>
                  
                  <div className="p-6 space-y-4">
                    <div>
                      <h3 className="text-xl font-bold text-white mb-2">
                        {project.title}
                      </h3>
                      <p className="text-gray-400 text-sm line-clamp-3">
                        {project.description}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {project.tech.slice(0, 3).map((tech) => (
                        <Badge key={tech} variant="secondary" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                      {project.tech.length > 3 && (
                        <Badge variant="secondary" className="text-xs">
                          +{project.tech.length - 3}
                        </Badge>
                      )}
                    </div>

                    <div className="flex items-center justify-between pt-4">
                      <div className="flex space-x-2">
                        <Button size="sm" variant="ghost" asChild>
                          <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        </Button>
                        <Button size="sm" variant="ghost" asChild>
                          <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                            <Github className="w-4 h-4" />
                          </a>
                        </Button>
                      </div>
                      
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button 
                            size="sm" 
                            onClick={() => setSelectedProject(project)}
                            className="bg-gradient-to-r from-[#00b4d8] to-[#7209b7]"
                          >
                            View Details
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto glass-card border-0">
                          <DialogHeader>
                            <DialogTitle className="text-2xl gradient-text">
                              {project.title}
                            </DialogTitle>
                          </DialogHeader>
                          <div className="space-y-6">
                            <img
                              src={project.image}
                              alt={project.title}
                              className="w-full h-64 object-cover rounded-lg"
                            />
                            
                            <div>
                              <h4 className="text-lg font-semibold text-white mb-3">Overview</h4>
                              <p className="text-gray-400">{project.details.overview}</p>
                            </div>

                            <div>
                              <h4 className="text-lg font-semibold text-white mb-3">Key Features</h4>
                              <ul className="list-disc list-inside space-y-1 text-gray-400">
                                {project.details.features.map((feature, i) => (
                                  <li key={i}>{feature}</li>
                                ))}
                              </ul>
                            </div>

                            <div>
                              <h4 className="text-lg font-semibold text-white mb-3">Technologies Used</h4>
                              <div className="flex flex-wrap gap-2">
                                {project.tech.map((tech) => (
                                  <Badge key={tech} className="bg-gradient-to-r from-[#00b4d8] to-[#7209b7]">
                                    {tech}
                                  </Badge>
                                ))}
                              </div>
                            </div>

                            <div>
                              <h4 className="text-lg font-semibold text-white mb-3">Challenges & Solutions</h4>
                              <p className="text-gray-400">{project.details.challenges}</p>
                            </div>

                            <div className="flex space-x-4 pt-4">
                              <Button asChild className="bg-gradient-to-r from-[#00b4d8] to-[#7209b7]">
                                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                                  <ExternalLink className="w-4 h-4 mr-2" />
                                  Live Demo
                                </a>
                              </Button>
                              <Button variant="outline" asChild>
                                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                                  <Github className="w-4 h-4 mr-2" />
                                  View Code
                                </a>
                              </Button>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}