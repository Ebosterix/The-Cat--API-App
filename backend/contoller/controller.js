export const getTitle = (req, res) => {
  res.status(200).json({ message: "get the cat you want" });
};
export const searchByBreed = async (req, res) => {
  try {
    const { imput } = req.params;
    const apiKey = process.env.KEY;

    if (!apiKey) {
      console.error("API Key (KEY) is not set in environment variables.");
      return res
        .status(500)
        .json({ error: "Server configuration error: API key missing." });
    }

    const externalApiResponse = await fetch(
      `https://api.thecatapi.com/v1/images/search?limit=10&breed_ids=${imput}&api_key=${apiKey}`
    );

    if (!externalApiResponse.ok) {
      let errorPayload = { error: "Error fetching data from the external API" };
      try {
        // Try to include details from the external API's error response
        const externalErrorData = await externalApiResponse.json();
        errorPayload.details = externalErrorData;
      } catch (e) {
        // External API error response might not be JSON, or no body
        errorPayload.details = await externalApiResponse.text();
      }
      return res.status(externalApiResponse.status).json(errorPayload);
    }

    const data = await externalApiResponse.json();

    if (data && data.length > 0) {
      res.status(200).json(data); // Send the fetched cat data
    } else {
      // No cats found for this breed, but the API call itself was successful
      res.status(200).json([]); // Send an empty array as per frontend expectation
    }
  } catch (error) {
    console.error("Server Error:", error);
    // Check if the error is due to parsing non-JSON from external API
    if (
      error instanceof SyntaxError &&
      error.message.includes("Unexpected token")
    ) {
      res
        .status(502)
        .json({
          error: "Bad Gateway: Invalid response from external cat API.",
        });
    } else {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
};
