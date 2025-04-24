import { getUrl } from "@/lib/url";
import { redirect } from "next/navigation";

export default async function RedirectPage({ params }: { params: { alias: string } }) {
    // Debugging: Ensure alias is properly received
    console.log("Alias received:", params.alias);

    // Fetch the URL entry from the database
    const entry = await getUrl(params.alias);

    // Handle missing alias
    if (!entry) {
        return <p>Alias not found</p>;
    }

    // Redirect to the target URL
    redirect(entry.url);
}
