const normalizeCategory = (category = "") => {
  return category
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/\s+/g, "-")
    .trim();
};

export default normalizeCategory;
