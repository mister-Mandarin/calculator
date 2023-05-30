import './styles/globals.css';
import {useReducer} from "react";
import Number from './components/Number';
import Symbol from './components/Symbol';
import {calculateNewValue} from "@testing-library/user-event/dist/utils";
import calculateResult from "./modules/Calculations";

// делаем отдельную переменную для проблоса всех операций в отдельные компоненты
export const calcActions = {
    addNumber: 'addNumber',
    addOperator: 'addOperator',
    delNumber: 'delNumber',
    cleanScreen: 'cleanScreen',
    calculateResult: 'calculateResult'
}

function reducer(state, action) {
    switch (action.type) {
        case calcActions.addNumber:

            if (state.overwrite) {
                return {
                    ...state,
                    overwrite: false,
                    currentOperand: action.payload.value
                }
            }

            // если в текущем сосоянии написан 0, и поступило повторное нажаие 0, то верунть текущее состояние
            if (state.currentOperand === '0' && action.payload.value === "0") {
                return {
                    ...state,
                    currentOperand: action.payload.value + '.'
                }
            }

            // если нажали точку
            if (action.payload.value === ".") {
                if (state.currentOperand == null) {
                    return {
                        ...state,
                        currentOperand: '0' + action.payload.value
                    }
                }
//если уже написана точка, и снова нажали точку, то вторую точку не выводить
                if (state.currentOperand && state.currentOperand.includes(".")) {
                    return state;
                }
            }

            return {
                //... это оператор расширения. Создается копия текущего состояния
                ...state,
                currentOperand: (state.currentOperand || '') + action.payload.value
            }
        case calcActions.cleanScreen:
            return {}
        case calcActions.delNumber:
            if (state.overwrite) {
                return {
                    ...state,
                    overwrite: false
                }
            }

            if (state.currentOperand == null) {
                return state;
            }

            return {
                ...state,
                currentOperand: state.currentOperand.slice(0, -1)
            }
        case calcActions.addOperator:

            //Если еще нет введенного числа и предыдущего значения, то нельзя ввести оператор
            if (state.currentOperand == null && state.lastOperand == null) {
                return state;
            }

            if (state.currentOperand == null) {
                return {
                    ...state,
                    symbol: action.payload.value,
                }
            }


            if (state.lastOperand == null) {
                return {
                    ...state,
                    lastOperand: state.currentOperand,
                    symbol: action.payload.value,
                    currentOperand: null
                }
            }

            return {
                ...state,
                lastOperand: calculateResult(state),
                symbol: action.payload.value,
                currentOperand: null
            }
        case calcActions.calculateResult:
            if (state.currentOperand == null || state.lastOperand == null || state.symbol == null) {
                return state;
            }
            return {
                ...state,
                overwrite: true,
                currentOperand: calculateResult(state),
                lastOperand: null,
                symbol: null
            }
        default:
            throw Error('Неизвестный экшен!!: ' + action.type);
    }
}

// функция, которая преобразует число в строку с пробелами каждые три цифры:
function formatNumberWithSpaces(number) {
    if (number) {
        // return number.toLocaleString();
        return number.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ');
    }

}

export default function App() {
    const [{currentOperand, lastOperand, symbol}, dispatch] = useReducer(reducer, {});

    return (
        <div className="grid-container">
            <div className="output">
                <div className="last-operand">{formatNumberWithSpaces(lastOperand)} {symbol}</div>
                <div className="current-operand">{formatNumberWithSpaces(currentOperand)}</div>
            </div>
            <button className="big" onClick={() => {
                dispatch({type: calcActions.cleanScreen})
            }}>clean
            </button>
            <button onClick={() => {
                dispatch({type: calcActions.delNumber})
            }}>del
            </button>
            <Symbol symbolOperation="/" dispatch={dispatch}/>
            <Number number="1" dispatch={dispatch}/>
            <Number number="2" dispatch={dispatch}/>
            <Number number="3" dispatch={dispatch}/>
            <Symbol symbolOperation="*" dispatch={dispatch}/>
            <Number number="4" dispatch={dispatch}/>
            <Number number="5" dispatch={dispatch}/>
            <Number number="6" dispatch={dispatch}/>
            <Symbol symbolOperation="+" dispatch={dispatch}/>
            <Number number="7" dispatch={dispatch}/>
            <Number number="8" dispatch={dispatch}/>
            <Number number="9" dispatch={dispatch}/>
            <Symbol symbolOperation="-" dispatch={dispatch}/>
            <Number number="." dispatch={dispatch}/>
            <Number number="0" dispatch={dispatch}/>
            <button className="big" onClick={() => {
                dispatch({type: calcActions.calculateResult})
            }}>=
            </button>
        </div>
    );
}

