import React from 'react'
import {calcActions} from "../App";

export default function Symbol({symbolOperation, dispatch}) {
    return (
        <button onClick={() => {
            dispatch({type: calcActions.addOperator, payload: {value: symbolOperation}})
        }}>{symbolOperation}</button>
    )
}