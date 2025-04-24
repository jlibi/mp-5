import { getUrl } from "@/lib/url";
import { redirect } from "next/navigation";

export default async function RedirectPage({ params }: { params: { alias: string } }) {
    console.log("Alias received:", params.alias); // Debugging step

    const entry = await getUrl(params.alias);

    if (!entry) {
        return <p>Alias not found</p>;
    }

    redirect(entry.url);
}
