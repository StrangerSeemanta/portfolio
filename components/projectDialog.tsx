"use client";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Badge } from "./ui/badge";
import { ExternalLink, Github } from "lucide-react";
import { ProjectType } from "@/lib/db/projectProps";

function ProjectDialog({
  project,
  className,
}: {
  project: ProjectType;
  className?: string;
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm" variant={"themed_glowing"} className={className}>
          Synopsis
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto glass-card border-0">
        <DialogHeader>
          <DialogTitle className="text-2xl gradient-text">
            {project.title}
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-6">
          <Image
            src={project.image}
            alt={project.title}
            width={800}
            height={256}
            className="w-full h-64 object-cover rounded-lg"
            style={{
              width: "100%",
              height: "16rem",
              objectFit: "cover",
            }}
          />

          <div>
            <h4 className="text-lg font-semibold text-white mb-3">Overview</h4>
            <p className="text-gray-400">{project.details.overview}</p>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-white mb-3">
              Key Features
            </h4>
            <ul className="list-disc list-inside space-y-1 text-gray-400">
              {project.details.features.map((feature, i) => (
                <li key={String(i)+feature}>{feature}</li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-white mb-3">
              Technologies Used
            </h4>
            <div className="flex flex-wrap gap-2">
              {project.tech.map((tech,idx) => (
                <Badge
                  key={tech+String(idx)}
                  className="bg-gradient-to-r from-[#00b4d8] to-[#7209b7]"
                >
                  {tech}
                </Badge>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-white mb-3">
              Challenges & Solutions
            </h4>
            <p className="text-gray-400">{project.details.challenges}</p>
          </div>

          <div className="flex space-x-4 pt-4">
            <Button
              asChild
              className="bg-gradient-to-r from-[#00b4d8] to-[#7209b7]"
            >
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                Live Demo
              </a>
            </Button>
            <Button variant="outline" asChild>
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="w-4 h-4 mr-2" />
                View Code
              </a>
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default ProjectDialog;
