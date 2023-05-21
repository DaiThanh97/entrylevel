# Technical Test - Readme

## Application default configuration

<hr/>
To make it easier for development process, we still expose these ports on the local machine to send request directly with services or to view actual data in the data stores. 
In production environment, we leverage the infrastructure to make the downstream services become unreachable from the client, we only expose one single point - API Gateway.

| Service | Port (customizable) |
| ------- | ------------------- |
| backend | 4000                |
| react   | 3000                |

## 1. Local Development Guideline

### Prerequisites

- `NodeJS` (v10 or above), `npm` and `yarn`
- Docker (optional)
- Makefile (optional)

### Setup Local Development Environment

1. Clone the project to local machine and go to the folder

```
git clone https://github.com/DaiThanh97/entrylevel-test.git
cd entrylevel-test
```

### `OPTION 1:`

2. Run the back-end in development mode (live-reload support)

```
cd backend
yarn && yarn start:dev
```

3. Run the front-end in development mode (live-reload support)

```
cd frontend
yarn && yarn start
```

### `OPTION 2:`

2. Run `make bootstrap` cli to bootstrap FE along with BE.
3. Run `make cleanup` cli to clean up all.

<br/>

**NOTE**
<br/>
**The app should be accessible at http://localhost:3000**
<br/>
**The api document should be accessible at http://localhost:4000/docs/application. (Swagger UI for Documentation)**

### - Frontend should look like this. `(responsive supported)`

<image src="./imgs/app-1.png" />
<image src="./imgs/app-2.png" />
<p align="center">
<image src="./imgs/app-3.png" />
</p>
<p align="center">
<image src="./imgs/app-4.png" />
</p>

### - Should access to backend through **Swagger** to manually fetch data.

<image src="./imgs/swagger-1.png" />
<image src="./imgs/swagger-2.png" />

<b>Note</b>: If the port is being used, please change it to a different port in `.env` of each `-end` folder.

## 2. Other Notes

### What I have completed

### 1. Functionalities

1. Application supports responsive views using grid systems.
2. Filter sessions by using debounce approach.
3. Scalable backend code using DI pattern with NestJS support.

### 2. Technologies used

1. ReactJS
2. NodeJS (NestJS)

### 3. Issues

1. Currently using external url to fetch data from Backend so it makes our system not reliable in case external url is broken => Need to use our internal database.
2. App side is sorting response data which affect the performance so may cause bad UX => Backend should handle this.

### 4. Others

1. Local Development Setup script (1 line setup with Docker).
2. Document with Swagger - Easier to integrate by FE side.

### What can be improved if have more times

1. More unit tests for `front-end`, `back-end`
2. Write `e2e` tests.
3. Integrate with real world database instead of using external url.
4. Pagination.
5. Filter with multiple values.
6. Implement caching for better query performace for specific cases. `(Redis)`
7. Implement microservices architecture for future scales. `(Redis)`
8. Implement CI/CD for automation deployment using `Github Actions, Jenkins,...`
9. Integrate `Prometheus, Datadog` for monitoring and health checking purpose.
