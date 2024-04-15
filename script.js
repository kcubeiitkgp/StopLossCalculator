function calculateStopLossAndReturns() {
    const shares = parseFloat(document.getElementById('numberOfShares').textContent.split(": ")[1]);
    const entryPrice = parseFloat(document.getElementById('entryPrice').value);
    const targetPrice = parseFloat(document.getElementById('targetPrice').value);
    const risk = parseFloat(document.getElementById('risk').value) || 0;
    const reward = parseFloat(document.getElementById('reward').value) || 0;
    const tradeType = document.getElementById('tradeType').value;

    // Calculate Return and Stop Loss
    if (entryPrice > 0 && targetPrice > 0 && shares > 0) {
        let returnPercentage, stopLossPrice;

        if (tradeType === 'long') {
            returnPercentage = ((targetPrice - entryPrice) / entryPrice) * 100;
            stopLossPrice = entryPrice * (1 - (risk / reward));
        } else {  // Short trade
            returnPercentage = ((entryPrice - targetPrice) / entryPrice) * 100;  // Profit from price decrease
            stopLossPrice = entryPrice * (1 + (risk / reward));  // Stop loss should be higher than entry price
        }

        const lossAmount = Math.abs(entryPrice - stopLossPrice) * shares;
        const absoluteReturn = (tradeType === 'long' ? (targetPrice - entryPrice) : (entryPrice - targetPrice)) * shares;

        document.getElementById('absoluteReturn').innerText = `Return: ₹${absoluteReturn.toFixed(2)} (${returnPercentage.toFixed(2)}%)`;
        document.getElementById('stopLossResult').innerText = `Stop Loss Price: ₹${stopLossPrice.toFixed(2)}`;
        document.getElementById('absoluteLoss').innerText = `Absolute Loss at Stop Loss: ₹${lossAmount.toFixed(2)} (${Math.abs(returnPercentage / (reward / risk)).toFixed(2)}%)`;
    }
}

document.getElementById('tradeType').addEventListener('change', calculateStopLossAndReturns);
document.getElementById('capital').addEventListener('input', calculateShares);
document.getElementById('entryPrice').addEventListener('input', calculateShares);
document.getElementById('targetPrice').addEventListener('input', calculateStopLossAndReturns);
document.getElementById('risk').addEventListener('input', calculateStopLossAndReturns);
document.getElementById('reward').addEventListener('input', calculateStopLossAndReturns);
