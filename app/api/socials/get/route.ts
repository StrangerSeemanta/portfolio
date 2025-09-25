import { getSocialMediaData, SocialData } from "@/lib/db/socialdata";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const social_data_list = await getSocialMediaData();
  const o: { [key: string]: SocialData } = {};
  if (!social_data_list)
    return NextResponse.json(
      { error: "no social media handler data found" },
      { status: 404 }
    );
 
  return NextResponse.json(social_data_list);
}
