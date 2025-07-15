'use client';

import React from "react";

export type Profile = {
  company_name: string | null;
  company_description: string | null;
  service_line: string[];
  tier1_keywords: string[];
  tier2_keywords: string[];
  emails: string[];
  poc: string | null;
};

type Props = {
  profile: Profile;
  onChange: (profile: Profile) => void;
};

export function ProfileCard({ profile, onChange }: Props) {

  function updateField<K extends keyof Profile>(field: K, value: Profile[K]) {
    onChange({ ...profile, [field]: value });
  }

  function exportProfileAsJson() {
    const profileToExport = {
      company_name: profile.company_name,
      company_description: profile.company_description,
      service_line: profile.service_line,
      tier1_keywords: profile.tier1_keywords,
      tier2_keywords: profile.tier2_keywords,
      emails: profile.emails,
      poc: profile.poc,
    };

    const jsonString = JSON.stringify(profileToExport, null, 2);
    const blob = new Blob([jsonString], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${profile.company_name || 'company-profile'}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  return (
    <div className="border p-4 rounded shadow">
      <div className="mb-2">
        <label className="block font-bold">Company Name</label>
        <input
          type="text"
          value={profile.company_name || ''}
          onChange={(e) => updateField("company_name", e.target.value)}
          className="border p-2 rounded w-full"
        />
      </div>

      <div className="mb-2">
        <label className="block font-bold">Company Description</label>
        <textarea
          value={profile.company_description || ''}
          onChange={(e) => updateField("company_description", e.target.value)}
          className="border p-2 rounded w-full"
        />
      </div>
      <div className="mb-2">
        <label className="block font-bold">Service(s) Line(s)</label>
        <input
          type="text"
          value={profile.service_line || ''}
          onChange={(e) => updateField("service_line", e.target.value.split(", ").map(s => s.trim()).filter(Boolean))}
          className="border p-2 rounded w-full"
        />
      </div>

      <div className="mb-2">
        <label className="block font-bold">Tier 1 Keywords</label>
        <input
          type="text"
          value={profile.tier1_keywords?.join(", ") || ''}
          onChange={(e) => updateField("tier1_keywords", e.target.value.split(", ").map(s => s.trim()).filter(Boolean))}
          className="border p-2 rounded w-full"
        />
      </div>

      <div className="mb-2">
        <label className="block font-bold">Tier 2 Keywords</label>
        <input
          type="text"
          value={profile.tier2_keywords?.join(", ") || ''}
          onChange={(e) => updateField("tier2_keywords", e.target.value.split(", ").map(s => s.trim()).filter(Boolean))}
          className="border p-2 rounded w-full"
        />
      </div>

      <div className="mb-2">
        <label className="block font-bold">Emails</label>
        <input
          type="text"
          value={profile.emails?.join(", ") || ''}
          onChange={(e) => updateField("emails", e.target.value.split(", ").map(s => s.trim()).filter(Boolean))}
          className="border p-2 rounded w-full"
        />
      </div>

      <div className="mb-2">
        <label className="block font-bold">POC</label>
        <input
          type="text"
          value={profile.poc || ''}
          onChange={(e) => updateField("poc", e.target.value)}
          className="border p-2 rounded w-full"
        />
      </div>
      <p className="text-sm text-gray-500 mt-1">
        **PS:** Use comma (,) if you want to separate items (Service line works too).
      </p>
      <button
        className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        onClick={exportProfileAsJson}
      >
        Export Profile as JSON
      </button>
    </div>
  );
}