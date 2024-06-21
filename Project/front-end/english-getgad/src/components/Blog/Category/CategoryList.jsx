import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import classes from './CategoryList.module.css';
function CategoryList() {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch('http://localhost:9999/Category');
                const data = await response.json();
                setCategories(data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchCategories();
    }, []);

    return (
        <div className={classes.categoryList}>
            {categories.map((category) => (
                <Link
                    key={category.categoryID}
                    to={`category/${category.categoryID}`}
                    className={classes.categoryLink}
                >
                    {category.categoryName}
                </Link>
            ))}
        </div>
    );
}

export default CategoryList;
