
import React, { useEffect, useState } from "react";
export default function ConnectionCard({ user }) {

  const {
    firstName,
    lastName,
    name, // fallback if your API sends a single name
    age,
    profession,
    location,
    about,
    avatarUrl,
    profilePic,
  } = user || {};

  const displayName = name || [firstName, lastName].filter(Boolean).join(" ") || "Unknown User";
  const avatar = avatarUrl || profilePic || defaultAvatar;

  return (
    <div className="group rounded-2xl border border-gray-200 bg-white p-4 shadow-sm transition-shadow hover:shadow-md">
      <div className="flex items-center gap-4">
        <img
          src={avatar}
          alt={displayName}
          className="h-16 w-16 rounded-full object-cover ring-1 ring-gray-200"
          loading="lazy"
        />
        <div className="min-w-0">
          <h3 className="truncate text-lg font-semibold text-gray-900">{displayName}</h3>
          <p className="text-sm text-gray-500">
            {age ? `Age ${age}` : "Age —"}
            {profession ? ` · ${profession}` : ""}
          </p>
          {location && <p className="text-xs text-gray-400">{location}</p>}
        </div>
      </div>

      {about && (
        <p className="mt-3 line-clamp-3 text-sm text-gray-700">{about}</p>
      )}

      <div className="mt-4 flex items-center justify-between">
        <button
          type="button"
          className="rounded-xl border border-gray-300 px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Message
        </button>
        <div className="flex gap-2">
          <button
            type="button"
            className="rounded-xl bg-gray-100 px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-200"
          >
            Remove
          </button>
          <button
            type="button"
            className="rounded-xl bg-indigo-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-indigo-700"
          >
            View
          </button>
        </div>
      </div>
    </div>
  );
}
