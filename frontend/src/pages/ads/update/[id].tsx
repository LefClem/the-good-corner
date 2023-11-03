import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { Ad } from '@/types/ad.type';
import { CategoryType } from '@/types/category.type';
import axios from 'axios';
import styled from 'styled-components';
import { gql, useMutation, useQuery } from '@apollo/client';

const NewAdForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;

`

const GET_CATEGORIES = gql`
query Categories {
    categories{
        id
      name
    }
  }
`

const GET_AD_BY_ID = gql`
query Query($getAdId: Float!) {
    getAd(id: $getAdId) {
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

const UPDATE_AD = gql`
mutation Mutation($categoryId: Float!, $ad: UpdateAdInputType!) {
    updateAd(categoryId: $categoryId, ad: $ad) {
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

function UpdateAd() {
    const router = useRouter();
    const { id } = router.query;
    const { data, loading, error } = useQuery(GET_CATEGORIES);
    // const { loading: adLoading, error: adError, data: adData } = useQuery(GET_AD_BY_ID, { variables: { getAdId: Number(id) } });
    const [updateAd] = useMutation(UPDATE_AD);


    if (loading) return <p>Loading...</p>;
    if (error) return `Erreur : ${error}`;

    // const categories = categoryData.categories;
    // const ad = adData.getAd;

    // const [updateAd] = useMutation(UPDATE_AD);


    const handleSubmit = async (e) => {
        e.preventDefault();

        const form = e.target;
        const formData = new FormData(form as HTMLFormElement);
        const formJson = Object.fromEntries(formData.entries());
        console.log(formJson);

        updateAd({
            variables: {
                ad: {
                    id: parseInt(id as string),
                    ...formJson,
                    price: parseInt(formJson.price as string),
                    categoryId: parseInt(formJson.categoryId as string)
                },
                categoryId: parseInt(formJson.categoryId as string)
            },
            onCompleted: () => {
                router.push('/');
              }
        })
        // router.push('/');
    }

    
    return (
        <>
            <NewAdForm onSubmit={(e) => handleSubmit(e)} >
                <label>Titre de l&apos;annonce :
                    < input className='text-field' name='title' />
                </label>
                <label>
                    Description :
                    <input type="text" className="text-field" name='description' />
                </label>
                <label>
                    Propriétaire :
                    <input type="text" className="text-field" name='owner' />
                </label>
                <label>
                    Prix :
                    <input type="number" name="price" id='price' />
                </label>
                <label>
                    Photos :
                    <input type="text" name='picture' placeholder='Mettre le lien de votre photo' />
                </label>
                <label>
                    Ville :
                    <input type="text" name='location' placeholder='Entrer le nom de votre ville' />
                </label>
                <label>
                    Catégorie :
                    <select name="categoryId" id="category">
                        {data.categories.map((category) => (
                            <option key={category.id} value={category.id}>{category.name}</option>
                        ))}
                    </select>
                </label>
                <button type="submit">Submit</button>

            </NewAdForm>

        </>)
}

export default UpdateAd;