TODOS FOR THIS WEEK

1. Connect the Backend with the frontend (Login and Signup route)
2. Connect the API Routes to the frontend
3. Launch Version 1 of the application before june 30

ZUstand for the frontend state management

npm run start:dev
To continually watch your application for any changes
nest generate service example : used to generate a service that handles all the business logic in your application

HTTP ---> Controller --> authGuard --> Services ---> Data

nest g resource "filename"
-- Transport Layer
-- Crudendpoint

this will geneare allteh folder structure containing the services, controlle, moules etc for your "Filename" ok

@param

## Module

### Controllers

- are responsible for handling incoming requests and returning responses to the client.
  Controllers should handle HTTP requests and delegate more complex tasks to providers

## providers

- is used for defining and managing various types of components within your application.
- They enable dependency injection, promote modularity, and facilitate testing and maintainability of your codebase.

-is where the main business logic of your application happens
$ nest g service "filename" : Command to create a service file

if you've created a new application with it's module, after connecting the module to the main app module you migh have to restart your application

Access tokens and refresh tokens are commonly used in authentication systems, especially when implementing JSON Web Tokens (JWT) for securing APIs. Here's an overview of each:

Access Token: An access token is a credential used by an application to access protected resources on behalf of a user. It is typically short-lived and grants limited access to specific resources or actions. Access tokens are often included in the HTTP headers of API requests to authenticate the user.

Refresh Token: A refresh token is a long-lived credential used to obtain a new access token after the current access token expires. Unlike access tokens, refresh tokens are not sent with every API request but are instead used to request new access tokens when needed. This helps improve security by reducing the frequency of sending access tokens over the network.

When implementing JWT-based authentication with access and refresh tokens, the general flow typically looks like this:

Authentication: When a user logs in or authenticates for the first time, the server verifies their credentials and generates a JWT access token and a refresh token.

## Access Token Usage: The client includes the access token in the Authorization header of API requests to access protected resources. The server verifies the access token to authenticate the user and authorize access to the requested resource.

## Access Token Expiry: Access tokens have a short expiration time (e.g., minutes). When an access token expires, the client needs to request a new access token using the refresh token.

Refresh Token Usage: The client includes the refresh token in a special endpoint to request a new access token. If the refresh token is valid and has not expired, the server generates a new access token and returns it to the client.

Revocation: Optionally, you may implement mechanisms to revoke refresh tokens if they are compromised or no longer needed. This can include maintaining a blacklist of revoked tokens or implementing token revocation endpoints.
