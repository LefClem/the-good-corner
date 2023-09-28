import { useEffect, useState } from 'react'
import {AdCard, AdCardProps}from '../components/AdCard'
import {Ad} from '@/types/ad.type'
import axios from 'axios'
import { useSearchParams } from 'next/navigation'

export const RecentAds = () => {
    const [totalPrice, setTotalPrice] = useState<number>(0);
    const [ads, setAds] = useState<Ad[]>([]);
    const searchParams = useSearchParams()
    const categoryId = searchParams.get("category");


    useEffect(() => {
        const fetchData = async () => {
            let data = await axios.get<Ad[]>("http://localhost:3001/ads");
            setAds(data.data);            
        }   
        fetchData();
    }, [])

    const addPrice = (price: number) => {
        setTotalPrice(totalPrice + price)
    }

    return (
        <>
            <h2>Annonces récentes</h2>
            <p>Prix total: {totalPrice} €</p>
            <section className="recent-ads">
                {ads.map((ad, index) => (                    
                    <div key={index}>
                        <AdCard
                        picture={ad.picture}
                        price={ad.price}
                        title={ad.title}
                        link={`/ads/${ad.id}`}
                        />
                        <button className='button' onClick={() => addPrice(ad.price)}>Add price to total</button>
                    </div>
                ))}
            </section>
        </>

    )
}