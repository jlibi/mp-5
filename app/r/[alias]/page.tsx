import { getUrl } from "@/lib/url";
import { redirect } from "next/navigation";

export default async function RedirectPage({
    params
}: {
    params: { alias: string } }) {
    const entry = await getUrl(params.alias);
    if (entry) {
        redirect(entry.url);
    }
    return <p>Alias not found</p>;
}