# Payback Time

> Place an order that makes you rich.

This hack abuses the fact that the basket item's quantities are not validated when checking out, allowing for orders with negatives prices.

## Disclaimer

This writeup is for educational purposes only. Only perform the described pentesting methods using applications
specifically designed for it (like the juice-shop) or if you have permission from the owner  of the application you are
trying to find vulnerabilities in.

## Vulnerabilities

**[CWE-1284](https://cwe.mitre.org/data/definitions/1284.html): Improper Validation of Specified Quantity in Input**

> The product receives input that is expected to specify a quantity (such as size or length), but it does not validate
> or incorrectly validates that the quantity has the required properties.

**[CWE-20](https://cwe.mitre.org/data/definitions/20.html): Improper Input Validation**

> The product receives input or data, but it does not validate or incorrectly validates that the input has the properties
> that are required to process the data safely and correctly.

## Prerequisites

- [Burp Suite](https://portswigger.net/burp) for intercepting, inspecting, and modifying HTTP traffic.

## 1. Creating an order with a negative price

1. When adding an item to the basket, the frontend sends a request to the backend containing the `ProductId`, `BasketId` and `Quantity`:
    
   ![Add to basket payload](img/payback-payload-before.png)
2. After intercepting this request with Burp Suite, I can edit the `quantity` to a negative number, which - if it works -
    would make the order have a negative price.

    ![Modified add to basket payload](img/payback-payload-after.png)
3. After forwarding the modified request and opening my basket, I can see that I have -1000 Eggfruit Juices, having a total
    price of -8990¤.

    ![Basket with -1000 items](img/payback-basket.png)
4. I added a (fake) address and chose a delivery method, which got me to the checkout page:

    ![Checkout page](img/payback-checkout.png)
5. I chose "Pay using wallet" and confirmed the order:

    ![Order confirmation](img/payback-confirmation.png)
6. This placed an order with a price of -8989.01¤, and added 7989.01 (8989.01¤ - 1000 Bonus points) to my wallet:
    
    ![Order](img/payback-order.png)
    ![Wallet](img/payback-wallet.png)

## 2. How to fix this vulnerability

When adding items to the basket, the server must verify that the amount of items added is not negative.
Additionally, checking the total price of an order before allowing users to pay to be positive is also a good idea.

My first idea was that the price could be modified on the frontend, which was not possible, since the client only sends
the product id and the server handles the price calculation. This is good, but the quantity should be validated before
adding!