import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { Ad } from '@/types/ad.type';
import { CategoryType } from '@/types/category.type';
import axios from 'axios';
import styled from 'styled-components';

const NewAdForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;

`

function UpdateAd() {
    const router = useRouter();
    const { id } = router.query;
    const [categories, setCategories] = useState<CategoryType[]>([]);
    const [ad, setAd] = useState<Ad>();

    useEffect(() => {
        const fetchCategories = async () => {
            const data = await axios.get<CategoryType[]>('http://localhost:3001/categories?terms=');
            console.log(data);

            setCategories(data.data)
        }

        const fetchAd = async (id: string) => {
            const data = await axios.get(`http://localhost:3001/ads/${id}`);
            setAd(data.data[0]);
        };

        fetchAd(id);
        fetchCategories();
    }, [id])

    console.log(ad);


    const handleSubmit = async (e) => {
        e.preventDefault();

        const form = e.target;
        const formData = new FormData(form as HTMLFormElement);

        const formJson = Object.fromEntries(formData.entries());
        console.log(formJson);
        
        const result = await axios.put(`http://localhost:3001/ads/${id}`, formJson);
        console.log(result);

        router.push('/');
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
                    {/* <input type="file" name="picture" /> */}
                    <input type="text" name='picture' placeholder='Mettre le lien de votre photo' />
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

        </>)
}

export default UpdateAd;