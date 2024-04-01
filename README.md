# Invoice App - Vue

### Overview

The Invoice App is a simple web application built using Vite and Vue.js. It allows users to create, manage, and track invoices efficiently. With a clean and intuitive interface, users can easily input invoice details, edit them, mark them as paid, and delete them as needed.


### Stack, Techs, Features, Tasks

- Vue
- Firebase
- Auth (Email, Google)
- SCSS
- CRUD
- Form
- Store
- Light/Dark Mode


### Demo

You can find a live demo of the Invoice App [here](https://smartreceipts.netlify.app/).

1. Home - List of Invoice Items

   ![vue1](https://github.com/iamalaziz/invoice-app/assets/81867375/17461df8-f3dd-4e9f-b6ad-bfdd7d1a0e95)

3. Toggle Light/Dark Mode

   ![vue2-light](https://github.com/iamalaziz/invoice-app/assets/81867375/c247b2d2-389d-41cf-8fb7-1ec89bae1bfa)

4. Create New Invoice

   ![vue3-new](https://github.com/iamalaziz/invoice-app/assets/81867375/cb95d3a9-cb9e-43b0-8a66-ed8462a711cb)

5. Invoice Details
   
   ![vue4-details](https://github.com/iamalaziz/invoice-app/assets/81867375/7d0f1f1c-938f-49c2-9ec5-b5bd308c2c46)

6. Filter <br />

   ![vue5-filter](https://github.com/iamalaziz/invoice-app/assets/81867375/658118b1-0771-4757-b62f-5d329526b673)


### How To Run

```bash
git clone https://github.com/iamalaziz/invoice-app.git
cd invoice-app
npm install
```

*Set Up Firebase*

- Create a .env file in the project root.
- Add your Firebase configuration details to the .env file:

```bash
VITE_FIREBASE_API_KEY=your-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-auth-domain
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-storage-bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
VITE_FIREBASE_APP_ID=your-app-id
```

- Run the project:

```bash
npm run dev
```
