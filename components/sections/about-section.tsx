"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Calendar, MapPin, Coffee, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ParticleField } from "@/components/particle-field";

const timelineEvents = [
  {
    year: "2024",
    title: "Senior Full-Stack Developer",
    company: "Tech Innovations Inc.",
    description:
      "Leading development of microservices architecture and mentoring junior developers.",
  },
  {
    year: "2022",
    title: "Full-Stack Developer",
    company: "Digital Solutions Co.",
    description:
      "Built scalable e-commerce platforms serving 100k+ users with React and Node.js.",
  },
  {
    year: "2020",
    title: "Frontend Developer",
    company: "Creative Agency",
    description:
      "Specialized in React development and responsive web design for client projects.",
  },
  {
    year: "2019",
    title: "Started Coding Journey",
    company: "Self-Taught",
    description:
      "Began learning web development through online courses and building personal projects.",
  },
];

const stats = [
  { label: "Years Experience", value: "5+" },
  { label: "Projects Completed", value: "50+" },
  { label: "Happy Clients", value: "30+" },
  { label: "Code Commits", value: "2000+" },
];

export function AboutSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <>
      <section
        id="about"
        className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden"
        ref={ref}
      >
        <ParticleField />
        <div className="relative z-10 max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">
              About Me
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              {`Passionate full-stack developer with a love for creating innovative solutions 
            that make a difference in people's lives.`}
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Left Column - Personal Info & Stats */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-8"
            >
              <Card className="glass-card border-0">
                <CardContent className="p-8">
                  <div className="space-y-6">
                    <div className="flex items-center space-x-3 text-gray-300">
                      <MapPin className="w-5 h-5 text-[#00b4d8]" />
                      <span>San Francisco, CA</span>
                    </div>
                    <div className="flex items-center space-x-3 text-gray-300">
                      <Calendar className="w-5 h-5 text-[#00b4d8]" />
                      <span>Available for new opportunities</span>
                    </div>
                    <div className="flex items-center space-x-3 text-gray-300">
                      <Coffee className="w-5 h-5 text-[#00b4d8]" />
                      <span>Powered by coffee and curiosity</span>
                    </div>
                    <div className="flex items-center space-x-3 text-gray-300">
                      <Heart className="w-5 h-5 text-[#00b4d8]" />
                      <span>Love for clean, efficient code</span>
                    </div>
                  </div>

                  <div className="mt-8 pt-8 border-t border-gray-700">
                    <p className="text-gray-300 leading-relaxed mb-6">
                      {`I'm a passionate full-stack developer with 5+ years of experience building 
                    scalable web applications. I specialize in the MERN stack and have a deep 
                    understanding of modern development practices, cloud technologies, and user 
                    experience design.`}
                    </p>
                    <Button className="bg-gradient-to-r from-[#00b4d8] to-[#7209b7] hover:from-[#00a2c7] hover:to-[#6508a6]">
                      Download Resume
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4">
                {stats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                  >
                    <Card className="glass-card border-0 text-center p-6">
                      <CardContent className="p-0">
                        <div className="text-3xl font-bold gradient-text mb-2">
                          {stat.value}
                        </div>
                        <div className="text-gray-400 text-sm">
                          {stat.label}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Right Column */}
          </div>
        </div>
      </section>

      {/* Timeline */}

      <section
        id="journey"
        className="relative   px-4 sm:px-6 lg:px-8 overflow-hidden"
      >
        {" "}
        <ParticleField />
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="space-y-6 lg:max-w-xl lg:mx-auto"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-10 gradient-text">
            My Journey
          </h2>{" "}
          <div className="relative">
            {timelineEvents.map((event, index) => (
              <motion.div
                key={event.year}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="relative flex items-start space-x-6 pb-8 mb-10"
              >
                {/* Timeline Dot */}
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="flex-shrink-0 w-12 h-12 glass-card rounded-full flex items-center justify-center z-[99999]"
                >
                  <div className="w-3 h-3 bg-gradient-to-r from-[#00b4d8] to-[#7209b7] rounded-full" />
                </motion.div>

                {/* Timeline Line */}
                {index < timelineEvents.length - 1 && (
                  <motion.div
                    initial={{ scaleY: 0 }}
                    whileInView={{ scaleY: 1 }}
                    transition={{ duration:1, delay: 0.5 }}
                    style={{ originY: 0 }}
                    className="absolute left-0 top-0 h-[calc(100%-2rem+24px+12px+40px)] w-0.5 bg-gradient-to-b from-[#00b4d8] to-[#7209b7] transform"
                  />
                )}

                {/* Content */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.7, delay: 0.2 }}
                  className="flex-1"
                >
                  <Card className="glass-card border-0">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-lg font-semibold text-white">
                          {event.title}
                        </h4>
                        <span className="text-sm text-[#00b4d8] font-medium">
                          {event.year}
                        </span>
                      </div>
                      <p className="text-[#7209b7] font-medium mb-2">
                        {event.company}
                      </p>
                      <p className="text-gray-400 text-sm">
                        {event.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>
    </>
  );
}
