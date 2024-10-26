
// let billItems = [];
//     let total = 0;

//     function updateAmountTypeOptions() {
//         const costType = document.getElementById('costType').value;
//         const amountTypeSelector = document.getElementById('amountType');
        
//         amountTypeSelector.innerHTML = ''; // Clear existing options

//         if (costType === 'perPiece') {
//             amountTypeSelector.innerHTML = '<option value="piece">Piece</option>';
//         } else {
//             amountTypeSelector.innerHTML = `
//                 <option value="kg">Kg</option>
//                 <option value="gram">Gram</option>
//             `;
//         }
//     }

//     function addItem() {
//         const productName = document.getElementById('productName').value;
//         const productCost = parseFloat(document.getElementById('productCost').value);
//         const costType = document.getElementById('costType').value;
//         const amountType = document.getElementById('amountType').value;
//         const amount = parseFloat(document.getElementById('amount').value);

//         if (!productName || !productCost || !amount) {
//             alert("Please fill in all fields.");
//             return;
//         }

//         let price = 0;

//         // Calculate the price based on cost type and amount type
//         if (costType === "perKg") {
//             if (amountType === "kg") {
//                 price = productCost * amount;
//             } else if (amountType === "gram") {
//                 price = productCost * (amount / 1000);  // Convert grams to kg for cost per kg
//             }
//         } else if (costType === "perGram") {
//             if (amountType === "gram") {
//                 price = productCost * amount;
//             } else if (amountType === "kg") {
//                 price = productCost * (amount * 1000);  // Convert kg to grams for cost per gram
//             }
//         } else if (costType === "perPiece") {
//             if (amountType === "piece") {
//                 price = productCost * amount;
//             }
//         }

//         total += price;

//         const newItem = {
//             name: productName,
//             amount: amount + (costType === "perPiece" ? ' pcs' : (amountType === "kg" ? ' kg' : ' grams')),
//             price: price.toFixed(2)
//         };

//         billItems.push(newItem);
//         updateBill();
//     }

//     function updateBill() {
//         const billBody = document.getElementById('billBody');
//         billBody.innerHTML = '';

//         billItems.forEach(item => {
//             billBody.innerHTML += `
//                 <tr>
//                     <td>${item.name}</td>
//                     <td>${item.amount}</td>
//                     <td>Rs ${item.price}</td>
//                 </tr>
//             `;
//         });

//         document.getElementById('totalPrice').textContent = total.toFixed(2);
//     }

//     async function generatePDF() {
//         const { jsPDF } = window.jspdf;

//         const doc = new jsPDF();
//         doc.setFontSize(12);

//         let yOffset = 10;
//         doc.text('Bill', 10, yOffset);
//         yOffset += 10;

//         doc.text('Item', 10, yOffset);
//         doc.text('Amount', 60, yOffset);
//         doc.text('Price', 110, yOffset);
//         yOffset += 10;

//         billItems.forEach(item => {
//             doc.text(item.name, 10, yOffset);
//             doc.text(item.amount, 60, yOffset);
//             doc.text(`Rs ${item.price}`, 110, yOffset);
//             yOffset += 10;
//         });

//         doc.text(`Total: Rs ${total.toFixed(2)}`, 10, yOffset);

//         doc.save('bill.pdf');
//     }

//     // Initialize amount type options on page load
//     updateAmountTypeOptions();


let billItems = [];
let total = 0;

function updateAmountTypeOptions() {
    const costType = document.getElementById('costType').value;
    const amountTypeSelector = document.getElementById('amountType');
    
    amountTypeSelector.innerHTML = ''; // Clear existing options

    if (costType === 'perPiece') {
        amountTypeSelector.innerHTML = '<option value="piece">Piece</option>';
    } else {
        amountTypeSelector.innerHTML = `
            <option value="kg">Kg</option>
            <option value="gram">Gram</option>
        `;
    }
}

function addItem() {
    const productName = document.getElementById('productName').value;
    const productCost = parseFloat(document.getElementById('productCost').value);
    const costType = document.getElementById('costType').value;
    const amountType = document.getElementById('amountType').value;
    const amount = parseFloat(document.getElementById('amount').value);

    if (!productName || !productCost || !amount) {
        alert("Please fill in all fields.");
        return;
    }

    let price = 0;

    // Calculate the price based on cost type and amount type
    if (costType === "perKg") {
        if (amountType === "kg") {
            price = productCost * amount;
        } else if (amountType === "gram") {
            price = productCost * (amount / 1000);  // Convert grams to kg for cost per kg
        }
    } else if (costType === "perGram") {
        if (amountType === "gram") {
            price = productCost * amount;
        } else if (amountType === "kg") {
            price = productCost * (amount * 1000);  // Convert kg to grams for cost per gram
        }
    } else if (costType === "perPiece") {
        if (amountType === "piece") {
            price = productCost * amount;
        }
    }

    total += price;

    const newItem = {
        name: productName,
        amount: amount + (costType === "perPiece" ? ' pcs' : (amountType === "kg" ? ' kg' : ' grams')),
        price: price.toFixed(2)
    };

    billItems.push(newItem);
    updateBill();
}

function updateBill() {
    const billBody = document.getElementById('billBody');
    billBody.innerHTML = '';

    billItems.forEach((item, index) => {
        billBody.innerHTML += `
            <tr>
                <td>${item.name}</td>
                <td>${item.amount}</td>
                <td>Rs ${item.price}</td>
                <td><button onclick="deleteItem(${index})">X</button></td>
            </tr>
        `;
    });

    document.getElementById('totalPrice').textContent = total.toFixed(2);
}

function deleteItem(index) {
    // Subtract the price of the item to be deleted from the total
    total -= parseFloat(billItems[index].price);
    // Remove the item from the billItems array
    billItems.splice(index, 1);
    // Update the bill display
    updateBill();
}

async function generatePDF() {
    const { jsPDF } = window.jspdf;

    const doc = new jsPDF();
    doc.setFontSize(12);

    let yOffset = 10;
    doc.text('Bill', 10, yOffset);
    yOffset += 10;

    doc.text('Item', 10, yOffset);
    doc.text('Amount', 60, yOffset);
    doc.text('Price', 110, yOffset);
    yOffset += 10;

    billItems.forEach(item => {
        doc.text(item.name, 10, yOffset);
        doc.text(item.amount, 60, yOffset);
        doc.text(`Rs ${item.price}`, 110, yOffset);
        yOffset += 10;
    });

    doc.text(`Total: Rs ${total.toFixed(2)}`, 10, yOffset);

    doc.save('bill.pdf');
}

// Initialize amount type options on page load
updateAmountTypeOptions();
