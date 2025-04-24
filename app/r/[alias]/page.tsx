import { getUrl } from "@/lib/url";
import { redirect } from "next/navigation";

export default async function RedirectPage({ params }: { params: Promise<{ alias: string }> }) {
    // Await params—if it's not a Promise it will be wrapped in Promise.resolve
    const resolvedParams = await params;
    console.log("Alias received:", resolvedParams.alias);

    const entry = await getUrl(resolvedParams.alias);

    if (!entry) {
        return <p>Alias not found</p>;
    }

    redirect(entry.url);
}
