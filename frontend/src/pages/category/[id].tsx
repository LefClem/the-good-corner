import React from 'react'
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { AdCard } from '@/components/AdCard';
import {Ad} from '@/types/ad.type'
import axios from 'axios';


function AdsByCategory() {
  const router = useRouter();
  const { id } = router.query;
  const [ads, setAds] = useState<Ad[]>([]);


  useEffect(() => {
    const fetchData = async (id: string) => {
      const data = await axios.get(`http://localhost:3001/ads?category_id=${id}`);
      console.log(data.data);
      
      setAds(data.data);
    };

    fetchData(id);
  }, [id])

  // console.log(ads);
  
  return (
    <>
      <section>
        {ads.map((ad) => (
          <AdCard
            key={ad.id}
            picture={ad.picture}
            price={ad.price}
            title={ad.title}
            link={`/ads/${ad.id}`}
          />
        ))}
      </section>
    </>
  );

}

export default AdsByCategory;