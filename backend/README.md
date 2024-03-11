# Payment Server, ACID Transactions

This repository contains the source code for an Express API server built using Node.js. 

## Installation

1. Clone the repository:

   ```bash
   git clone <repository_url>
   npm install
# Backend Routes Documentation

## Authentication Routes

###  Sign Up
- **URL:** `/api/v1/user/signup`
- **Method:** `POST`
- **Description:** Registers a new user.
- **Request Body:**
  ```json
  {
      "username": "example_user",
      "firstName": "John",
      "lastName": "Doe",
      "password": "example_password"
  }
 ### Response:
- `200 OK` on successful registration. Response contains user details and authentication token.
- `411 Length Required` if inputs are invalid.
- `500 Internal Server Error` if registration fails.


## Sign In

### Route:
- **URL:** `/api/v1/user/signin`
- **Method:** `POST`

### Description:
Logs in an existing user.

### Request Body:
    
    {
    "username": "example_user",
    "password": "example_password"
    } 
## Sign In

### Response:
- `200 OK` on successful login. Response contains user details and authentication token.
- `404 Not Found` if user not found.
- `401 Unauthorized` if password is incorrect.
- `500 Internal Server Error` if login fails.

## Update User Information

### Route:
- **URL:** `/api/v1/user`
- **Method:** `PUT`

### Description:
Updates user information.

### Authorization:
Requires authentication token in the request headers.

### Request Body:
JSON object containing fields to be updated.

### Response:
- `200 OK` on successful update.
- `411 Length Required` if inputs are invalid.
- `500 Internal Server Error` if update fails.

## Bulk User Search

### Route:
- **URL:** `/api/v1/user/bulk`
- **Method:** `GET`

### Description:
Search for users by first name or last name.

### Request Query Parameters:
- `filter`: String to filter users by first name or last name.

### Response:
JSON object containing matching users.

# Account Routes Documentation

## Get Account Balance

### Route:
- **URL:** `/api/v1/account/balance`
- **Method:** `GET`

### Description:
Retrieves the balance of the authenticated user's account.

### Authorization:
Requires authentication token in the request headers.

### Response:
JSON object containing the balance of the user's account.

## Transfer Funds

### Route:
- **URL:** `/api/v1/account/transfer`
- **Method:** `POST`

### Description:
Transfers funds from the authenticated user's account to another account.

### Authorization:
Requires authentication token in the request headers.

### Request Body:
JSON object containing the following fields:
- `amount`: The amount of funds to transfer.
- `to`: The user ID of the account to transfer funds to.

### Response:
- `200 OK` on successful transfer. Response contains a message indicating the success.
- `400 Bad Request` if inputs are invalid or insufficient balance.
- `404 Not Found` if the user's account or the destination account is not found.
- `500 Internal Server Error` if the transfer fails.

## Get Account Information

### Route:
- **URL:** `/api/v1/account`
- **Method:** `GET`

### Description:
Retrieves the account information.

### Response:
JSON object containing the account information.


