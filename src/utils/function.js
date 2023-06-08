export const checkTags = (tag) => {
  switch (tag) {
    case "HEALTHY FOOD":
      return "green";
    case "FASTFOOD":
      return "orange";
    case "FATTY FOOD":
      return "yellow";
    case "SPICY FOOD":
      return "red";
    case "ALCOHOL":
      return "purple";
    default:
      break;
  }
};
