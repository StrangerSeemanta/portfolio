import { fetchProjects } from "@/lib/db/fetchProjects";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const projects = await fetchProjects();
    return NextResponse.json(projects);
  } catch (error) {
      return NextResponse.json(
      { error: "Internal server error"+" "+String(error) },
      { status: 500 }
    );
  }
}
