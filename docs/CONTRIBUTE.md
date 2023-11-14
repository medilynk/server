# Contribute to MediLynk

#### API Docs are [here](https://documenter.getpostman.com/view/24270306/2s9YXmZ1TJ)
## Steps
+ Fork the repo
+ Clone the forked repo
+ Get inside the root directory of repo
+ Create a `.env` file, refer to [this](../.env.example) for creating `.env` file
+ Install dependencies
  ```
  npm install
  ```
+ Migrate the database
  ```
  npx prisma migrate dev
  ```
+ Run the server
  ```
  npm test
  ```
