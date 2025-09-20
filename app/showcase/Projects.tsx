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
      if (data) {
        setProjects(data);
        setFilteredProjects(data);
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
          (project) => project.category === catagory
        );
        setFilteredProjects(filtered);
      }
    },
    [projects]
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
        <div className="grid grid-cols-1 md:grid-cols-2 md:px-28 gap-6 auto-rows-auto ">
          {/* Projects will be rendered here */}
          {isFetching ? (
            <div className="col-span-2 text-center py-10">
              <p className="text-gray-400">Loading projects...</p>
            </div>
          ) : filteredProjects && filteredProjects.length > 0 ? (
            filteredProjects.map((project, index) => (
              <div key={project.id + String(index)}>
                <Card className="project-card glass-card border-0 h-full hover:scale-[1.02] transition-transform duration-300 hover-glow">
                  <CardContent className="p-0 flex flex-col h-full">
                    {project.image && (
                      <div className="relative">
                        <div className="w-full h-[200px] overflow-hidden rounded-t-lg">
                          <Image
                            src={project.image}
                            alt={project.title}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            className="object-cover rounded-t-lg"
                            priority
                          />
                        </div>
                        {project.featured && (
                          <Badge className="absolute top-3 left-3 bg-gradient-to-r from-[#00b4d8] to-[#7209b7] animate-pulse">
                            Featured
                          </Badge>
                        )}
                      </div>
                    )}

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
                        {project.tech.slice(0, 3).map((tech,idx) => (
                          <Badge
                            key={tech+String(idx)}
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
                        <ProjectDialog
                          project={{ ...project, id: project.id.toString() }}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))
          ) : (
            <div className="col-span-2 text-center py-10">
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
