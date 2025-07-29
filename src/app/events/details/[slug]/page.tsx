import EventDetails from '@/components/Pages/ExploreEventPage/SingleEventDetails/EventDetails';
import React from 'react';

export default async function page({ params }: any) {
  const { slug } = await params; // <-- no await here

    return (
        <div>
            
            <EventDetails slug={slug}/>
        </div>
    );
};
