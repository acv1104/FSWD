// Initialize when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Hide search bar in sidebar
    document.getElementById('sidebar-search').style.display = 'none';

    // Set active menu item to Orders
    document.querySelectorAll('.menu li').forEach(item => {
        item.classList.remove('active');
    });
    document.getElementById('orders-menu-item').classList.add('active');

    // Get all required elements
    const buyingPriceInput = document.getElementById('buying-price');
    const sellingPriceInput = document.getElementById('selling-price');
    const quantityInput = document.getElementById('quantity');
    const profitDisplay = document.getElementById('profit-display');
    const previewBtn = document.getElementById('preview-btn');
    const previewModal = document.getElementById('preview-modal');
    const closePreview = document.getElementById('close-preview');
    const previewContent = document.getElementById('preview-content');
    const orderForm = document.getElementById('order-form');
    const addOrderBtn = document.getElementById('add-order-btn');

    // Profit calculation function
    function calculateProfit() {
        try {
            const buyingPrice = parseFloat(buyingPriceInput.value) || 0;
            const sellingPrice = parseFloat(sellingPriceInput.value) || 0;
            const quantity = parseFloat(quantityInput.value) || 0;
            const profit = (sellingPrice - buyingPrice) * quantity;
            
            // Format the profit with 2 decimal places and ₹ symbol
            profitDisplay.textContent = `₹${profit.toFixed(2)}`;
            
            // Update color based on profit value
            if (profit > 0) {
                profitDisplay.className = 'profit-display profit-positive';
            } else if (profit < 0) {
                profitDisplay.className = 'profit-display profit-negative';
            } else {
                profitDisplay.className = 'profit-display profit-neutral';
            }
        } catch (error) {
            console.error("Error calculating profit:", error);
            profitDisplay.textContent = '₹0';
            profitDisplay.className = 'profit-display profit-neutral';
        }
    }

    // Event listeners for price and quantity changes
    buyingPriceInput.addEventListener('input', calculateProfit);
    sellingPriceInput.addEventListener('input', calculateProfit);
    quantityInput.addEventListener('input', calculateProfit);
    buyingPriceInput.addEventListener('change', calculateProfit);
    sellingPriceInput.addEventListener('change', calculateProfit);
    quantityInput.addEventListener('change', calculateProfit);

    // Preview button functionality
    previewBtn.addEventListener('click', function() {
        // Validate form first
        if (!orderForm.checkValidity()) {
            alert('Please fill in all required fields before previewing.');
            return;
        }

        // Gather all form data
        const formData = {
            productName: document.getElementById('product-name').value,
            productCategory: document.getElementById('product-category').value,
            orderValue: document.getElementById('order-value').value,
            quantity: document.getElementById('quantity').value,
            unit: document.getElementById('unit').value,
            buyingPrice: document.getElementById('buying-price').value,
            sellingPrice: document.getElementById('selling-price').value,
            profit: profitDisplay.textContent,
            deliveryDate: document.getElementById('delivery-date').value
        };

        // Generate preview content
        let previewHTML = `
            <div class="preview-item"><span class="preview-label">Product Name:</span> ${formData.productName}</div>
            <div class="preview-item"><span class="preview-label">Category:</span> ${formData.productCategory}</div>
            <div class="preview-item"><span class="preview-label">Order Value:</span> ₹${formData.orderValue}</div>
            <div class="preview-item"><span class="preview-label">Quantity:</span> ${formData.quantity} ${formData.unit}</div>
            <div class="preview-item"><span class="preview-label">Buying Price (per unit):</span> ₹${formData.buyingPrice}</div>
            <div class="preview-item"><span class="preview-label">Selling Price (per unit):</span> ₹${formData.sellingPrice}</div>
            <div class="preview-item"><span class="preview-label">Total Profit:</span> ${formData.profit}</div>
            <div class="preview-item"><span class="preview-label">Delivery Date:</span> ${formData.deliveryDate}</div>
        `;

        // Insert content and show modal
        previewContent.innerHTML = previewHTML;
        previewModal.style.display = 'flex';
    });

    // Close preview modal
    closePreview.addEventListener('click', function() {
        previewModal.style.display = 'none';
    });

    // Add order functionality
    addOrderBtn.addEventListener('click', function() {
        if (orderForm.checkValidity()) {
            alert('Order added successfully!');
            orderForm.reset();
            profitDisplay.textContent = '₹0';
            profitDisplay.className = 'profit-display profit-neutral';
        } else {
            alert('Please fill in all required fields.');
        }
    });

    // Close modal when clicking outside
    window.addEventListener('click', function(event) {
        if (event.target === previewModal) {
            previewModal.style.display = 'none';
        }
    });

    // Initialize profit calculation
    calculateProfit();
});