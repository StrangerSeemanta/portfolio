import { fetchProjects, fetchSingleProject } from "@/lib/db/fetchProjects";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const projects = await fetchProjects();
    return NextResponse.json(projects);
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" + " " + String(error) },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { projectId } = body;
    if (!projectId) {
      return NextResponse.json(
        { error: "Project Id is missing." },
        { status: 400 }
      );
    }
    if (typeof projectId !== "string") {
      return NextResponse.json(
        { error: "Project Id need to be string." },
        { status: 400 }
      );
    }
    const project = await fetchSingleProject(projectId);
    if (!project) {
      return NextResponse.json({ error: "No Projects Found" }, { status: 400 });
    }
    return NextResponse.json(project);
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" + " " + String(error) },
      { status: 500 }
    );
  }
}
