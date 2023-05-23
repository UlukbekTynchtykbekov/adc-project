import React from 'react';
import Loader from "../../components/Loader/Loader";

const UploadImages = ({namePhoto, text, photos, deletePhoto, uploadPhoto, photosError, selectMainPhoto, loader}) => {
    return (
        <div className="formik__group formik__group-photo">
            <h2 className="formik__text">{text}</h2>
            <div className="formik__photos">
                {
                    photos.map(img => (
                        <div className="formik__photo" key={img.public_id}>
                            <img className="formik__img" src={img.url} alt=""/>
                            <span onClick={() => deletePhoto(img.public_id)} className="formik__img-delete">
                                                <ion-icon name="trash-outline"></ion-icon>
                                            </span>
                            <span onClick={() => selectMainPhoto(img.public_id)} className="formik__img-select">
                                {
                                    img.public_id === photos[0].public_id ? <ion-icon name="star"></ion-icon> :
                                        <ion-icon name="star-outline"></ion-icon>
                                }
                                            </span>
                        </div>
                    ))
                }
                {
                    loader && <div className="formik__photo">
                        <Loader />
                    </div>
                }
                <div className="formik__photo">
                    <label className="formik__label formik__label-photo">
                        <input
                            multiple
                            className="formik__input formik__input-hidden"
                            name={namePhoto}
                            onChange={uploadPhoto}
                            type="file"/>
                        <span className="formik__icon">
                                    <ion-icon name="cloud-upload-outline"></ion-icon>
                                    Upload
                                </span>
                    </label>
                </div>
                {
                    photosError && <p className="formik__error">*{photosError}</p>
                }
            </div>
        </div>
    );
};

export default UploadImages;