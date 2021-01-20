const config = {
  apiUrl:
    process.env.NODE_ENV === "production"
      ? "https://shopify-image-repo-api.herokuapp.com/api"
      : "http://localhost:8080/api",
};

export default config;
