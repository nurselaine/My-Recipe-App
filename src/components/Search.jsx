import React, {useState} from 'react';
import styled from 'styled-components';
import {FaSearch} from 'react-icons/fa';
import {useNavigate} from 'react-router-dom';

function Search(){
    const [input, setInput] = useState("");
    const navigate = useNavigate();

    const submitHandler = (e) => {
        e.preventDefault();
        navigate("/searched/"+input);
    };

    return(
        <FormStyle onSubmit={submitHandler}>
            <div>
                <FaSearch/>
                <input
                    onChange={(e) => setInput(e.target.value)}
                    type="text"
                    value={input}>
                </input>
            </div>
        </FormStyle>
    )
}

const FormStyle = styled.form`
  margin: 0rem 20rem;
  height: 40px;
  //border: red 1px solid;
    div {
      width: 100%;
      position: relative;
    }
      input{
        //border: none;
        //border: red 1px solid;
        background: linear-gradient(35deg, #494949, #313131);
        color: white;
        padding: 1rem 3rem;
        border: none;
        border-radius: 1rem;
        outline: none;
        width: 100%;
      }
      
      svg{
        position: absolute;
        top: 50%;
        left: 0%;
        transform: translate(100%, -50%);
        color: white;
      }
`;

export default Search;