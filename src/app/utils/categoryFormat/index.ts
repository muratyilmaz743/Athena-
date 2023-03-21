export const categoryFormat = (path: string): string => {
              const index = path.indexOf("/");
              return index !== -1 ? path.slice(0, index) : path;
}