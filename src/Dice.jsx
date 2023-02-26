import React from 'react'

function Dice(props) {
    const styles = {
        backgroundColor: props.isHeld ? "#59E391" : "#FFFFFF" 
    }
    return (
        <div className='die-holder'>
            <div className='die' style={styles} onClick={props.numHold}>
                {props.value}
            </div>
        </div>
    )
}

export default Dice