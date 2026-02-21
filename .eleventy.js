module.exports = function (eleventyConfig) {
  // Static assets
  eleventyConfig.addPassthroughCopy("src/assets");

  // ✅ Google Search Console verification file
  eleventyConfig.addPassthroughCopy("src/google9252a0e98bc92e42.html");

  // Shortcodes
  eleventyConfig.addShortcode("year", () => {
    return `${new Date().getFullYear()}`;
  });

  eleventyConfig.addFilter("year", () => {
    return new Date().getFullYear();
  });

  return {
    dir: {
      input: "src",
      output: "dist",
      includes: "_includes",
      layouts: "_layouts"
    },
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk"
  };
};