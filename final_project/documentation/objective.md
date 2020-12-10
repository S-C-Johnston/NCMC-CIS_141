PWA banking app
===============

Features must have:
- Login page
  + Username/password
- Check Balance
  + (transaction history)?
- Deposit
  + (Simulated) remote check capture
- Withdraw
  + From arbitrary account?
- Transfer
  + Between checking and savings?
- No overdrafts

Design must have:
- All green lighthouse results excepting SEO
- PWA must work
  + HTTPS/HTTP2 with key/cert
- Object Oriented Programming

Bonus credit:
- Heroku
- Remote check capture
- Biometric login

Design
------

Login:
frontend:
- username and password form, submission sends hash
- wait for response
- response ok
backend:
- check received hashes against json file

Bank class:
- Transfer method
  + interacts with accounts
- Array of pending transactions
- Array of confirmed transactions
- Array of users
  + Stubs with foreign key?

User class:
- User ID
  + static method
- User Name
- User Email
- Array of accounts

Account class:
- Account ID
  + static method
- Name
- Type
- Balance
- Pending balance
- Array of confirmed transaction stubs w/ foreign key and calculated value at
  timestamp
  + Array: ``[transaction_id, calculated balance]``
- Array of pending transaction stubs

Transaction class:
- Transaction ID
  + static method
- Source account by ID
  + Pending or confirmed?
- Destination account by ID
  + Pending or confirmed?
- Amount
- Memo
- Type
- Timestamp

Sitemap
-------
login -> new_user, index
new_user -> login

Frontend requests
-----------------
login
new user
get balance
get transaction(s)
transfer
deposit
