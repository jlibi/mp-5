import { NextResponse } from "next/server";
import { createNewUrl, isValidUrl } from "@/lib/url";

export async function POST(request: Request) {
    const { alias, url } = await request.json();

    if (!alias || !url) {
        return NextResponse.json({ error: "Missing alias or URL" }, { status: 400 });
    }

    if (!isValidUrl(url)) {
        return NextResponse.json({ error: "Invalid URL format" }, { status: 400 });
    }

    const created = await createNewUrl({ alias, url });
    if (!created) {
        return NextResponse.json({ error: "Alias already taken!" }, { status: 409 });
    }

    return NextResponse.json({ message: "URL shortened successfully", alias }, { status: 201 });
}
