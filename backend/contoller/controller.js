export const getTitle  = (req, res) => {
    res.status(200).json("get the cat you want");
  };
  export const searchByBreed = async (req, res) => {
try {
    const { imput } = req.params;
    const response = await fetch(
      `https://api.thecatapi.com/v1/images/search?limit=10&breed_ids=${imput}&api_key=${process.env.KEY}`
    );

    if (!response.ok) {
      return res
        .status(response.status)
        .json({ error: "Error fetching data from the API" });
    }

    const data = await response.json();
    
if (!result.length) {
      return res
        .status(response.status)
        .json({ error: "No cats found" });
    }


  } catch (error) {
    console.error("Server Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }

  };