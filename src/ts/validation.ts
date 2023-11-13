export const validateTitle = (title: string, maxLength: number) => {
  if (title.length === 0) {
    return "Title is required.";
  }
  if (title.length > maxLength) {
    return `Title cannot exceed ${maxLength} characters.`;
  }
  return "";
};

export const validateContent = (content: string) => {
  return content.length === 0 ? "Content is required." : "";
};
