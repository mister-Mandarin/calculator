export default function calculateResult(state) {
    const prev = parseFloat(state.lastOperand);
    const current = parseFloat(state.currentOperand);
    if (isNaN(prev) || isNaN(current)) {
        return
    }

    let result = '';

    switch (state.symbol) {
        case '+':
            result = prev + current
            break
        case '-':
            result = prev - current
            break
        case '*':
            result = prev * current
            break
        case '/':
            result = prev / current
            break
        default:
            return
    }
    return result.toString();
}