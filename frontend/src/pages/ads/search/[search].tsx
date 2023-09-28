import React, { useState, useEffect } from 'react'
import { Ad } from '@/types/ad.type'
import { useRouter } from 'next/router'
import axios from 'axios';
import { AdCard } from '@/components/AdCard';


function GetAdBySearch() {
  const router = useRouter();
  const { search } = router.query;
  const [ads, setAds] = useState<Ad[]>([])

  console.log(search);


  useEffect(() => {
    const fetchData = async () => {
      const data = await axios.get<Ad[]>(`http://localhost:3001/ads?terms=${search}`);
      console.log(data);
      setAds(data.data)

    }
    fetchData()

  }, [])


  return (
    <>
      <div>Résultat de la recherche</div>
      {ads && ads.length > 0 ?
        ads.map((ad) => (
          <div key={ad.id}>
            <AdCard
              picture={ad.picture}
              price={ad.price}
              title={ad.title}
              link={`/ads/${ad.id}`}
            />
          </div>
        ))
        :
        <p>Pas de résultat pour la recherche</p>
      }


    </>
  )
}

export default GetAdBySearch