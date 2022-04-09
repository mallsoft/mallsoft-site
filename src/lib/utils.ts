export function getAbsoluteRect(element) {
  const rect = element.getBoundingClientRect();
  return {
    left: rect.left + window.scrollX,
    top: rect.top + window.scrollY,
    right: rect.right + window.scrollX,
    bottom: rect.bottom + window.scrollY,
    cx: rect.left + window.scrollX + rect.width / 2,
    cy: rect.top + window.scrollY + rect.height / 2,
    width: rect.width,
    height: rect.height,
    radius: (rect.width + rect.height) / 4
  };
}
