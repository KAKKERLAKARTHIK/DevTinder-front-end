import React from 'react'
export default function UserCard({ data ,style}) {
 

    return (
        <div className="card bg-base-900 w-96 shadow-sm bg-whit box"  style={{marginLeft:"20px"}}>
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
                    <button className="btn btn-primary">ignore</button>

                    <button className="btn btn-primary">Send Request</button>
                </div>
            </div>
        </div>
    )
}
