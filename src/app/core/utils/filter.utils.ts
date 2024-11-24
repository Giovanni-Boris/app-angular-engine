export function filterData<T extends object>(data: T[], searchTerm: string): T[] | null {
  const lowerCaseSearchTerm = searchTerm.toLowerCase();
  const filtered = data.filter(item =>
    Object.values(item).some(value =>
      value?.toString().toLowerCase().includes(lowerCaseSearchTerm)
    )
  );
  return filtered.length > 0 ? filtered : null;
}
