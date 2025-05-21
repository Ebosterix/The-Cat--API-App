 # Fullstack Deployment Cat API
 - Using environment variables securely
 - Deploy backend
 - Deploy frontend

API we use: https://thecatapi.com/
[Official Docs](https://developers.thecatapi.com/view-account/ylX4blBYT9FaoVd6OhvR?report=bOoHBz-8t)
- Sign up & create an API key
- Fetch 10 cats by breed_id at a time `https://api.thecatapi.com/v1/images/search?limit=10&breed_ids=beng&api_key=YOUR-API-KEY`

----------------------------------

## What are environment variables? 

Environment variables are key-value pairs used to store sensitive or configuration data outside of your source code. This allows you to:

	•	Keep secrets like API keys out of your codebase
	•	Configure different environments (development vs. production)
	•	Easily manage different settings per environment

Examples:

	•	API keys
	•	Database URLs
	•	Secret tokens
	•	App port (e.g., PORT=3000)
	•	Node environment (e.g., NODE_ENV=production)

### How to use environment variables

[Backend]--------------------

- [option 1] Create  `.env` file in the root directory and create a variable

```env
KEY=12345
```
- By using `dotenv`, we can access the environment variables from `process.env` object

```js
import dotenv from "dotenv";
dotenv.config();

console.log(process.env.KEY); // Access your API key
```

- Alternatively, manually add in the terminal
`KEY=12345 node server.js`


[Frontend]-------------------

- Create  `.env` file in the root directory, create a variable starting with VITE_

```env
VITE_API_KEY=12345 
```

- Access the environment variables from `import.meta.env` object

We can access 

## Let's mare sure...
	• Never commit .env files – always add .env to .gitignore.
	• Do not expose secrets in frontend – keep sensitive values like API keys, tokens, or DB credentials in the backend.
	• Deploy environments separately – set environment variables directly in the deployment platform (e.g., Render).
	• Never hardcode secret values in your codebase.



