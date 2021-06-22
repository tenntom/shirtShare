import React, { useState, useContext } from 'react'
import { ShirtContext } from './ShirtProvider'


export const ShirtImageUploader = () => {

    const [loading, setLoading] = useState(false)
    const [image, setImage] = useState("")

    const uploadImage = async eventObj => {
        const files = eventObj.target.files
        const data = new FormData()
        data.append('file', files[0])
        data.append('upload_preset', 'ShirtShareImages')
        setLoading(true)

        const res = await fetch("https://api.cloudinary.com/v1_1/tenntom/image/upload",
        {
            method: "POST",
            body: data
        }
        )

        const file = await res.json()

        setImage(file.secure_url)
        setLoading(false)
    }

    return (
        <div className="image-upload">
            <h3>Upload Shirt Image</h3>
            <input type="file" name="file" placeholder="Upload an image." onChange={uploadImage}/>

            {
                loading?(
                    <h4>Loading ...</h4>
                ): (
                    <img src={image} style={{width: '300px'}} id="imageURL" className="form-control" value={shirt.imageURL}/>
                )

            }
            
        </div>
    )
}

{/* <input type="text" id="imageURL" className="form-control" placeholder="Image URL" value={shirt.imageURL}  */}




    // const uploadImage = async e => {
    //     const files = e.target.files
    //     const data = new FormData()
    //     data.append('file', files[0])
    //     data.append('upload_preset', 'ShirtShare')
    //     setLoading(true)
    //     const res = await fetch(
    //         'https://api.cloudinary.com/v1_1/tenntom'
    //         {
    //             method: 'POST',
    //             body: data
    //         }
    //     )
    //     const file = await res.json()
    //     console.log(file)

    //     setImage(file.secure_url)
    //     setLoading(false)
    // }
