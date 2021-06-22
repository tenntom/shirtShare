import React, { useContext, useEffect, useState } from "react"
import { ShirtContext } from "../shirts/ShirtProvider"
// import { UserContext } from "../users/UserProvider"
import "./Shirts.css"
import { useHistory } from 'react-router-dom';
import { ShirtImageUploader } from "./ShirtImageUploader";

export const ShirtForm = () => {
    const { addShirt, getSizes, shirtSizes } = useContext(ShirtContext)

    const currentUserId = parseInt(localStorage.getItem("shirtshare_user"))

    const [shirt, setShirt] = useState({
        title: "",
        userId: 0,
        sizeId: 0,
        imageURL: "",
        timestamp: 0,
        keywords: []
    })

    const history = useHistory();

    useEffect(() => {
        getSizes()
    }, [])

    // from here
    const [loading, setLoading] = useState(false)
    const [image, setImage] = useState("")

    const setURL = (url) => {
        shirt.imageURL = url
    }

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


    //to here. An experiment.

    const handleControlledInputChange = (event) => {
        const newShirt = { ...shirt }
        newShirt[event.target.id] = event.target.value
        setShirt(newShirt)
    }

    const handleClickSaveShirt = (event) => {
        event.preventDefault()

        const sizeId = parseInt(shirt.sizeId)

        if (shirt.title === null) {
            window.alert("Please enter a title for your shirt.")
        } else {
            const newShirt = {
                title: shirt.title,
                userId: currentUserId,
                sizeId: sizeId,
                imageURL: shirt.imageURL,
                description: shirt.description,
                active: true,
                timestamp: Date().getTime
            }
            addShirt(newShirt)
                .then(() => history.push("/"))
        }
    }



    return (
        <form className="shirtForm">
            <h2 className="shirtForm__title">New Shirt</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="title">Shirt Title:</label>
                    <input type="text" id="title" className="form-control" placeholder="Shirt Title" value={shirt.title} onChange={handleControlledInputChange} />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="size">Size:</label>
                    <select name="sizeId" id="sizeId" className="form-control" value={shirt.sizeId} onChange={handleControlledInputChange}>
                        <option value="0">Select a Size:</option>
                        {
                            shirtSizes.map((s) => {
                                return (
                                    <option key={s.id} value={s.id}>
                                        {s.shirtSize}
                                    </option>
                                )
                            }
                            )
                        }
                    </select>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="description">Shirt Description:</label>
                    <input type="text" id="description" className="form-control" placeholder="Description" value={shirt.description} onChange={handleControlledInputChange} />
                </div>
            </fieldset>
            {/* <fieldset>
                <div className="form-group">
                    <label htmlFor="imageURL">Photo URL - Temporary:</label>
                    <input type="text" id="imageURL" className="form-control" placeholder="Image URL" value={shirt.imageURL} onChange={handleControlledInputChange} />
                </div>
            </fieldset> */}
            {/* <div className="buttons"> */}
            <div className="form-group">
                <div className="image-upload">
                    <h3>Upload Shirt Image</h3>
                    <input type="file" name="file" placeholder="Upload an image." onChange={uploadImage} />

                    {
                        loading ? (
                            <h4>Loading ...</h4>
                        ) : (
                            <>
                                <img src={image} style={{ width: '300px' }} id="imageURL" value={shirt.imageURL} />
                                <h5>{image}</h5>
                                {setURL(`${image}`)}
                            </>
                        )
                    }
                </div>
                {/* {ShirtImageUploader()} */}
                {/* <ShirtImageUploader /> */}
            </div>
            <div className="form-group save-shirt">
                {/* <button className="btn btn-upload" onClick={ShirtImageUploader}>
                Upload Image
            </button> */}
                <button className="btn btn-primary" onClick={handleClickSaveShirt}>
                    Save Shirt
                </button>
            </div>
            {/* </div> */}
        </form>
    )

}