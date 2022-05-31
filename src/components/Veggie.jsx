import React, {useEffect, useState} from 'react';
import {Splide, SplideSlide} from "@splidejs/react-splide";
import '@splidejs/splide/dist/css/splide.min.css';
import styled from "styled-components";
import {Link} from 'react-router-dom';

function Veggie() {

    const [vegetarian, setVegetarian] = useState([]);


    useEffect(() => {
        getVegetarian();
    }, []);

    const getVegetarian = async () => {

        const check = localStorage.getItem('vegetarian');

        if(check) {
            setVegetarian(JSON.parse(check))
        } else {
            const api = await fetch(
                `https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_API_KEY}&number=9&tags=vegetarian`
            );
            const data = await api.json();

            localStorage.setItem("vegetarian", JSON.stringify(data.recipes));
            setVegetarian(data.recipes);
            console.log(data.recipes);
        }
    };

    return (
    <div>
        <Wrapper>
            <h3>Vegetarian Recipes</h3>

            <Splide options={{
                perPage: 4,
                arrows: true,
                pagination: false,
                drag: "free",
                gap: "5rem"
            }}>
                {vegetarian.map((recipe) => {
                    return (
                        <SplideSlide key={recipe.id}>
                            <Card>
                                <Link to={"/recipe/" + recipe.id}>
                                    <p>{recipe.title}</p>
                                    <img src={recipe.image} alt={recipe.title}/>
                                    <Gradient />
                                </Link>
                            </Card>
                        </SplideSlide>
                    );
                })}
            </Splide>
        </Wrapper>
    </div>
    )
}

const Wrapper = styled.div`
  margin: 4rem 0rem
`;
const Card = styled.div`
  min-height: 15rem;
  width: auto;
  border-radius: 2rem;
  overflow: hidden;
  position: relative;

  img{
    border-radius: 2rem;
    position: absolute;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  p{
    position: absolute;
    z-index: 10;
    left: 50%;
    bottom: 0%;
    transform: translate(-50%, 0%);
    color: white;
    //width: 100%;
    text-align: center;
    font-weight: 600;
    font-size: 1rem;
    height: 40%;
    display: flex;
  }
  
`;

const Gradient = styled.div`
  z-index: 3;
  position: absolute;
  width: 100%;
  height: 100%;
  background: linear-gradient(rgba(0,0,0,0), rgba(0,0,0,0.5));
`;

export default Veggie;

