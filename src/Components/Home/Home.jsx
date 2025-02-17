import React, { Component } from 'react'
import MainSlider from './MainSlider/MainSlider'
import CategorySlider from './CategorySlider/CategorySlider'
import Products from '../Products/Products'

export const Home = () => {
    return (
      <>
      <MainSlider/>
      <CategorySlider/>
      <Products/>
      
      </>
    )
}

export default Home