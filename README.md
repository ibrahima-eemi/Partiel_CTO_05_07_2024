# Sport Association Project

## Description
This project is a web application for managing members of a sport association. It includes both a backend API built with FastAPI and a frontend application built with React. The application allows users to add, view, and manage members, as well as handle payment integration with PayPal.

## Table of Contents
- [Features](#features)
- [Setup Instructions](#setup-instructions)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
  - [Database Initialization](#database-initialization)
- [PayPal Integration](#paypal-integration)
  - [How to Create a PayPal Account and Set Up API Credentials](#how-to-create-a-paypal-account-and-set-up-api-credentials)
- [Security Measures](#security-measures)
- [Payment Workflow](#payment-workflow)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)
- [Continuous Integration (CI)](#continuous-integration-ci)
  - [CI Pipeline Steps](#ci-pipeline-steps)
  - [GitHub Actions](#github-actions)
  - [Setting Up CI/CD](#setting-up-cicd)
- [Project Structure](#project-structure)
- [Audit des Besoins Techniques](#audit-des-besoins-techniques)
  - [Identification des Contraintes Techniques et des Exigences Spécifiques](#identification-des-contraintes-techniques-et-des-exigences-spécifiques)
  - [Évaluation des Risques](#évaluation-des-risques)
  - [Solutions Existantes et Critères](#solutions-existantes-et-critères)
- [Analyse et Recommandations](#analyse-et-recommandations)
  - [Analyse Data et Fonctionnelle](#analyse-data-et-fonctionnelle)
  - [Analyse Système et Infrastructure](#analyse-système-et-infrastructure)
  - [Analyse Sécurité](#analyse-sécurité)
- [Documentation du Processus de Développement](#documentation-du-processus-de-développement)
  - [Suivi du Projet et des Versions](#suivi-du-projet-et-des-versions)
  - [Documentation du Code](#documentation-du-code)
  - [Gestion des Dépendances](#gestion-des-dépendances)
  - [Sécurité et Gestion des Secrets](#sécurité-et-gestion-des-secrets)

## Features
### Backend
- **FastAPI** for building RESTful APIs.
- **SQLAlchemy** for database ORM.
- **SQLite** as the database.
- **PayPal SDK** for payment integration.

### Frontend
- **React** for building the user interface.
- **Axios** for making HTTP requests.
- **React Bootstrap** for styling.

## Setup Instructions

### Backend Setup
1. Clone the repository:
    ```bash
    git clone https://github.com/ibrahima-eemi/Partiel_CTO_05_07_2024.git
    cd Partiel_CTO_05_07_2024
    ```

2. Create a virtual environment:
    ```bash
    python3 -m venv venv
    source venv/bin/activate
    ```

3. Install the dependencies:
    ```bash
    pip install -r requirements.txt
    ```

4. Set up environment variables:
    Create a `.env` file in the root directory with the following content:
    ```env
    PAYPAL_MODE=sandbox
    PAYPAL_CLIENT_ID=your_paypal_client_id
    PAYPAL_CLIENT_SECRET=your_paypal_client_secret
    ```

5. Run the backend server:
    ```bash
    uvicorn backend.main:app --reload
    ```

### Frontend Setup
1. Navigate to the frontend directory:
    ```bash
    cd frontend
    ```

2. Install the dependencies:
    ```bash
    npm install
    ```

3. Start the frontend development server:
    ```bash
    npm start
    ```

### Database Initialization
The database schema is automatically created by SQLAlchemy when the backend server starts. Ensure that the database file (`test.db`) is located in the root directory of the project.

## PayPal Integration

### How to Create a PayPal Account and Set Up API Credentials
1. **Create a PayPal Account**:
   - Go to the [PayPal Developer site](https://developer.paypal.com/).
   - Sign up for a PayPal account if you don't have one already.

2. **Create a Sandbox Account**:
   - After logging in, go to the Dashboard and click on Sandbox > Accounts.
   - Click Create Account to create a new sandbox account.

3. **Create API Credentials**:
   - In the PayPal Developer Dashboard, go to My Apps & Credentials.
   - Under the REST API apps section, click Create App.
   - Fill in the details and create the app. This will generate a Client ID and Client Secret.

4. **Configure API Credentials in the Project**:
   - Copy the Client ID and Client Secret.
   - Add these credentials to your `.env` file in the backend directory:
     ```env
     PAYPAL_MODE=sandbox
     PAYPAL_CLIENT_ID=your_paypal_client_id
     PAYPAL_CLIENT_SECRET=your_paypal_client_secret
     ```

## Security Measures
- **Environment Variables**: Store sensitive information like API keys in environment variables.
- **HTTPS**: Use HTTPS to encrypt data in transit.
- **Data Validation**: Validate all user inputs to prevent injection attacks.
- **Logging**: Log all payment transactions securely for auditing purposes.

## Payment Workflow
1. **Create Payment**:
   - When a user initiates a payment, the backend creates a payment object using the PayPal SDK and returns the approval URL.

2. **Approve Payment**:
   - The user is redirected to PayPal to approve the payment.

3. **Execute Payment**:
   - Once approved, the user is redirected back to your site where the payment is executed and confirmed.

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
This project is licensed under the MIT License - see the LICENSE file for details.

## Continuous Integration (CI)

### CI Pipeline Steps
1. **Install Dependencies**:
   - Install all required dependencies for both the backend and frontend.

2. **Run Tests**:
   - Execute unit tests to verify that the code changes do not introduce any regressions.

3. **Build Application**:
   - Build the frontend and backend applications.

4. **Deploy**:
   - Automatically deploy the application to a staging environment for further testing.

### GitHub Actions
GitHub Actions is used for the CI/CD pipeline. The configuration files are located in the `.github/workflows` directory.

#### Example Workflow File (ci.yml)
```yaml
name: CI Pipeline

on:
  push:
    branches:
      - main
  pull_request:
    branches:
      - main

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout code
        uses: actions/checkout@v2

      - name: Set up Python
        uses: actions/setup-python@v2
        with:
          python-version: 3.9

      - name: Install backend dependencies
        run: |
          python -m venv venv
          source venv/bin/activate
          pip install -r requirements.txt

      - name: Run backend tests
        run: |
          source venv/bin/activate
          pytest

      - name: Set up Node.js
        uses: actions/setup-node@v2
        with:
          node-version: 14

      - name: Install frontend dependencies
        run: |
          cd frontend
          npm install

      - name: Run frontend tests
        run: |
          cd frontend
          npm test

      - name: Build frontend
        run: |
          cd frontend
          npm run build

      - name: Deploy to staging
        run: |
          # Add deployment commands here
```

### Setting Up CI/CD
1. **Create a GitHub Repository**:
   - Create a repository on GitHub and push your project code.

2. **Add GitHub Actions Configuration**:
   - Add the `.github/workflows/ci.yml` file to your repository with the CI pipeline configuration.

3. **Commit and Push**:
   - Commit and push your changes to trigger the CI pipeline.

## Project Structure
```
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
├── .github
│   └── workflows
│       └── ci.yml
├── .gitignore
├── .env
├── pyproject.toml
├── poetry.lock
├── requirements.txt
├── test.db
└── README.md
```