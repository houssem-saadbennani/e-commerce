const products = {
    phones: [
        {
            id: 'p1',
            name: 'iPhone 14 Pro',
            price: 3600,
            image: 'img/phones/iphone 14.jpg'
        },
        {
            id: 'p2',
            name: 'Samsung S23 Ultra',
            price: 3800,
            image: 'img/phones/samsung s23.jpg'
        },
        {
            id: 'p3',
            name: 'Google Pixel 7',
            price: 899,
            image: 'img/phones/google pixels .webp'
        },
        {
            id:"p4",
            name:"XIAOMI REDMI 13C",
            price:599,
            image:"img/phones/13c.jpg"
        }
    ],
    pcs: [
        {
            id: 'pc1',
            name: 'Asus Tuf F15',
            price: 2600,
            image: 'img/pcs/pc-portable-asus-tuf-gaming-f15-i7-13e-gen-32go-rtx-4050.jpg'
        },
        {
            id: 'pc2',
            name: 'MSI Thin GF63',
            price: 3400,
            image: 'img/pcs/pc-portable-gamer-msi-thin-gf63-12vf-i7-12e-gen-24g-rtx-4060.jpg'
        },
        {
            id: 'pc3',
            name: ' LENOVO ThinkPad L15 ',
            price: 3350,
            image: 'img/pcs/pc-portable-lenovo-thinkpad-l15-gen-3-i5-12e-gen-8go-256go-ssd-noir-g.jpg',
        },
        {
            id:'pc4',
            name:'Pc de Bureau Gamer',
            price:1060,
            image:'img/pcs/pc-de-bureau-gamer-mytek-amd-ryzen-5-8go-500g-ssd-noir.jpg'
        }
    ]
};
$(document).ready(function() {
    var cart = [];

    function showNotification(message) {
        var notification = $(`<div class="notification">${message}</div>`);
        $('body').append(notification);
        
        setTimeout(() => {
            notification.remove();
        }, 3000);
    }

    function renderProducts(productArray, containerId) {
        var container = $(`#${containerId}`);
        container.empty();

        productArray.forEach(product => {
            const productCard = $(`
                <div class="product-card">
                    <img src="${product.image}" alt="${product.name}">
                    <h3>${product.name}</h3>
                    <p class="price">${product.price}DT</p>
                    <button onclick="addToCart('${product.id}')">Add to Cart</button>
                </div>
            `);
            container.append(productCard);
        });
    }

    if (window.location.pathname.includes('phones.html')) {
        renderProducts(products.phones, 'phoneProducts');
    } else if (window.location.pathname.includes('pcs.html')) {
        renderProducts(products.pcs, 'pcProducts');
    } else {
        var featured = [...products.phones.slice(0, 2), ...products.pcs.slice(0, 2)];
        renderProducts(featured, 'featuredProducts');
    }

    $('#search').on('input', function() {
        var searchTerm = $(this).val().toLowerCase();
        var allProducts = [...products.phones, ...products.pcs];
        var filtered = allProducts.filter(product => 
            product.name.toLowerCase().includes(searchTerm)
        );

        var currentContainer = $('.products').attr('id');
        if (currentContainer) {
            renderProducts(filtered, currentContainer);
        }
    });

    window.addToCart = function(productId) {
        var allProducts = [...products.phones, ...products.pcs];
        var product = allProducts.find(p => p.id === productId);
        
        if (product) {
            cart.push(product);
            updateCartCount();
            showNotification(`${product.name} added to cart!`);
        }
    };

    function updateCartCount() {
        $('#cartCount').text(cart.length);
    }

    $('body').append(`
        <div class="modal" id="cartModal">
            <div class="modal-content">
                <div class="modal-header">
                    <h2>Shopping Cart</h2>
                    <button class="modal-close">&times;</button>
                </div>
                <div class="cart-items"></div>
                <div class="cart-total"></div>
            </div>
        </div>
    `);

    

    $('#cartBtn').click(function() {
        var modal = $('#cartModal');
        var itemsContainer = modal.find('.cart-items');
        var totalContainer = modal.find('.cart-total');
        
        itemsContainer.empty();
        
        if (cart.length === 0) {
            itemsContainer.html('<p>Your cart is empty</p>');
        } else {
            cart.forEach(item => {
                itemsContainer.append(`
                    <div class="cart-item">
                        <h3>${item.name}</h3>
                        <p>${item.price}DT</p>
                    </div>
                `);
            });
        }
        
        var total = cart.reduce((sum, product) => sum + product.price, 0);
        totalContainer.html(`<p>Total: ${total}DT</p>`);
        
        modal.css('display', 'flex');
    });


    $('.modal-close').click(function() {
        $('#cartModal').css('display', 'none');
    });

    $(window).click(function(event) {
        if ($(event.target).is('.modal')) {
            $('.modal').css('display', 'none');
        }
    });
});
function setupCounter(element) {
    var counter = 0
    var setCounter = (count) => {
      counter = count
      element.innerHTML = `count is ${counter}`
    }
    element.addEventListener('click', () => setCounter(counter + 1))
    setCounter(0)
  }
   
  