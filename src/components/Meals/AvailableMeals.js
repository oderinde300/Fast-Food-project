import React, { Fragment, useEffect, useState } from 'react';
import classes from './AvailableMeals.module.css'
import MealItem from './MealItems/MealItem'
import spinner from '../../assets/spinner1.svg'

const AvailableMeals = (props) => {
    const [meals, setMeals] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [httpError, setHttpError] = useState();

    useEffect(() => {
        const fetchMeals = async () => {
            setIsLoading(true)
            const response =
                await fetch('https://react-food-order-app-75bae-default-rtdb.firebaseio.com/meals.json');

            if (!response.ok) {
                throw new Error('Something went wrong')
            }

            const responseData = await response.json();

            const loadedMeals = [];

            for (const key in responseData) {
                loadedMeals.push({
                    id: key,
                    name: responseData[key].name,
                    restaurant: responseData[key].restaurant,
                    image_url: responseData[key].image,
                    price: responseData[key].price
                })

            };
            setMeals(loadedMeals);
        }
        fetchMeals().catch((error) => {
            setIsLoading(false);
            setHttpError(error.message)
        });
        setIsLoading(false);
    }, [])

    if (isLoading) {
        return (
            <section className={classes.MealLoading}>
                <div className={classes.loading}><img src={spinner} /></div>
            </section>
        )
    }

    if (httpError) {
        return (
            <section className={classes.MealsError}>
                <p>{httpError}</p>
            </section>
        )
    }


    const mealsList = meals.map(meal => (
        <MealItem key={meal.id}
            image={meal.image_url}
            restaurant={meal.restaurant}
            name={meal.name}
            price={meal.price}
            id={meal.id} />
    ));

    return (
        <Fragment>
            <ul className={classes['available-meals']}>
                {mealsList}
            </ul>
        </Fragment>
    )
}

export default AvailableMeals;
