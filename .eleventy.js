module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("src/assets");

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
