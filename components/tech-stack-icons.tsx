"use client";

import { motion } from 'framer-motion';
import { 
  Code2, 
  Database, 
  Globe, 
  Smartphone, 
  Cloud, 
  Zap 
} from 'lucide-react';

const techIcons = [
  { icon: Code2, color: '#00b4d8', position: { x: -40, y: -20 }, delay: 0.5 },
  { icon: Database, color: '#7209b7', position: { x: 40, y: -20 }, delay: 0.7 },
  { icon: Globe, color: '#00b4d8', position: { x: -40, y: 20 }, delay: 0.9 },
  { icon: Smartphone, color: '#7209b7', position: { x: 40, y: 20 }, delay: 1.1 },
  { icon: Cloud, color: '#00b4d8', position: { x: 0, y: -40 }, delay: 1.3 },
  { icon: Zap, color: '#7209b7', position: { x: 0, y: 40 }, delay: 1.5 },
];

export function TechStackIcons() {
  return (
    <div className="relative w-24 h-24">
      {techIcons.map(({ icon: Icon, color, position, delay }, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay, duration: 0.5 }}
          className="absolute"
          style={{
            left: `calc(50% + ${position.x}px)`,
            top: `calc(50% + ${position.y}px)`,
            transform: 'translate(-50%, -50%)',
          }}
        >
          <motion.div
            animate={{ 
              y: [0, -8, 0],
              rotate: [0, 3, -3, 0]
            }}
            transition={{ 
              duration: 4,
              repeat: Infinity,
              delay: index * 0.3
            }}
            className="w-10 h-10 glass-card rounded-full flex items-center justify-center hover-glow"
          >
            <Icon 
              className="w-5 h-5" 
              style={{ color }}
            />
          </motion.div>
        </motion.div>
      ))}
    </div>
  );
}