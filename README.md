
# Express.js CRUD Application

This is a simple CRUD (Create, Read, Update, Delete) application built using Express.js. The application interacts with a `data.json` file to perform CRUD operations on items, where each item contains an `id`, `name`, and `description`.

## Features

- **Create**: Add a new item to the list.
- **Read**: Retrieve all items or a specific item by its ID.
- **Update**: Modify an existing item by its ID.
- **Delete**: Remove an item by its ID.

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js and npm installed on your local machine.
- Basic knowledge of Node.js and Express.js.

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Moiz-stack/express-crud-app.git
   ```

2. Navigate to the project directory:

   ```bash
   cd express-crud-app
   ```

3. Install the dependencies:

   ```bash
   npm install
   ```

## Usage

1. Start the server:

   ```bash
   node index.js
   ```

2. The server will be running at:

   ```bash
   http://localhost:3000
   ```

## API Endpoints

- **Create a new item**

  ```bash
  POST /items
  ```

  **Body:**
  ```json
  {
    "name": "Item Name",
    "description": "Item Description"
  }
  ```

- **Get all items**

  ```bash
  GET /items
  ```

- **Get an item by ID**

  ```bash
  GET /items/:id
  ```

  **Params:**
  - `id` - The ID of the item to retrieve.

- **Update an item by ID**

  ```bash
  PUT /items/:id
  ```

  **Params:**
  - `id` - The ID of the item to update.

  **Body:**
  ```json
  {
    "name": "Updated Name",
    "description": "Updated Description"
  }
  ```

- **Delete an item by ID**

  ```bash
  DELETE /items/:id
  ```

  **Params:**
  - `id` - The ID of the item to delete.

## Error Handling

- If a file cannot be read, the server responds with a `404` status and an error message.
- If a file cannot be written to, the server responds with a `200` status and an error message.
- If an item with a specified ID is not found, the server responds with a `404` status and an error message.

