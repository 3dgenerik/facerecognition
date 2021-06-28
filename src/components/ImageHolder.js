import React from 'react';
import ImageBorder from './ImageBorder';
import Placeholder from './placeholder.png'

const ImageHolder = ({input, state, calcRegion}) => {

    let link = ''
    
    let key = 0;
    let bordersArr = ''
    
    if (input === ''){
        link = Placeholder;
    }else {
        link = input
    }

    if(state === true){
        bordersArr = calcRegion.map((item) => {
            
            const styleImg = {
                position: 'absolute',
                boxShadow: '0 0 0 2px rgb(0,200,255) inset',
                cursor: 'pointer',
                borderBottomLeftRadius: '10px',
                borderBottomRightRadius: '10px',
                top:`${item.topRow}px`,
                bottom:`${item.bottomRow}px`,
                left:`${item.leftCol}px`,
                right:`${item.rightCol}px`
            }
            key++;
            return <ImageBorder key = {key} style = {styleImg} num = {key} arrLength = {calcRegion.length}/>
        })
    }else {
        bordersArr = <h1 style = {{position:'absolute'}}>   </h1> 
        
    }

    return(
        <div className = ''>
            <div className = 'center ma4 pa3'>
                <img
                    id = 'imgFace'
                    className = 'w-60'
                    alt = 'detectImg'
                    src = {link}

                />
                {bordersArr} 
            </div>
        </div>

    )
}

export default ImageHolder;