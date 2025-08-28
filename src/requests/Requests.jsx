import React, { useEffect, useState } from "react";
import { useLazyGetAllRequestsQuery } from "../connectionApi/connection";

function Requests() {
  const [getAllRequests] = useLazyGetAllRequestsQuery();
  const [requests, setRequests] = useState([]);

  const fetchAllRequests = async () => {
    try {
      const res = await getAllRequests().unwrap();
      if (!res) return;
  
      setRequests(res?.data || []);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchAllRequests();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Connection Requests</h2>

      {requests.length === 0 ? (
        <p className="text-gray-500">No requests found</p>
      ) : (
        <div className="space-y-4">
          {requests.map((req) => (
            <div
              key={req.id}
              className="border rounded-xl shadow-md p-4 bg-white flex items-center justify-between"
            >
              <div className="flex items-center gap-4">
                <img
                  src={req?.fromUserId?.avatarUrl || "https://via.placeholder.com/50"}
                  alt={req.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <h3 className="font-semibold text-lg">{req?.fromUserId.firstName}</h3>
                  <p className="text-gray-600 text-sm">{req?.fromUserId.email}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <button className="px-3 py-1 bg-green-500 text-white rounded-lg shadow hover:bg-green-600">
                  Accept
                </button>
                <button className="px-3 py-1 bg-red-500 text-white rounded-lg shadow hover:bg-red-600">
                  Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Requests;
