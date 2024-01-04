import { CategoryType } from '@/types/category.type';
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import styled from 'styled-components';
import Category from '@/components/Category';
import { useRouter } from 'next/router'
import { gql, useMutation, useQuery } from '@apollo/client';
import isAuth from "@/components/secure/isAuth";



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

const CREATE_NEW_AD = gql`
mutation CreateAd($ad: CreateAdInputType!) {
  createAd(ad: $ad) {
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



function NewAd() {
  const router = useRouter();
  const { loading, error, data } = useQuery(GET_CATEGORIES);
  const [createAd] = useMutation(CREATE_NEW_AD);
  const [file, setFile] = useState<File>();
  const [imageUrl, setImageUrl] = useState<string>();
  const token = localStorage.getItem("token");
  
  useEffect(() => {
    if(!token){
      router.push('/login')
    }
  })

  if (loading) return <p>Loading...</p>;
  if (error) return `Erreur : ${error}`;

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form as HTMLFormElement);

    const formJson = Object.fromEntries(formData.entries());
    createAd({
      variables: {
        ad: {
          ...formJson,
          price: parseInt(formJson.price as string),
          picture: imageUrl,
          categoryId: parseInt(formJson.categoryId as string)
        }
      },
      onCompleted: () => {
        router.push('/');
      }
    })
  }

  const handleChange = (e: any) => {
    if(e.target.files){
      setFile(e.target.files[0]);
    }
  }

  console.log(file);
  

  const loadPicture = async (e: any) => {
    e.preventDefault();
    const url = 'http://localhost:8000/upload'
    const formData = new FormData();
    formData.append("file", file, file?.name)
    try {
      const response = await axios.post(url, formData);
      console.log(response.data.filename);
      setImageUrl(response.data.filename);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <NewAdForm onSubmit={(e) => handleSubmit(e)} >
        <label>Titre de l&apos;annonce
          < input className='text-field' name='title' />
        </label>
        <label>
          Description
          <input type="text" className="text-field" name='description' />
        </label>
        <label>
          Propriétaire
          <input type="text" className="text-field" name='owner' />
        </label>
        <label>
          Prix
          <input type="number" name="price" id='price' />
        </label>
        <label>
          Photos
          <input type="file" name="picture" onChange={(e) => handleChange(e)}/>
          <button onClick={(e) => { loadPicture(e) }}>Upload</button>
        </label>
        <label>
          Ville
          <input type="text" name='location' placeholder='Entrer le nom de votre ville' />
        </label>
        <select name="categoryId" id="category">
          {data.categories.map((category: CategoryType) => (
            <option key={category.id} value={category.id}>{category.name}</option>
          ))}
        </select>
        <button type="submit">Submit</button>

      </NewAdForm>

    </>

  )
}

export default isAuth(NewAd);