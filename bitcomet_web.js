console.log('bitcomet_web.js has been loaded');

// 獲取所有表格
const tables = document.querySelectorAll('table');
if (tables.length === 0) {
    console.log('No tables found');
} else {
    // 獲取最後一個表格
    const lastTable = tables[tables.length - 1];
    // 獲取最後一個表格中的所有行
    const rows = lastTable.querySelectorAll('tbody tr');
    const nameColumnIndex = 1; // 假設Name欄位是第二列（索引從0開始）
    const progressColumnIndex = 5; // 假設Progress欄位是第六列（索引從0開始）

    // 用於存儲每個數字部分及其對應的行
    const numberMap = new Map();
    const progress100Rows = []; // 用於存儲Progress為100%的行

    rows.forEach(row => {
        const cells = row.querySelectorAll('td');
        if (cells.length > nameColumnIndex && cells.length > progressColumnIndex) {
            const nameCell = cells[nameColumnIndex];
            const progressCell = cells[progressColumnIndex];
            let nameText = nameCell.textContent || nameCell.innerText;
            let progressText = progressCell.textContent || progressCell.innerText;
            console.log('Original Name Text:', nameText);
            console.log('Progress Text:', progressText);

            // 排除數字.xyz的格式
            nameText = nameText.replace(/\d+\.xyz/g, '');
            // 排除括號中的數字
            nameText = nameText.replace(/\(\d+\)/g, '');
            console.log('Filtered Name Text:', nameText);

            // 提取數字前面有 - 的數字部分
            const numberMatch = nameText.match(/-(\d+)/);

            if (numberMatch) {
                const number = numberMatch[1]; // 提取匹配的數字部分
                console.log('Number:', number);
                if (numberMap.has(number)) {
                    // 如果數字已經存在，將當前行和之前的行標示為同一個顏色
                    const existingRows = numberMap.get(number);
                    existingRows.push(row);
                    numberMap.set(number, existingRows);
                } else {
                    // 如果數字不存在，將其添加到Map中
                    numberMap.set(number, [row]);
                }
            }

            // 檢查Progress欄位是否為100%
            if (progressText.trim() === '100.0%') {
                progress100Rows.push(row);
            }
        }
    });

    // 為重複的行標示顏色
    function getBrightColor() {
        const hue = Math.floor(Math.random() * 360);
        return `hsl(${hue}, 100%, 75%)`; // 高飽和度和高亮度
    }

    numberMap.forEach((rows, number) => {
        if (rows.length > 1) {
            const color = getBrightColor();
            console.log('Coloring rows with number:', number, 'Color:', color);
            rows.forEach(row => {
                row.style.backgroundColor = color;
            });
        }
    });

    // 為Progress為100%的行標示顏色
    const progressColor = '#D3D3D3';
    console.log('Coloring rows with Progress 100%:', progressColor);
    progress100Rows.forEach(row => {
        row.style.backgroundColor = progressColor;
    });
}