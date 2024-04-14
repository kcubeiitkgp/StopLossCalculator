function calculateReturnPercentage() {
    const entryPrice = parseFloat(document.getElementById('entryPrice').value) || 0;
    const targetPrice = parseFloat(document.getElementById('targetPrice').value) || 0;

    if (entryPrice !== 0 && targetPrice !== 0) {
        const priceDifference = targetPrice - entryPrice;
        const returnPercentage = (priceDifference / entryPrice) * 100;
        document.getElementById('dynamicReturnPercent').innerText = `Return Percentage: ${returnPercentage.toFixed(2)}%`;
    } else {
        document.getElementById('dynamicReturnPercent').innerText = "Return Percentage: N/A";
    }
}

function calculateStopLoss() {
    const entryPrice = parseFloat(document.getElementById('entryPrice').value);
    const targetPrice = parseFloat(document.getElementById('targetPrice').value);
    const risk = parseFloat(document.getElementById('risk').value) || 0;
    const reward = parseFloat(document.getElementById('reward').value) || 0;
    const tradeType = document.getElementById('tradeType').value;

    if (risk !== 0 && reward !== 0 && entryPrice !== 0 && targetPrice !== 0) {
        const priceDifference = targetPrice - entryPrice;
        const riskRewardRatio = risk / reward;

        let stopLossPrice;
        if (tradeType === 'long') {
            stopLossPrice = entryPrice - (priceDifference * riskRewardRatio);
        } else { // Corrected calculation for short trades
            stopLossPrice = entryPrice + (Math.abs(priceDifference) * riskRewardRatio);
        }

        document.getElementById('result').innerText = `Calculated Stop Loss Price: ${stopLossPrice.toFixed(2)}`;
    } else {
        document.getElementById('result').innerText = "Stop Loss Price: N/A";
    }
}
