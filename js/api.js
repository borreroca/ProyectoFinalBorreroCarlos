
export const getData = async () => {
      const response = await fetch('../productos.json');
      const data = await response.json();
      return data;
}

