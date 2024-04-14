function calculateShares() {
    const capital = parseFloat(document.getElementById('capital').value) || 0;
    const entryPrice = parseFloat(document.getElementById('entryPrice').value) || 0;

    if (capital > 0 && entryPrice > 0) {
        const shares = Math.floor(capital / entryPrice);
        document.getElementById('numberOfShares').innerText = `Shares to Buy: ${shares}`;
        calculateStopLossAndReturns();
    } else {
        document.getElementById('numberOfShares').innerText = "Shares to Buy: 0";
    }
}


function calculateStopLossAndReturns() {
    const shares = parseFloat(document.getElementById('numberOfShares').textContent.split(": ")[1]);
    const entryPrice = parseFloat(document.getElementById('entryPrice').value);
    const targetPrice = parseFloat(document.getElementById('targetPrice').value);
    const risk = parseFloat(document.getElementById('risk').value) || 0;
    const reward = parseFloat(document.getElementById('reward').value) || 0;
    const tradeType = document.getElementById('tradeType').value;

    // Validation for trade direction
    if ((tradeType === 'long' && targetPrice <= entryPrice) ||
        (tradeType === 'short' && targetPrice >= entryPrice)) {
        alert('For long trades, the target price must be greater than the entry price. For short trades, the target price must be lower.');
        document.getElementById('targetPrice').focus();
        return; // Stop execution if the condition is not met
    }

    // Calculate Return and Stop Loss
    if (entryPrice > 0 && targetPrice > 0 && shares > 0) {
        const returnPercentage = ((targetPrice - entryPrice) / entryPrice) * 100;
        const riskPercentage = returnPercentage / (reward / risk);
        const stopLossPrice = (tradeType === 'long') ? 
                                entryPrice * (1 - riskPercentage / 100) : 
                                entryPrice * (1 + riskPercentage / 100);
        const lossAmount = Math.abs(entryPrice - stopLossPrice) * shares;
        const absoluteReturn = (targetPrice - entryPrice) * shares;

        document.getElementById('absoluteReturn').innerText = `Return: ₹${absoluteReturn.toFixed(2)} (${returnPercentage.toFixed(2)}%)`;
        document.getElementById('stopLossResult').innerText = `Stop Loss Price: ₹${stopLossPrice.toFixed(2)}`;
        document.getElementById('absoluteLoss').innerText = `Absolute Loss at Stop Loss: ₹${lossAmount.toFixed(2)} (${Math.abs(riskPercentage).toFixed(2)}%)`;
    }
}

document.getElementById('tradeType').addEventListener('change', calculateStopLossAndReturns);
document.getElementById('capital').addEventListener('input', calculateShares);
document.getElementById('entryPrice').addEventListener('input', calculateShares);
document.getElementById('targetPrice').addEventListener('input', calculateStopLossAndReturns);
document.getElementById('risk').addEventListener('input', calculateStopLossAndReturns);
document.getElementById('reward').addEventListener('input', calculateStopLossAndReturns);
