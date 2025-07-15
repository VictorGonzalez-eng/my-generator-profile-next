'use client';

import React, { useState } from "react";
import { Profile } from './ProfileCard';
import { generateProfileFromWebsite } from "../utils/gptService";

type Props = {
  onProfileGenerated: (profile: Profile) => void;
};

export function ProfileForm({ onProfileGenerated }: Props) {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleGenerate() {
    setLoading(true);
    const profile = await generateProfileFromWebsite(url);
    onProfileGenerated(profile);
    setLoading(false);
  }

  return (
    <div className="mb-6">
      <input
        type="text"
        placeholder="Enter company website URL"
        className="border p-2 rounded w-full mb-2"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />
      <button
        className="bg-blue-600 text-white px-4 py-2 rounded"
        onClick={handleGenerate}
        disabled={loading}
      >
        {loading ? "Generating..." : "Generate Profile"}
      </button>
    </div>
  );
}