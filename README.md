# Simple-hr
Simple HR dashboard

## Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/yourusername/your-repo-name.git
    cd your-repo-name
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

## Configuration

1. Edit app/config/db.config.js with correct DB credentials.
    ```env
      HOST: "localhost",
      USER: "postgres",
      PASSWORD: "111111",
      DB: "postgres",
    ```

## Database Setup

1. Start the server:
    ```bash
    npm run dev
    ```

2. Open your browser or a tool like Postman, and make a GET request to:
    ```
    http://localhost:3030/
    ```
   This endpoint will create all necessary tables in your PostgreSQL database.

## Running the Application

1. Start the server:
    ```bash
    npm run dev
    ```

2. The API will be accessible at `http://localhost:3030`.

## API Endpoints

### Users

- **GET /api/v1/profile/:userId**: Get user by userId
    - Response: 200 OK, 404 Not Found

- **POST /api/v1/register**: Create a new user
    - Request body:
   ```json
     {
        "full_name": "Test",
        "email": "test@gmail.com",
        "password": "123456",
        "phone": "090999999",
        "address_line_1": "123 CH, TB ",
        "address_line_2": "456 CH, TB",
        "city": "HCM",
        "state": "TB",
        "country": "VN",
        "nok_name": "Q",
        "nok_phone_number": "090999990"
      }
    ```
    - Response: 201 Created, 400 Bad Request
    
  - **PUT /api/v1/profile/:userId**: Update a user data
   - Request body:
     ```json
     {
        "full_name": "Test",
        "email": "test@gmail.com",
        "password": "123456",
        "phone": "090999999",
        "address_line_1": "123 CH, TB ",
        "address_line_2": "456 CH, TB",
        "city": "HCM",
        "state": "TB",
        "country": "VN",
        "nok_name": "Q",
        "nok_phone_number": "090999990"
    }
      ```
    - Response: 201 Created, 400 Bad Request

### Authentication

- **POST /api/v1/login**: Authenticate user and get a token
    - Request body:
      ```json
      {
          "email": "test@gmail.com",
          "password": "123456"
      }
      ```
    - Response: 200 OK, 401 Unauthorized

## Testing

1. To run tests:
    ```bash
    npm run test
    ```

2. Tests are written using Jest and Supertest. They are located in the `tests` directory.

## License

This project is licensed under the MIT License.