const places = require("./places.json");
const cityAreas = require("./cityAreas.json");

function toTitleCaseFromSlug(slug) {
  return slug
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

const areaToCity = new Map();
const allSlugs = new Set(places);

for (const group of cityAreas) {
  allSlugs.add(group.citySlug);
  areaToCity.set(group.citySlug, {
    citySlug: group.citySlug,
    cityName: group.cityName,
  });
  for (const area of group.areas) {
    allSlugs.add(area);
    areaToCity.set(area, {
      citySlug: group.citySlug,
      cityName: group.cityName,
    });
  }
}

module.exports = Array.from(allSlugs).map((slug) => {
  const mapped = areaToCity.get(slug);
  return {
    slug,
    name: toTitleCaseFromSlug(slug),
    citySlug: mapped ? mapped.citySlug : null,
    cityName: mapped ? mapped.cityName : null,
    heroText: `Complete your registered rent agreement process in ${toTitleCaseFromSlug(slug)} through an IGR-aligned workflow with doorstep biometric support, fast legal documentation, and guided assistance.`,
  };
});
