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

    // Get text first, regardless of ok status, to avoid premature .json() errors
    const externalApiTextResponse = await externalApiResponse.text();

    if (!externalApiResponse.ok) {
      let errorPayload = {
        error: `Error fetching data from the external API (status: ${externalApiResponse.status})`,
      };
      try {
        // Try to parse the text response as JSON, it might be an error object from TheCatAPI
        const externalErrorData = JSON.parse(externalApiTextResponse);
        errorPayload.details = externalErrorData;
      } catch (e) {
        // External API error response might not be JSON, send a snippet of the text
        errorPayload.details =
          externalApiTextResponse.substring(0, 200) +
          (externalApiTextResponse.length > 200 ? "..." : "");
      }
      // It's important that our backend sends a JSON response to our frontend
      return res
        .status(
          externalApiResponse.status < 500 ? externalApiResponse.status : 502
        )
        .json(errorPayload);
    }

    // If externalApiResponse.ok, try to parse the text response as data
    try {
      const data = JSON.parse(externalApiTextResponse);
      if (data && data.length >= 0) {
        // Allow empty array for successful no-results
        res.status(200).json(data);
      } else {
        // This case should ideally not be hit if TheCatAPI sends valid empty arrays
        console.warn(
          "Received unexpected data structure from TheCatAPI (expected array):",
          data
        );
        res.status(200).json([]);
      }
    } catch (parseError) {
      // This happens if TheCatAPI said OK but sent non-JSON
      console.error(
        "Failed to parse successful response from TheCatAPI:",
        parseError
      );
      console.error(
        "TheCatAPI response text (first 500 chars):",
        externalApiTextResponse.substring(0, 500)
      );
      res
        .status(502)
        .json({
          error: "Bad Gateway: Invalid JSON response from external cat API.",
        });
    }
  } catch (error) {
    // This catches other errors, like network issues calling TheCatAPI or unexpected internal errors
    console.error("Server Error in searchByBreed:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
