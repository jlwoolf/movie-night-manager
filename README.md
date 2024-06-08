# Movie Night Manager

Simple site to allow for managing friend movie nights! Create movie suggestions and vote on them!

## Security
This project is not "safe" from common online vulnerabilities. The password check is plain text comparison, the api does not validate if a request is coming from an admin session, a client can just clear cookies to vote repeatably, etc. For what it's use case is, it's not meant to be safe. It's a site to make suggesting and picking a movie between a small community of friends and family easier. If you want to use this at a larger scale, feel free to modify it.

## Environment variables
- `OMDB_API_KEY`: Your key for the OMDB API. Can be gotten here: https://www.omdbapi.com/
- `ADMIN_PASSWORD`: The admin password for the admin page. Leaving this as blank will disable the admin page.
- `BASE_URL` **(optional)**: The base url of the site. Set this if you will be hosting this site behind a reverse proxy that has a path.
  
  e.g If your site looks like `https://example.com/movies`, then set `BASE_URL=/movies`. The current traefik configuration in `docker-compose.yml` would require this value to be set to `/movies`

## Building
Run `docker compose build` to build the site and `docker compose up` to launch it