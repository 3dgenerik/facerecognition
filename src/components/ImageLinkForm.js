import React from 'react';
import Tilt from 'react-parallax-tilt';
import '../components/ImageLinkForm.css'

const ImageLinkForm = ({inputChange, inputSubmit}) => {
    return(
        <div>
            {/* <p className = 'f4 white'>
                {'This Magic Brain will detect faces in your pictures.'}
            </p> */}
            <Tilt  className = 'w-50 center' style = {{transformStyle: 'preserve-3d'}} perspective={10000} tiltMaxAngleX={10} tiltMaxAngleY={10}>
                <div  className = 'jox w-100 center pa5 shadow-5 br3'>
                    <input
                        style = {{transform: 'translateZ(50px)'}}
                        className = 'f4 pa3 w-80 center'
                        type = 'text'
                        placeholder = 'type image URL'
                        onChange = {inputChange}
                        
                    />
                    <button
                        className = 'f4 pa3 w-20 grow'
                        style = {{transform: 'translateZ(50px)'}}
                        onClick = {inputSubmit}
                        >Detect</button>
                </div>
            </Tilt>
        </div>
    )
}

export default ImageLinkForm;