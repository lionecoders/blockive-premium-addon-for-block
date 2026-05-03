import Chart from 'chart.js/auto';

document.addEventListener('DOMContentLoaded', () => {
    const canvases = document.querySelectorAll('.bpafb-chart-js-canvas');

    canvases.forEach(canvas => {
        const configStr = canvas.getAttribute('data-chart-config');
        if (!configStr) return;

        try {
            const attr = JSON.parse(configStr);
            const { chartData, legendPosition, cutout, borderWidth, borderColor, animationSpeed } = attr;

            if (!chartData || chartData.length === 0) return;

            const data = {
                labels: chartData.map(item => item.label),
                datasets: [{
                    data: chartData.map(item => item.value),
                    backgroundColor: chartData.map(item => item.bg),
                    borderColor: borderColor || '#ffffff',
                    borderWidth: borderWidth !== undefined ? borderWidth : 2,
                }]
            };

            const config = {
                type: cutout > 0 ? 'doughnut' : 'pie',
                data: data,
                options: {
                    responsive: true,
                    maintainAspectRatio: true,
                    animation: {
                        duration: animationSpeed !== undefined ? animationSpeed : 1000
                    },
                    cutout: cutout > 0 ? `${cutout}%` : 0,
                    plugins: {
                        legend: {
                            display: legendPosition !== 'none',
                            position: legendPosition === 'none' ? 'top' : legendPosition,
                        }
                    }
                }
            };

            new Chart(canvas, config);
        } catch (e) {
            console.error('Failed to parse Blockive Pie Chart config:', e);
        }
    });
});
