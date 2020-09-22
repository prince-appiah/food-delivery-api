# Food Delivery Web App

## Customers

Customers can:

1. Search foods listed by various restaurants.
2. Order and get them delivered.
3. Only order from one restaurant at a time.
4. Rate restaurants

### Requirements

- Signup/Login
- Customer Model: Name, email, password, address, contact
- Orders Model: Customer name(with address),dish name(with quantity, restaurant's name),

### Dashboard

---

## Restaurant Owner

Restaurant owners can:

1. List menu/foods.
2. Get orders from customers and deliver to them.

### Requirements

- Signup/Login: One restaurant per owner
- Dishes Model: name, cuisine type, quantity, order status(confirmed/en route,delivered/canceled)
- Restaurant Model: name, address, city,description, menu(should be a list of dishes), status(open/closed), ratings(out of 5)
- Restaurant Owner Model: Name, email, password, address, contact

### Dashboard - (including CRUD)

- Profile: Restaurant name, Owner's name(with contact),Restaurant address, location(with google map),restaurant status(open/closed).
- Orders: receive notifications when order is placed, rated and order is canceled

---

## Delivery person

- Model: name, contact
