# Partiel_CTO_05_07_2024
# Sport Association Project

## Description
This project is a web application for managing members of a sport association. It includes both a backend API built with FastAPI and a frontend application built with React. The application allows users to add, view, and manage members, as well as handle payment integration with PayPal.

## Features
- **Backend**: 
  - FastAPI for building RESTful APIs.
  - SQLAlchemy for database ORM.
  - SQLite as the database.
  - PayPal SDK for payment integration.

- **Frontend**: 
  - React for building the user interface.
  - Axios for making HTTP requests.
  - React Bootstrap for styling.
  
## Setup Instructions

### Backend Setup
1. **Clone the repository:**
    ```bash
    git clone https://github.com/ibrahima-eemi/Partiel_CTO_05_07_2024.git
    cd Partiel_CTO_05_07_2024
    ```

2. **Create a virtual environment:**
    ```bash
    python3 -m venv venv
    source venv/bin/activate
    ```

3. **Install the dependencies:**
    ```bash
    pip install -r requirements.txt
    ```

4. **Set up environment variables:**
    Create a `.env` file in the root directory with the following content:
    ```env
    PAYPAL_MODE=sandbox
    PAYPAL_CLIENT_ID=your_paypal_client_id
    PAYPAL_CLIENT_SECRET=your_paypal_client_secret
    ```

5. **Run the backend server:**
    ```bash
    uvicorn backend.main:app --reload
    ```

### Frontend Setup
1. **Navigate to the frontend directory:**
    ```bash
    cd frontend
    ```

2. **Install the dependencies:**
    ```bash
    npm install
    ```

3. **Start the frontend development server:**
    ```bash
    npm start
    ```

### Database Initialization
1. The database schema is automatically created by SQLAlchemy when the backend server starts. Ensure that the database file (`test.db`) is located in the root directory of the project.

## Usage
- Access the frontend application at `http://localhost:3000`.
- The backend API is available at `http://127.0.0.1:8000`.

## Contributing
1. Fork the repository.
2. Create your feature branch: `git checkout -b feature/YourFeature`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature/YourFeature`
5. Open a pull request.

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.


## Project Structure
```plaintext
.
├── backend
│   ├── __init__.py
│   ├── main.py
│   ├── models.py
│   ├── schemas.py
│   ├── crud.py
│   ├── database.py
│   └── paypal.py
├── frontend
│   ├── public
│   ├── src
│   ├── .gitignore
│   ├── package.json
│   └── README.md
├── .gitignore
├── .env
├── pyproject.toml
├── poetry.lock
├── requirements.txt
├── test.db
└── README.md

