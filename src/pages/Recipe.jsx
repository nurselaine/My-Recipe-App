import React, {useState, useEffect} from 'react';
import Styled from 'styled-components';
import {useParams} from "react-router-dom";
import {setSelectionRange} from "@testing-library/user-event/dist/utils";

function Recipe(){

    const [details, setDetails] = useState({});
    const [activeTab, setActiveTab] = useState("instructions");
    let params = useParams();

    const fetchDetails = async () => {
        const data = await fetch(`https://api.spoonacular.com/recipes/${params.name}/information?apiKey=${process.env.REACT_APP_API_KEY}`);
        const detailData = await data.JSON();
        setDetails(detailData);
    }

    useEffect(() => {
        fetchDetails();
    }, [params.name]);

    return (
        <DetailWrapper>
            <div>
                <h2>{details.title}</h2>
                <img src=""/>
            </div>
            <Info>
                <Button className={activeTab === 'instructions' ? 'active' : ''} onClick={() => setActiveTab('instructions')}>Instructions</Button>
                <Button className={activeTab === 'ingredients' ? 'active' : ''} onClick={() => setActiveTab('ingredients')}>Ingredients</Button>
            </Info>
        </DetailWrapper>
    )
}

const DetailWrapper = Styled.div`
  margin-top: 10rem;
  margin-bottom: 5rem;
  display: flex;
      .active{
        background: linear-gradient(35deg, #494949, #313131);
        color: white;
      }
    h2{
      margin-bottom: 2rem;
    }
      li{
        font-size: 1.2rem;
        line-height: 2.5rem;
      }
      ul{
        margin-top: 2rem;
      }
`;

const Button = Styled.button`
  padding: 1rem 2rem;
  color: #313131;
  background: white;
  border: 2px solid black;
  margin-right: 2rem;
  font-weight: 600;
`;

const Info = Styled.div`
  margin-left: 10rem;
`

export default Recipe;