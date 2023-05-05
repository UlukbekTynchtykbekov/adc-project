import React, {useEffect, useState} from 'react';
import "./new-category.scss"
import Sidebar from "../../components/Sidebar/Sidebar";
import {Navigate, useParams} from "react-router-dom";
import {useAddCategory, useCategoryData, useUpdateCategory} from "../../CustomHooks/useCategoriesData";

const NewCategory = () => {
    const [formData, setFormData] = useState({
        name: "",
    });
    const [formErrors, setFormErrors] = useState({});
    const {id: categoryId} = useParams();

    const {mutate: addCategory, data: addedCategoryData, isLoading: addCategoryLoading} = useAddCategory();
    const {
        data: categoryData,
        isLoading: categoryLoading,
        isError: categoryIsError,
        error: categoryError
    } = useCategoryData(categoryId);
    const {mutate: updateCategory, data: updatedCategoryData, isLoading: updateLoading} = useUpdateCategory()

    const handleInputChange = (event) => {
        const {name, value} = event.target;
        setFormData({...formData, [name]: value});
    };

    const onSubmitProduct = (e) => {
        e.preventDefault();
        const errors = validateForm(formData);
        setFormErrors(errors);
        if (Object.keys(errors).length === 0) {
            if (categoryId) {
                updateCategory({categoryId, ...formData})
            } else {
                addCategory(formData)
            }
        }
    }

    const validateForm = (data) => {
        const errors = {};
        const categories = ["architecture", "design"]

        if (!categories.includes(data.name.trim())) {
            errors.name = "Обязательное поле или необходимо добавить только категорию 'architecture' и 'design'";
        }

        return errors;
    };

    useEffect(() => {
        if (categoryData?.data) {
            setFormData((prevState) => ({
                ...prevState,
                name: categoryData?.data.name
            }))
        }
    }, [categoryData?.data])

    if (addedCategoryData?.data || updatedCategoryData?.data) {
        return <Navigate to="/admin/categories"/>
    }

    return (
        <section className="dashboard">
            <div className="row">
                <Sidebar/>
                {
                    categoryLoading && <div style={{color: "white"}}>Loading...</div>
                }

                {
                    categoryIsError && <div style={{color: "white"}}>{categoryError?.message}</div>
                }
                <div className="new">
                    <div className="new__wrapper">
                        <h2 className="new__text">Добавить категорию</h2>
                    </div>
                    <form className="formik" onSubmit={onSubmitProduct}>
                        <div className="formik__group">
                            <h2 className="formik__text">Категория</h2>
                            <input
                                className="formik__input"
                                type="text"
                                name="name"
                                value={formData.name}
                                placeholder="Категория проекта"
                                onChange={handleInputChange}
                            />
                            {
                                formErrors.name && <p className="formik__error">*{formErrors.name}</p>
                            }
                        </div>
                        <button
                            className={addCategoryLoading || updateLoading ? "button formik__button-disabled" : "button formik__button"}
                            type="submit" disabled={addCategoryLoading || updateLoading}>добавить
                        </button>
                        {
                            addCategoryLoading || updateLoading ? <span className="hour-glass">
                            <ion-icon name="hourglass-outline"></ion-icon>
                        </span> : null
                        }
                    </form>
                </div>
            </div>
        </section>
    );
};

export default NewCategory;