import React from 'react';
import Menu from "./Menu";

//import {Button} from './Button';
// import {puppies} from './images/puppies.jpg';
// import './src/styles.css'


function PetSec () {
    return (
        <div className='fav-container'> 
        <Menu/>
        <video src='./videos/video.mp4' autoPlay loop muted/>
        <h1 className = "white-10">
        Bonjour!! Welcome to PET360
        <br/>
        Join our family and avail the offers!!
        </h1>
        
            {/* <div className='fav-btn'>
                <Button className='l-btsn' buttonStyle='btn--outline' buttonSize='btn--large'>
                    MEMBERSHIP
                </Button>
                <Button className='l-btn' buttonStyle='btn--primary' buttonSize='btn--large'>
                    REGISTER
                </Button>
            </div> */}
            {/* <div className='fav-sec'>
                <img src={puppies} alt='puppy'/>
            </div> */}
        </div>
    )
};


export default PetSec;