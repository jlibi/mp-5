"use client";

import { useState } from "react";
import { Box, Button, TextField, Typography, Paper } from "@mui/material";

export default function HomePage() {
    const [url, setUrl] = useState("");
    const [alias, setAlias] = useState("");
    const [shortUrl, setShortUrl] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setShortUrl("");

        try {
            const response = await fetch("/api/shorten", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ url, alias }),
            });

            const data = await response.json();

            if (!response.ok) {
                setError(data.error || "Something went wrong");
            } else {
                setShortUrl(`${window.location.origin}/r/${alias}`);
            }
        } catch (err) {
            console.error("Fetch error:", err);
            setError("Failed to shorten URL due to a network error.");
        }
    };

    return (
        <Box className="flex items-center justify-center min-h-screen">
            <Paper elevation={6} className="max-w-md p-6 bg-white shadow-lg rounded-lg">
                <Typography variant="h4" gutterBottom>
                    URL Shortener
                </Typography>

                {error && (
                    <Typography variant="body1" color="error" className="mb-4">
                        {error}
                    </Typography>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <TextField
                        label="Enter a valid URL"
                        variant="outlined"
                        fullWidth
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        sx={{ borderColor: "blue", borderRadius: 2 }}
                    />

                    <TextField
                        label="Choose your custom alias"
                        variant="outlined"
                        fullWidth
                        value={alias}
                        onChange={(e) => setAlias(e.target.value)}
                        sx={{ borderColor: "blue", borderRadius: 2, mt: 2 }} // Added margin-top for spacing
                    />

                    <Button type="submit" variant="contained" sx={{ bgcolor: "#2e86c1" }} fullWidth>
                        Shorten URL
                    </Button>
                </form>

                {shortUrl && (
                    <Paper className="border border-gray-300 p-4 mt-4 text-center rounded-lg">
                        <Typography variant="h6">Your Shortened URL:</Typography>
                        <Typography variant="body1" className="pt-2">
                            <a
                                href={shortUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-400 hover:underline px-2 py-1"
                            >
                                {shortUrl}
                            </a>
                        </Typography>
                        <Button
                            variant="outlined"
                            color="secondary"
                            onClick={() => navigator.clipboard.writeText(shortUrl)}
                            className="mt-2"
                        >
                            Copy
                        </Button>
                    </Paper>
                )}
            </Paper>
        </Box>
    );
}
