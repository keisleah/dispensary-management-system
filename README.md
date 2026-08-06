# Student Dispensary Management System

## Tech stack

- **Backend:** Django, Graphene-Django (GraphQL API), JWT authentication, SQLite
- **Frontend:** React (Vite), TypeScript, Apollo Client, Tailwind CSS, shadcn/ui, Zustand .
## Project structure

```
dispensary-management-system/
├── dispensary-backend/    # Django backend application
└── dispensary-frontend/   # React frontend application
```

## Prerequisites

Before starting, make sure you have installed:

- Python 3.12 or newer
- Node.js 18 or newer (includes npm)

## Running the backend

Open a terminal and navigate to the backend folder:

```bash
cd dispensary-backend
```

**1. Delete the old virtual environment.

```bash
rm -rf venv
```

**2. Create a virtual environment**

```bash
python3 -m venv venv
```

**3. Activate the virtual environment**

On macOS/Linux:
```bash
source venv/bin/activate
```

On Windows:
```bash
venv\Scripts\activate
```

Your terminal prompt should now show `(venv)` at the start of the line.

**4. Install the required Python packages**

```bash
pip install -r requirements.txt
```

**5. Set up environment variables**

```bash
cp .env.example .env
```

**6. Run the backend server**

```bash
python manage.py runserver
```

The backend is now running at `http://127.0.0.1:8000/`. You can browse the GraphQL API directly at `http://127.0.0.1:8000/graphql/`.

Keep this terminal open and running while using the app.

## Running the frontend

Open a **second, separate terminal** (leave the backend running in the first one).

**1. Navigate to the frontend folder**

```bash
cd dispensary-frontend
```

**2. Install the required packages**

```bash
npm install
```

**3. Run the frontend development server**

```bash
npm run dev
```

The app will now be running at `http://localhost:5173`. Open this address in your browser to use the application.

## Using the app

- Go to `http://localhost:5173/register` to create a new student account.
- To log in as **admin** and manage students, symptoms, and inventory, go to `http://localhost:5173/login` and sign in with:
  - **Email:** keis@gmail.com
  - **Password:** keis@123
- Signing in with a **student** account takes you to the student dashboard, where you can set up your profile, report symptoms, and view your visit history.
- Signing in with the **admin** account takes you to the admin panel, where you can view students, attend to reported symptoms, and manage medicine inventory.
