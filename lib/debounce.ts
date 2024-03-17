export default function debounce<T extends (...args: any) => any>(
  func: T,
  delay: number = 100,
) {
  let timer: any;

  return (...args: Parameters<T>): void => {
    clearInterval(timer);
    timer = setTimeout(() => func(...args), delay);
  };
}
