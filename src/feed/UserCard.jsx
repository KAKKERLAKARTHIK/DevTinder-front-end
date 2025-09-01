import React from 'react'
import { useSendRequestMutation } from '../connectionApi/connection';
import { removeFeed } from '../slice/feedSlice';
import { useDispatch } from 'react-redux';
export default function UserCard({ data, getFeed = () => { } }) {
    const [sendRequest] = useSendRequestMutation();
    const dispatch = useDispatch();
    const updateRequestStatus = async (id, status) => {
        try {
            const res = await sendRequest({ id, status }).unwrap();
            console.log(res);
            if(!res)return
            // getFeed(true);
            dispatch(removeFeed(id))
            
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className="card bg-base-900 w-96 shadow-sm bg-whit box" style={{ marginLeft: "20px" }}>
            <figure>
                <img
                    src={data?.avatarUrl}
                    alt={data?.firstName}
                />
            </figure>
            <div className="card-body">
                <h2 className="card-title">{data?.firstName}</h2>
                <p> {data?.about}</p>
                <div className="card-actions justify-end my-10">
                    <button className="btn btn-primary" onClick={() => updateRequestStatus(data?._id, "Ignored")}>ignore</button>

                    <button className="btn btn-primary" onClick={() => {
                        debugger
                        updateRequestStatus(data?._id, "Intrested")
                    }
                    }>Send Request</button>
                </div>
            </div>
        </div>
    )
}
