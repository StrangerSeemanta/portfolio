"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Send, Mail, Phone, MapPin, Loader2, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { ParticleField } from "@/components/particleField";

const contactInfo = [
  {
    icon: Mail,
    title: "Email",
    value: "ssworkmail22@example.com",
    href: "mailto:ssworkmail22@example.com",
  },
  {
    icon: Phone,
    title: "Phone",
    value: "+8801336601546",
    href: "tel:+8801336601546",
  },
  {
    icon: MapPin,
    title: "Location",
    value: "Bangladesh",
    href: "https://maps.google.com/?q=Bangladesh",
  },
];

export function ContactSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success("Message sent successfully! I'll get back to you soon.");
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        throw new Error("Failed to send message");
      }
    } catch (error) {
      toast.error("Failed to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
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
          <h2 className="text-4xl md:text-5xl font-bold mb-6 gradient-text py-2">
            {`Let's Work Together`}{" "}
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            {` I'm always interested in new opportunities and exciting projects. 
            Let's discuss how we can bring your ideas to life.`}
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="pt-8 mb-16  rounded-xl"
        >
          <h3 className="text-3xl font-bold mb-6 gradient-text">
            Available For
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              "Full-time opportunities",
              "Freelance projects",
              "Consulting & mentoring",
              "Open source collaborations",
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 1 + index * 0.1 }}
                className="glass-card p-4 rounded-xl hover:scale-105 transition-all duration-300 group"
              >
                <div className="flex items-center space-x-3">
                  <div
                    className="w-3 h-3 bg-gradient-to-r from-[#00b4d8] to-[#7209b7] rounded-full 
                    group-hover:scale-125 transition-transform duration-300"
                  />
                  <span className="text-white group-hover:text-[#00b4d8] transition-colors">
                    {item}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
        {/* Email & Form */}
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-3xl font-bold mb-6 gradient-text">
                Get In Touch
              </h3>
              <p className="text-gray-400 mb-8 leading-relaxed">
                {`Feel free to reach out for collaborations, job opportunities, or
              just to say hello. I'm always excited to connect with fellow
              developers and potential clients.`}
              </p>
            </div>

            <div className="space-y-6">
              {contactInfo.map((info, index) => (
                <motion.a
                  key={info.title}
                  href={info.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                  className="flex items-center space-x-4 p-6 glass-card rounded-xl hover-glow transition-all duration-300 group hover:scale-105"
                >
                  <div className="flex-shrink-0 w-14 h-14 bg-gradient-to-r from-[#00b4d8] to-[#7209b7] rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <info.icon className="w-7 h-7 text-white" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-lg font-semibold text-white mb-1">
                      {info.title}
                    </h4>
                    <p className="text-gray-400 hover:text-[#00b4d8] transition-colors">
                      {info.value}
                    </p>
                  </div>
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Card className="glass-card border-0">
              <CardHeader>
                <div className="flex justify-between items-center">
                  {" "}
                  <h3 className="text-3xl font-bold flex  gradient-text">
                    Send Me A Message{" "}
                  </h3>{" "}
                  <Heart className="w-8 ml-3 h-8 text-red-500 fill-current" />
                </div>
              </CardHeader>
              <CardContent className="p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-white">
                        Name *
                      </Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="glass border-gray-600 focus:border-[#00b4d8] bg-transparent text-white placeholder-gray-400"
                        placeholder="Your name"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-white">
                        Email *
                      </Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="glass border-gray-600 focus:border-[#00b4d8] bg-transparent text-white placeholder-gray-400"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject" className="text-white">
                      Subject *
                    </Label>
                    <Input
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="glass border-gray-600 focus:border-[#00b4d8] bg-transparent text-white placeholder-gray-400"
                      placeholder="What's this about?"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message" className="text-white">
                      Message *
                    </Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      className="glass border-gray-600 focus:border-[#00b4d8] bg-transparent text-white placeholder-gray-400 resize-none"
                      placeholder="Tell me about your project or how I can help..."
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-[#00b4d8] to-[#7209b7] hover:from-[#00a2c7] hover:to-[#6508a6] text-white py-3 text-lg hover-glow"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5 mr-2" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
