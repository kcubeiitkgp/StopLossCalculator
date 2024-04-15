function calculateStopLossAndReturns() {
    const shares = parseFloat(document.getElementById('numberOfShares').textContent.split(": ")[1]);
    const entryPrice = parseFloat(document.getElementById('entryPrice').value);
    const targetPrice = parseFloat(document.getElementById('targetPrice').value);
    const riskRewardRatio = document.getElementById('riskReward').value.split(":");
    const risk = parseFloat(riskRewardRatio[0]);
    const reward = parseFloat(riskRewardRatio[1]);
    const tradeType = document.getElementById('tradeType').value;

    if (entryPrice > 0 && targetPrice > 0 && shares > 0) {
        let returnPercentage, stopLossPrice;

        if (tradeType === 'long') {
            const priceDifference = targetPrice - entryPrice;
            stopLossPrice = entryPrice - (priceDifference * (risk / reward));
            returnPercentage = (priceDifference / entryPrice) * 100;
        } else { // 'short'
            const priceDifference = entryPrice - targetPrice;
            stopLossPrice = entryPrice + (priceDifference * (risk / reward));
            returnPercentage = (priceDifference / entryPrice) * 100;
        }

        const lossAmount = Math.abs(entryPrice - stopLossPrice) * shares;
        const absoluteReturn = (tradeType === 'long' ? (targetPrice - entryPrice) : (entryPrice - targetPrice)) * shares;

        document.getElementById('absoluteReturn').innerText = `Return: ₹${absoluteReturn.toFixed(2)} (${returnPercentage.toFixed(2)}%)`;
        document.getElementById('stopLossResult').innerText = `Stop Loss Price: ₹${stopLossPrice.toFixed(2)}`;
        document.getElementById('absoluteLoss').innerText = `Absolute Loss at Stop Loss: ₹${lossAmount.toFixed(2)} (${Math.abs((entryPrice - stopLossPrice) / entryPrice * 100).toFixed(2)}%)`;
    }
}

// Event listeners for form inputs
document.getElementById('tradeType').addEventListener('change', calculateStopLossAndReturns);
document.getElementById('capital').addEventListener('input', calculateShares);
document.getElementById('entryPrice').addEventListener('input', calculateShares);
document.getElementById('targetPrice').addEventListener('input', calculateStopLossAndReturns);
document.getElementById('riskReward').addEventListener('input', calculateStopLossAndReturns);
