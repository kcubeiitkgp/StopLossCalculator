function calculateReturnPercentage() {
    const entryPrice = parseFloat(document.getElementById('entryPrice').value) || 0;
    const targetPrice = parseFloat(document.getElementById('targetPrice').value) || 0;
    const tradeType = document.getElementById('tradeType').value;

    if (entryPrice !== 0 && targetPrice !== 0) {
        let priceDifference = targetPrice - entryPrice;
        let returnPercentage;

        if (tradeType === 'long') {
            returnPercentage = (priceDifference / entryPrice) * 100;
        } else if (tradeType === 'short') {
            // For a short trade, a positive return results from a price decrease
            returnPercentage = (-priceDifference / entryPrice) * 100;
        }

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
        } else if (tradeType === 'short') {
            // For short trades, the stop loss needs to be above the entry price
            stopLossPrice = entryPrice + (Math.abs(priceDifference) * riskRewardRatio);
        }

        document.getElementById('result').innerText = `Calculated Stop Loss Price: ${stopLossPrice.toFixed(2)}`;
    } else {
        document.getElementById('result').innerText = "Stop Loss Price: N/A";
    }
}
