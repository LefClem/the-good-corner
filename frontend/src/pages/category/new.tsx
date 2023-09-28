import axios from 'axios';
import { useRouter } from 'next/router'
import React from 'react'
import styled from 'styled-components';

const NewCatForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;

`

function AddNewCategorie() {
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const form = e.target;
        const formData = new FormData(form as HTMLFormElement);

        const formJson = Object.fromEntries(formData.entries());
        const result = await axios.post('http://localhost:3001/categories', formJson);
        router.push('/');
    }
    return (
        <>
            <NewCatForm onSubmit={(e) => handleSubmit(e)}>
                <label>
                    Nom de la nouvelle catégorie
                </label>
                <input type="text" name='name' />
                <button type='submit'>Créer</button>
            </NewCatForm>
        </>
    )
}

export default AddNewCategorie