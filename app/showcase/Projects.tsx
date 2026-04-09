"use client";
import React, { useCallback, useEffect, useState } from "react";
import { fetchProjectsActions } from "../actions/fetchProjectsAction";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { ExternalLink, Github, Filter, ExternalLinkIcon } from "lucide-react";
import ProjectDialog from "@/components/projectDialog";
import { ProjectType } from "@/lib/db/projectProps";

const categories = ["All", "Full-Stack", "Frontend", "Backend"];

function Projects() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isFetching, setIsFetching] = useState(true);
  const [projects, setProjects] = useState<ProjectType[] | null>(null);
  const [filteredProjects, setFilteredProjects] = useState<
    ProjectType[] | null
  >(projects);
  const fetchProjct = useCallback(async () => {
    try {
      const data = await fetchProjectsActions();
      const data_without_hiddens = data.filter((value) => !value.hidden);
      if (data) {
        setProjects(data_without_hiddens);
        setFilteredProjects(data_without_hiddens);
        setSelectedCategory("All");
      } else {
        console.error("No projects found");
      }
    } catch (error) {
      console.error("Failed to fetch projects:", error);
    } finally {
      setIsFetching(false);
    }
  }, []);
  useEffect(() => {
    fetchProjct();
  }, [fetchProjct]);

  const handleFilterProjects = useCallback(
    (catagory: string) => {
      if (!projects) return;
      setSelectedCategory(catagory);
      if (catagory === "All") {
        setFilteredProjects(projects);
      } else {
        const filtered = projects.filter(
          (project) => project.category === catagory,
        );
        setFilteredProjects(filtered);
      }
    },
    [projects],
  );
  return (
    <>
      <div className="flex flex-wrap justify-center gap-4 mb-12">
        <Filter className="w-5 h-5 text-gray-400 self-center " />
        {categories.map((category, idx) => (
          <Button
            type="submit"
            key={category + String(idx)}
            variant={selectedCategory === category ? "default" : "outline"}
            onClick={(e) => {
              e.preventDefault();
              handleFilterProjects(category);
            }}
            className={`${
              selectedCategory === category
                ? "bg-gradient-to-r from-[#00b4d8] to-[#7209b7] text-white"
                : "border-[#00b4d8] text-[#00b4d8] hover:bg-[#00b4d8] hover:text-white"
            }`}
          >
            {category}
          </Button>
        ))}
      </div>
      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="space-y-4">
          {/* Projects will be rendered here */}
          {isFetching ? (
            <div className="text-center py-10">
              <p className="text-gray-400">Loading projects...</p>
            </div>
          ) : filteredProjects && filteredProjects.length > 0 ? (
            filteredProjects.map((project, index) => (
              <Card
                key={project.id + String(index)}
                className="project-card glass-card border-0 hover:scale-[1.01] group transition-transform duration-300 hover-glow"
              >
                <CardContent className="p-4">
                  <div className="flex md:items-center gap-4 ">
                    {/* Thumbnail */}
                    {project.image && (
                      <div className="flex-shrink-0 hidden md:block">
                        <div className="relative w-full md:w-32 h-32 md:h-20 rounded-lg overflow-hidden">
                          <Image
                            src={project.image}
                            alt={project.title}
                            fill
                            sizes="(max-width: 768px) 100vw, 128px"
                            className="object-cover"
                            priority
                          />
                        </div>
                      </div>
                    )}

                    {/* Project Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between flex-wrap gap-4">
                        <div className="min-w-0">
                          <h3 className="text-lg md:text-xl font-bold text-white group-hover:text-[#00b4d8] transition-colors">
                            {project.title}
                          </h3>
                          <p className="text-gray-400 text-sm line-clamp-1 hidden md:block">
                            {project.description}
                          </p>
                          <div className="mt-2 flex flex-wrap gap-1">
                            {project.tech.map((tech, idx) => (
                              <Badge
                                key={tech + String(idx)}
                                variant="outline"
                                className="text-xs text-gray-400 border-gray-400"
                              >
                                {tech}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        {/* Links */}
                        <div className="flex-shrink-0 flex space-x-2">
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
                          <div>
                            <ProjectDialog
                              project={{
                                ...project,
                                id: project.id.toString(),
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="text-center py-10">
              <p className="text-gray-400">
                No projects found in this category.
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Projects;
