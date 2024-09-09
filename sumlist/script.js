function mulArray() {
    
    const input = document.getElementById('arrayInput').value;
    const numArray = input.split(',').map(Number);
    
    const s = numArray.reduce((total, num) => total * num, 1);

    
    document.getElementById('result').innerText = `mul: ${s}`;
}
