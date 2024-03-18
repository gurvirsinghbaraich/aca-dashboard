export const capitalize = function (string: string) {
  let modified = "";
  let blocks = string.toLowerCase().split(" ");

  blocks.forEach((block) => {
    modified += block.charAt(0).toUpperCase() + block.slice(1) + " ";
  });

  return modified.trim();
};
