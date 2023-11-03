import { useRouter } from 'next/router'
import { useQuery, useMutation } from '@apollo/client';
import { gql } from 'graphql-tag';

const GET_AD_BY_ID = gql`
  query GetAd($getAdId: Float!) {
    getAd(id: $getAdId) {
      id
      title
      price
      picture
      description
    }
  }
`;

const DELETE_AD = gql`
  mutation DeleteAd($deleteAdId: Float!) {
    deleteAd(id: $deleteAdId) 
    }
`;

export default function AdsItemPage() {
  const router = useRouter();
  const { id } = router.query;

  const { loading: adLoading, error: adError, data: adData } = useQuery(GET_AD_BY_ID, {
    variables: { getAdId: Number(id) },
  });

  const [deleteAd] = useMutation(DELETE_AD, {
    variables: { deleteAdId: Number(id) },
    onCompleted: () => {
      router.push('/');
    },
  });

  const handleUpdate = (id: number) => {
    router.push(`/ads/update/${id}`)
  }

  if (adLoading) return <div>Loading...</div>;
  if (adError) return <div>Error: {adError.message}</div>;

  const ad = adData.getAd;

  return (
    <main className="main-content">
      <h2 className="ad-details-title">{adData.getAd.title}</h2>
      <section className="ad-details">
        <div className="ad-details-image-container">
          <img className="ad-details-image" src={adData.getAd.picture} />
        </div>
        <div className="ad-details-info">
          <div className="ad-details-price">{adData.getAd.price} €</div>
          <div className="ad-details-description">
            {adData.getAd.description}
          </div>
          <hr className="separator" />
        </div>
        <button onClick={deleteAd}>Supprimer l'annonce</button>
        <button onClick={() => handleUpdate(adData.getAd.id)}>Modifier l'annonce</button>
      </section>
    </main>
  )
}



  

  
  
