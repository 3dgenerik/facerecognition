import React from 'react';
import BrainLogo from './brain-logo.png';
import Tilt from 'react-parallax-tilt';

const Logo = () => {
    const tilt = {
        width:'250px',
        border: '1px dotted rgba(255,255,255,.4)',
        background:'rgba(255,255,255,.1)',
        transformStyle: 'preserve-3d'
    }

    const styleDiv = {
        display:'flex',
        justifyContent:'flex-start',
        marginTop:'-40px'
    }

    const styleImg = {
        transform: 'translateZ(50px)'
    }

    return(
        <div style = {styleDiv} className = 'pl5'>
            <Tilt  className = 'br3 shadow-5' style = {tilt} perspective={1500}>
                <img  style = {styleImg} src = {BrainLogo} alt = 'Logo' />
            </Tilt>
        </div>
    )
}

export default Logo;