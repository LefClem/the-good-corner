import { useEffect, useState } from 'react'
import {AdCard, AdCardProps}from '../components/AdCard'
import {Ad} from '@/types/ad.type'
// import axios from 'axios'
import { useSearchParams } from 'next/navigation'
import { gql, useQuery } from '@apollo/client'

const GET_ADS = gql`
query Query($categoryId: Float, $search: String) {
    ads(categoryId: $categoryId, search: $search) {
      id
      title
      description
      owner
      price
      picture
      location
      createdAt
    }
  }
`

export const RecentAds = () => {
    const [totalPrice, setTotalPrice] = useState<number>(0);
    const [ads, setAds] = useState<Ad[]>([]);
    const searchParams = useSearchParams()
    const categoryId = searchParams.get("category");
    const search = searchParams.get("search") ?? "";


    const { loading, error } = useQuery(GET_ADS, {
        variables: {
            categoryId: categoryId !== "" ? parseInt(categoryId as string) : null,
            search
        },
        onCompleted: (data => {
            setAds(data.ads)
        })
    });

    if(loading) return <p>Loading...</p>;
    if(error) return `Erreur : ${error}`;    

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