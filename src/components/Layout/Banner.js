import React from 'react'
import banner from '../../assets/banner-img.png'
import classes from './Banner.module.css'

const Banner = () => {
    return (
        <div className={classes.banner}>
            <div className={classes['banner-message']}>
                <p>Food you love 😉✌,  </p>
                <p>delivered to you</p>
            </div>
            <div className={classes['img-container']}>
                <img src={banner} alt='Image showing a plate with food' />
            </div>
        </div>
    )
}

export default Banner;