# firat_kocoglu_uav_rental

## This project is built by Fırat Koçoğlu as requested by Baykar Technologies as a part of technical evaluation process of Back End Developer Position.

## Django and Django Rest Framework are used for back-end and React is used for front-end in this project.

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
