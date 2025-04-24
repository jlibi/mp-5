import { getUrl } from "@/lib/url";
import { redirect } from "next/navigation";

interface PageProps {
    params: { alias: string };
}

export default async function RedirectPage({
    params
}: PageProps) {
    const entry = await getUrl(params.alias);
    if (entry) {
        redirect(entry.url);
    }
    return <p>Alias not found</p>;
}