import React, { useEffect, useState } from "react";
import { useLazyGetAllConnectionsQuery } from "../connectionApi/connection";
import ConnectionCard from "./ConnectionCard";

const defaultAvatar =
    "https://ui-avatars.com/api/?name=User&background=EEE&color=111&size=256";


export default function Connection() {
    const [getAllConnections, { isLoading }] = useLazyGetAllConnectionsQuery();
    const [connections, setConnections] = useState([]);

    const fetchAllConnections = async () => {
        try {
            const res = await getAllConnections().unwrap();
            setConnections(res?.data || []);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchAllConnections();
    }, []);

    return (
        <div className="mx-auto w-full max-w-6xl px-4 py-6">
            <div className="mb-6 flex items-end justify-between gap-3">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">My Connections</h1>
                    <p className="text-sm text-gray-500">
                        {isLoading ? "Loading your network…" : `${connections.length} connection(s)`}
                    </p>
                </div>

                <div className="flex items-center gap-3">
                    <input
                        type="text"
                        placeholder="Search connections…"
                        className="w-56 rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm text-gray-800 placeholder:text-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                        onChange={() => { }}
                    />
                </div>
            </div>

            {isLoading && (
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {[...Array(6)].map((_, i) => (
                        <div
                            key={i}
                            className="animate-pulse rounded-2xl border border-gray-200 bg-white p-4"
                        >
                            <div className="flex items-center gap-4">
                                <div className="h-16 w-16 rounded-full bg-gray-200" />
                                <div className="flex-1">
                                    <div className="mb-2 h-4 w-40 rounded bg-gray-200" />
                                    <div className="h-3 w-24 rounded bg-gray-200" />
                                </div>
                            </div>
                            <div className="mt-4 h-3 w-full rounded bg-gray-200" />
                            <div className="mt-2 h-3 w-3/4 rounded bg-gray-200" />
                            <div className="mt-4 flex justify-end gap-2">
                                <div className="h-8 w-20 rounded-xl bg-gray-200" />
                                <div className="h-8 w-20 rounded-xl bg-gray-200" />
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {!isLoading && connections.length === 0 && (
                <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-gray-300 bg-white p-12 text-center">
                    <div className="mb-3 text-4xl">👋</div>
                    <h3 className="text-lg font-semibold text-gray-900">No connections yet</h3>
                    <p className="mt-1 max-w-md text-sm text-gray-500">
                        When you connect with developers, they’ll show up here.
                    </p>
                </div>
            )}

            {!isLoading && connections.length > 0 && (
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {connections.map((conn) => (
                        <ConnectionCard key={conn.id || conn._id} user={conn} />
                    ))}
                </div>
            )}
        </div>
    );
}
