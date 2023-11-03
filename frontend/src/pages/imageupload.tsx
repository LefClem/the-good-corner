import { useState } from "react";
import axios from "axios";

const UploadPage = () => {
    const [file, setFile] = useState<File>();
    const [imageUrl, setImageUrl] = useState<string>();

    console.log(file);
    console.log(imageUrl);
    

    return (
        <div>
            <form onSubmit={async (e) => {
                if(file){
                    e.preventDefault();
                    const url = 'http://localhost:8000/upload'
                    const formData = new FormData();
                    formData.append("file", file, file.name)
                    try {
                        const response = await axios.post(url, formData);  
                        console.log(response);
                                              
                        console.log(response.data.filename);
                        setImageUrl(response.data.filename);
                    } catch (error) {
                        console.error(error);
                    }
                }
            }}>
                <label>Upload une image</label>
                <br />
                <input type="file" onChange={(e) => {
                    if(e.target.files){
                        setFile(e.target.files[0]);
                    }
                }}/>
                <br />
                <button type="submit">Upload</button>
                { imageUrl ? (
                    <>
                        <img width="500" alt="image uploaded" src={imageUrl}/>
                    </>
                ) :
                    null
                }
            </form>
        </div>
    )
}

export default UploadPage;