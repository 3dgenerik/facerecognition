import React from 'react';

const Navigation = ({routeChange}) => {
    const style = {
        display:'flex',
        justifyContent:'flex-end',
        fontWeight:'500'
    }
    return(
        <nav style = {style}>
            <p
                className = 'f3 link dim underline pa3 pointer white'
                // onClick = {routeChange('signin')} //with this we are running function - WRONG!!!
                onClick = {() => routeChange('signin')} // we run function when is clicked
            >Sign out</p>
        </nav>
    )
}

export default Navigation;