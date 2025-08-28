import React, { useEffect, useState } from 'react'
import { useLazyGetFeedQuery } from '../feedApi/feedApi'
import { useDispatch, useSelector } from 'react-redux';
import { feedData } from '../slice/feedSlice';
import UserCard from './UserCard';

const Feed = () => {
  const [getAllFeed] = useLazyGetFeedQuery();
  const dispatch = useDispatch();
  const feed = useSelector((state) => state?.userFeed?.feed);
  const [allFeedData, setAllFeedData] = useState([]);

  const getFeed = async () => {
    try {
      if (feed) return;
      const res = await getAllFeed().unwrap();
      if (!res) return;

      dispatch(feedData(res?.data));
      setAllFeedData(res?.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getFeed();
  }, []); 
  return (
    <div className='flex justify-center m-10' >
    {allFeedData?.slice(0).map((data) => (
      <UserCard data={data} />
    ))}
       
    </div >
  );
};

export default Feed;
