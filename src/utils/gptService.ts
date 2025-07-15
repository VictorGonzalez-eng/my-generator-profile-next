import { Profile } from '../components/ProfileCard';

export async function generateProfileFromWebsite(url: string): Promise<Profile> {
  const response = await fetch("/api/generate-profile", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ url })
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.details || "Failed to fetch profile.");
  }

  const data = await response.json();
  return data.profile;
}
