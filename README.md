# GoTo Team Test Project: Frontend Repository

## Description
This repository houses the frontend component of our project. It provides a seamless user experience with features including login, registration, logout, and session refreshing via refresh token. Once authenticated, users gain access to a variety of functionalities:

- **User Management:** View user lists and their associated details, including favorites, likes, and disliked pokemons.
- **Pokemon Exploration:** Browse a paginated list of pokemons, facilitating easy navigation and exploration.
- **Interactions:** Users can express preferences by liking and disliking up to three pokemons, as well as favoriting an unlimited number of pokemons.

This frontend interface aims to offer a comprehensive and intuitive experience for our users.

## Prerequisites
- Backend repository setup is required. Please refer to [this link](https://github.com/ramonthegreat/laravel-samples/tree/goto-project) for detailed instructions.

## Frontend Technical Specifications
- Vue (v3.2.13)
- Vue Router for seamless page navigation
- Vuelidate to ensure robust form validation
- Pina with persistedstate plugin for efficient state management
- Axios for streamlined XMLHttp requests

## Installation Requirements
Ensure you have the following installed:
1. Docker
2. Git

## Installation Steps
1. Clone this frontend repository.
2. Execute `docker-compose up -d` to launch the project.
