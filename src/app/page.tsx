'use client';

import React, { useState } from "react";
import { ProfileForm } from "../components/ProfileForm";
import { ProfileCard } from "../components/ProfileCard";
import { type Profile } from '../components/ProfileCard';

export default function Home() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const handleProfileChange = (newProfile: Profile) => {
    setProfile(newProfile);
  };

  return (
    <main className="p-4 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Company Profile Generator</h1>
      <ProfileForm onProfileGenerated={handleProfileChange} />
      {profile && (
        <ProfileCard profile={profile} onChange={handleProfileChange} />
      )}
    </main>
  );
}