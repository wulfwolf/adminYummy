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
export const renderItem = (preparation) => {
  const tmp = [];
  tmp.push(
    preparation?.preparations.map((prepration) => ({
      _id: prepration?.ingredient?._id,
      quantity: prepration?.quantity,
      ingredient: prepration?.ingredient?._id,
    }))
  );
  return tmp[0];
};
