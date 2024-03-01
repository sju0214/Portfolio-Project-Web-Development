'use strict';

const express = require("express");
const app = express();
const PORT = 3000;

app.use(express.urlencoded({
    extended: true
}));


// POST method response to contact page 
app.post("/contact", (req, res) => {
    const person = req.body.fullName;
    const rating = req.body.rate;
    const message = req.body.comments;
    const email = req.body.email;
    const interest = req.body.interest;
    const information = req.body.moreInformation;

    res.send(`
        ${htmlTop}
        <h3>Hello, ${person}.</h3>
        <p>Thank you for your rating of ${rating} and we appreciate your feedback of: 
        <br>${message}.<br>
        You found the topic(s) regarding ${interest} most interesting and let us know that ${information}.<br>
        Any additional information that was requested will be sent via email at ${email}.
        <br>
        Thank you and have a great day! </p>
        ${htmlBottom}
        `);
});

// import products.js file and its object
const productObject = require('./products.js').products;

// function to compare user input with products.js 
function compareInput(productOrder) {
    for (const oneItem of productObject) {
        if (oneItem.product === productOrder) {
            return oneItem
        }
    }
}

// POST method response to order page
app.post("/order", (req, res) => {
    const person = req.body.fullName;
    const email = req.body.email;
    const address = req.body.address;
    const delivery = req.body.delivery;
    const purchase = compareInput(req.body.productOrder);
    const company = purchase.company;
    const price = purchase.price
    const product = purchase.product
    const quantity = req.body.quantity;
    const final = quantity * price

    res.send(`
        ${htmlTop}
        <h2>Order Confirmation</h2>
        <h3>Thank you for your order, ${person}.</h3>
        <p>You just placed an order for a <strong>${product}</strong> from the company, <strong>${company}</strong>.
        This product is priced at <strong>$${price}</strong> and you ordered <strong>${quantity}</strong>.
        The total price for your order is <strong>$${final}</strong>.
        <br>
        <br>
        Your order will be delivered to <strong>${address}</strong> and you have requested the following 
        delivery instructions: <strong>${delivery}</strong>.
        <br>
        We will reach you at <strong>${email}</strong> if more information 
        is needed. Thank you!
        </p>
        ${htmlBottom}
        `);
});

let htmlTop = `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset='utf-8'>
        <meta http-equiv='X-UA-Compatible' content='IE=edge'>
        <title>Seongyeong Ju</title>
        <meta name='viewport' content='width=device-width, initial-scale=1'>
        <link rel='stylesheet' type='text/css' media='screen' href='main.css'>
        <script src='main.js'></script>
        <link rel="apple-touch-icon" sizes="180x180" href="apple-touch-icon.png">
        <link rel="icon" type="image/png" sizes="512x512" href="android-chrome-512x512.png"> 
        <link rel="icon" type="image/png" sizes="192x192" href="android-chrome-192x192.png"> 
        <link rel="icon" type="image/png" sizes="32x32" href="favicon-32x32.png">
        <link rel="icon" type="image/png" sizes="16x16" href="favicon-16x16.png">
        <link rel="manifest" href="site.webmanifest">
        <link rel="stylesheet" href="main.css" />
    </head>
    <body>
        <header>
            <h1><img src="android-chrome-192x192.png" alt="Seongyeong Ju">Seongyeong Ju</h1>
        </header>
        <nav>
            <a href="index.html">Home</a>
            <a href="contact.html">Contact</a>
            <a href="gallery.html">Gallery</a>
            <a href="order.html">Order</a>
        </nav>
        <main>
        `;

let htmlBottom = `
    </main>
        <footer>&copy; 2023 Seongyeong Ju</footer>
    </body>
    </html>
    `;


app.use(express.static('public'));

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});