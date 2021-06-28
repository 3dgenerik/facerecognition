import React from 'react';
// import '../components/imageBorder.css'

const ImageBorder = ({style, num, arrLength}) => {
    let numCol = 'white';
    if (num === arrLength){
        numCol = 'black';
    }
    
    return(
        <div className = ''>
            <div style = {style}>

                <div style = {{
                    width:'100%',
                    height:'16px',
                    background:'rgb(0,200,255)',
                    marginTop:'-16px',
                    borderTopLeftRadius: '6px',
                    borderTopRightRadius: '6px',
                    // marginLeft:'10px',

                    }}><p style ={{
                        position:'relative',
                        color:numCol,
                        fontSize:'11px',
                        textAlign:'center',
                        top:'2px',
                        fontWeight:'bold'
                    }}
                    >{num}</p></div>

            </div>
        </div>
    )
}

export default ImageBorder;