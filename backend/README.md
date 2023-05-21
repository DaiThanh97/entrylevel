# Technical Test - Readme

## 1. Local Development Guideline

### Prerequisites

- `Docker` & `Docker Compose`
- NodeJS (v10 or above), `npm` and `yarn`

### Setup Local Development Environment

1. Clone the project to local machine and go to the folder

```
git clone https://github.com/DaiThanh97/application-ao.git
cd application-ao
```

### `OPTION 1:`

2. Run docker compose cli to setup the local DB - Currently using MySQL

```
docker-compose up -d
```

3. Run the back-end in development mode (live-reload support)

```
yarn && yarn start:dev
```

### `OPTION 2:`
2. Run `make bootstrap` cli to bootstrap database along with BE.
3. Run `make cleanup` cli to clean up all.

<br/>

**The app should be accessible at http://localhost:4000/docs/application. (Swagger UI for Documentation)**

<image src="./imgs/swagger-img.png" />

<b>Note</b>: The local DB will use port `3306`. If the port is being used, please change it to a different port in `docker-compose.yaml` and `.env`

## 2. Other Notes

### What I have completed

### 1. Functionalities

<p align="center">
  <image src="./imgs/dbdesign.png"/>
</p>

1. User's Sign In: Feature to log user in when account is existed.
2. User's Sign Up: Register user into the system, using JWT for authentication.
3. CRU Job: Create/Read/Update a job (Only allow logged in user with <b>MERCHANT</b> role)
4. List users applied jobs: List out users who applied for merchant's jobs.
5. User can apply for a specific job created by merchants.
6. List jobs by a specific merchant.

### 2. Others

1. Local Development Setup script (1 line setup with Docker).
2. Document with Swagger - Easier to integrate by FE side.

### What can be improved if have more times

1. More unit tests for `back-end`
2. Write `e2e` tests.
3. Implement CRUD for `conditions`.
4. Integrate with `conditions` along with logic in create job.
5. Implement caching for better query performace. `(Redis)`
6. Implement CI/CD for automation deployment using `Github Actions, Jenkins,...`
7. Integrate `Prometheus, Datadog` for monitoring and health checking purpose.
8. Real-time sync for Job modification using `websocket`.
