export const addItem = (item = [], count = 0, next = f => f) => {
    let cart = [];
    if (typeof window !== 'undefined') { //getitem:getting item from local storage. after we have cart items then pop local storage.
        if (localStorage.getItem('cart')) {
            cart = JSON.parse(localStorage.getItem('cart')); //json.parse() coverts json to obj while json.stringfy does the oppo.
        }
        cart.push({
            ...item,
            count: 1 //updating the quantity not pushing actual product which in turn can dulplicate products.
        }); 
//dup aviodance explaination of fuction.
// build an Array from new Set and turn it back into array using Array.from
// so that later we can re-map it
// new set will only allow unique values in it
// so pass the ids of each object/product
// If the loop tries to add the same value again, it'll get ignored
// ...with the array of ids we got on when first map() was used
// run map() on it again and return the actual product from the cart

    cart = Array.from(new Set(cart.map(p => p._id))).map(id => {
        return cart.find(p => p._id === id);
    });
    //new set removes dup
    localStorage.setItem('cart', JSON.stringify(cart));
    next();
    }
}

//tottal items in cart for navi
export const itemTotal = () => {
    if (typeof window !== 'undefined') {
        if (localStorage.getItem('cart')) {
            return JSON.parse(localStorage.getItem('cart')).length; //.lenght num val
        }
    }
    return 0;
};

//gives all the item compo from cart
export const getCart = () => {
    if (typeof window !== 'undefined') {
        if (localStorage.getItem('cart')) {
            return JSON.parse(localStorage.getItem('cart'));
        }
    }
    return [];
};

//updating cart 
//add product aka update aka incrementing
export const updateItem = (productId, count) => {
    let cart = [];
    if (typeof window !== 'undefined') {
        if (localStorage.getItem('cart')) {
            cart = JSON.parse(localStorage.getItem('cart'));
        }

        cart.map((product, i) => {
            if (product._id === productId) {
                cart[i].count = count; //updating its count in fe
            }
        });

        localStorage.setItem('cart', JSON.stringify(cart));
    }
};
//removing 
export const removeItem = productId => {
    let cart = [];
    if (typeof window !== 'undefined') {
        if (localStorage.getItem('cart')) {
            cart = JSON.parse(localStorage.getItem('cart'));
        }

        cart.map((product, i) => {
            if (product._id === productId) { //where to splice and how many is the argus
                cart.splice(i, 1);  //if id matchs take it out ie decrement it using splice by getting that particular item and taking one out from that index.
            }
        });

        localStorage.setItem('cart', JSON.stringify(cart));
    }
    return cart;
};


//emptying our cart
export const emptyCart = next => {
    if (typeof window !== 'undefined') {
        localStorage.removeItem('cart');
        next();
    }
};