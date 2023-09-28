import { CategoryType } from '@/types/category.type';
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import styled from 'styled-components';
import Category from '@/components/Category';
import { useRouter } from 'next/router'


const NewAdForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;

`



function NewAd() {
  const router = useRouter();
  const [categories, setCategories] = useState<CategoryType[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const data = await axios.get<CategoryType[]>('http://localhost:3001/categories?terms=');
      console.log(data);
      
      setCategories(data.data)
    }

    fetchCategories();
  }, [])  

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const form = e.target;
    const formData = new FormData(form as HTMLFormElement);
    
    const formJson = Object.fromEntries(formData.entries());
    const result = await axios.post('http://localhost:3001/ads', formJson);
    
    router.push('/');
  }


  return (
    <>
      <NewAdForm onSubmit={(e) => handleSubmit(e)} > 
        <label>Titre de l&apos;annonce
        < input className='text-field' name='title'/>
        </label>
        <label>
          Description
          <input type="text" className="text-field" name='description'/>
        </label>
        <label>
          Propriétaire
          <input type="text" className="text-field" name='owner'/>
        </label>
        <label>
          Prix
          <input type="number" name="price" id='price'/>
        </label>
        <label>
          Photos
          {/* <input type="file" name="picture" /> */}
          <input type="text" name='picture' placeholder='Mettre le lien de votre photo'/>
        </label>
        <label>
          Ville
          <input type="text" name='location' placeholder='Entrer le nom de votre ville' />
        </label>
        <select name="category_id" id="category">
        {categories.map((category) => (
            <option key={category.id} value={category.id}>{category.name}</option>
          ))}
          </select>
        <button type="submit">Submit</button>

      </NewAdForm>
    
    </>

    )
}

export default NewAd;