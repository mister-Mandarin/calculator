import React from 'react'
import {calcActions} from "../App";

export default function Number({number, dispatch}) {
    return (
        <button onClick={() => {
            dispatch({type: calcActions.addNumber, payload: {value: number}})
        }}>{number}</button>
    )
}