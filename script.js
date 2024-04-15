document.addEventListener('DOMContentLoaded', function() {
    // Function to calculate how many shares can be bought
    function calculateShares() {
        const capital = parseFloat(document.getElementById('capital').value) || 0;
        const entryPrice = parseFloat(document.getElementById('entryPrice').value) || 0;
        
        if (capital > 0 && entryPrice > 0) {
            const shares = Math.floor(capital / entryPrice);
            document.getElementById('numberOfShares').innerText = `Shares to Buy: ${shares}`;
            calculateStopLossAndReturns();  // Recalculate stop loss and returns whenever shares are updated
        } else {
            document.getElementById('numberOfShares').innerText = "Shares to Buy: 0";
        }
    }

    // Function to calculate return and stop loss
    function calculateStopLossAndReturns() {
        const shares = parseFloat(document.getElementById('numberOfShares').textContent.split(": ")[1]) || 0;
        const entryPrice = parseFloat(document.getElementById('entryPrice').value) || 0;
        const targetPrice = parseFloat(document.getElementById('targetPrice').value) || 0;
        const risk = parseFloat(document.getElementById('risk').value) || 0;
        const reward = parseFloat(document.getElementById('reward').value) || 0;
        const tradeType = document.getElementById('tradeType').value;

        if (entryPrice > 0 && targetPrice > 0 && shares > 0) {
            const priceDifference = targetPrice - entryPrice;
            const returnPercentage = (priceDifference / entryPrice) * 100;
            let stopLossPrice = entryPrice;

            if (tradeType === 'long') {
                stopLossPrice -= Math.abs(priceDifference * (risk / reward));
            } else {
                stopLossPrice += Math.abs(priceDifference * (risk / reward));
            }

            const lossAmount = Math.abs(entryPrice - stopLossPrice) * shares;
            const absoluteReturn = Math.abs(priceDifference) * shares;

            document.getElementById('absoluteReturn').innerText = `Return: ₹${absoluteReturn.toFixed(2)} (${returnPercentage.toFixed(2)}%)`;
            document.getElementById('stopLossResult').innerText = `Stop Loss Price: ₹${stopLossPrice.toFixed(2)}`;
            document.getElementById('absoluteLoss').innerText = `Absolute Loss at Stop Loss: ₹${lossAmount.toFixed(2)} (${Math.abs((entryPrice - stopLossPrice) / entryPrice * 100).toFixed(2)}%)`;
        }
    }

    // Set up event listeners
    document.getElementById('tradeType').addEventListener('change', calculateStopLossAndReturns);
    document.getElementById('capital').addEventListener('input', calculateShares);
    document.getElementById('entryPrice').addEventListener('input', calculateShares);
    document.getElementById('targetPrice').addEventListener('input', calculateStopLossAndReturns);
    document.getElementById('risk').addEventListener('input', calculateStopLossAndReturns);
    document.getElementById('reward').addEventListener('input', calculateStopLossAndReturns);
});
