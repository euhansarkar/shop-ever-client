import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextApiRequest, res: NextApiResponse) {
    return NextResponse.json({ name: `file uploaded` })
}

