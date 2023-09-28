import { useRouter } from 'next/router'
import { useEffect, useState } from 'react';
import { Ad } from '@/types/ad.type'
import axios from 'axios';


export default function AdsItemPage() {
  const router = useRouter();
  const { id } = router.query;
  const [ad, setAd] = useState<Ad | null>(null);

  
  useEffect(() => {
    const fetchData = async (id: string) => {
      const data = await axios.get(`http://localhost:3001/ads/${id}`);
      setAd(data.data[0]);
    };  
    
    if (id) {
      fetchData(id);
    }
    
  }, [id])
  
  const handleDelete = async (id: number) => {
    const result = await axios.delete(`http://localhost:3001/ads/${id}`);
    console.log(result);
    
    router.push('/');
  }

  const handleUpdate = (id: number) => {
    router.push(`/ads/update/${id}`)
  }

  if (!ad) {
    return <div>Loading...</div>
  }

  return (
    <>
        <main className="main-content">
          <h2 className="ad-details-title">{ad.title}</h2>
          <section className="ad-details">
            <div className="ad-details-image-container">
              <img className="ad-details-image" src={ad.picture} />
            </div>
            <div className="ad-details-info">
              <div className="ad-details-price">{ad.price} €</div>
              <div className="ad-details-description">
                {ad.description}
              </div>
              <hr className="separator" />
              {/* <div className="ad-details-owner">
                Annoncée publiée par <b>Serge</b> aujourd'hui (9:32).
              </div> */}
            </div>
            <button onClick={() => handleDelete(ad.id)}>Supprimer l&apos;annonce</button>
            <button onClick={() => handleUpdate(ad.id)}>Modifier l&apos;annonce</button>
          </section>
        </main>
    </>
  )
}


  

  
  
