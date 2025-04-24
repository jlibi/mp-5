import getCollection, { URL_COLLECTION } from "@/lib/db";
import { UrlEntry } from "@/types";

// Validates whether a given URL is properly formatted.
export function isValidUrl(url: string): boolean {
    try {
        new URL(url);
        return true;
    } catch {
        return false;
    }
}

// Retrieves the URL entry associated with a given alias.
// Returns null if no entry is found.
export async function getUrl(alias: string): Promise<UrlEntry | null> {
    const collection = await getCollection(URL_COLLECTION);
    const result = await collection.findOne({ alias });
    if (!result) return null;

    // TypeScript assertions help ensure we return an object of type UrlEntry.
    return {
        alias: result.alias as string,
        url: result.url as string
    };
}

// Creates a new URL entry if the alias is unique.
// Returns null if the alias is already taken or on failure.
export async function createNewUrl(
    data: {
        alias: string;
        url: string
    }): Promise<UrlEntry | null> {
    const { alias, url } = data;
    const collection = await getCollection(URL_COLLECTION);

    // Check if this alias already exists in the database.
    const existingUrl = await collection.findOne({ alias });
    if (existingUrl)
        return null;

    // Insert the new alias-URL mapping into the database.
    const newEntry = { alias, url };
    const res = await collection.insertOne(newEntry);

    if (!res.acknowledged) return null;
    return newEntry;
}
