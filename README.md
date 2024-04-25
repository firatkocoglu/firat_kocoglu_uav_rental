# firat_kocoglu_uav_rental

## This project is built by Fırat Koçoğlu as requested by Baykar Technologies as a part of technical evaluation process of Back End Developer Position.

## Django and Django Rest Framework are used for back-end and React is used for front-end in this project.

## PostgreSQL is used in database layer.

### Authentication

Djoser is used to implement authentication operations. Session Based Authentication provided by Django is the default authentication method in this project. Authentication endpoints are listed below:

Register

```
http://127.0.0.1:8000/auth/users/
```

Login

```
http://127.0.0.1:8000/api/login/
```

Logout

```
http://127.0.0.1:8000/api/logout/
```

### UAV Operations

Users can list, update and delete existing UAV's and create new UAV's.

To list and create UAV's relevant requests should be sent to the endpoint below:

```
http://127.0.0.1:8000/api/uav/
```

To update and delete existing UAV's users should send requests to the endpoint below:

```
http://127.0.0.1:8000/api/uav/uav_id/
```

All the CRUD operations for UAV endpoints requires authentication.

### Rentals Operations

Users can list, update and delete existing rentals and create new rentals as well.

To list and create rentals relevant requests should be sent to the endpoint below:

```
http://127.0.0.1:8000/api/rentals/
```

To update and delete existing rentals users should send requests to the endpoint below:

```
http://127.0.0.1:8000/api/rentals/rental_id/
```

All the CRUD operations for rental endpoints requires authentication.

### Filter and search

UAV listings can be filtered by category, brand and model of UAV's.

Rental listings can be filtered by UAV model and member username.

Users can filter all the listings with sending request to server as follows:

```
http://127.0.0.1:8000/api/rentals/?uav__model=${uavModelFilter}&user__username=${userFilter}
```

or

```
http://127.0.0.1:8000/api/uav/?category__id=${categoryFilter}&brand=${brandFilter}&model=${modelFilter}
```

Users also can search both listings as follows:

```
http://127.0.0.1:8000/api/rentals/?search=${searchQuery}
```

```
http://127.0.0.1:8000/api/uav/?search=${searchQuery}
```

## React Front-End

The client application is built with React. To create a consistent style, all the components are created with React Bootstrap 5 Components. React Router is used to navigate between components. The client application build is served by Django. Axios is used to send request from client application to Django server. Datatables are created to list UAV and rental data provided by Django server.
