module.exports = function (eleventyConfig) {
  // Static assets copied as-is into the build output.
  eleventyConfig.addPassthroughCopy({ "src/assets": "assets" });
  eleventyConfig.addPassthroughCopy({ "src/robots.txt": "robots.txt" });

  // Watch CSS/JS for local dev live-reload.
  eleventyConfig.addWatchTarget("src/assets/css/");
  eleventyConfig.addWatchTarget("src/assets/js/");

  eleventyConfig.addFilter("year", () => new Date().getFullYear());

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      data: "_data",
    },
    // Keep restored legacy URLs exact: no forced .html rewriting, no extra dot-notation.
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
  };
};
