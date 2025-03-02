
export const getToken = () => {
    return localStorage.getItem("token");
  };

  export const clearToken = () => {
    return localStorage.removeItem("token");
  };


  export function getStatus(num) {
    switch (num) {
      case 0:
        return { color: "#fd7e14", text: "Accepted" }
      case 100:
        return { color: 'green', text: "Completed" }
      case -1:
        return { color: "red", text: "Not Accepted" }
      default:
        return { color: "blue", text: `Partial Complete (${25}%)` }
    }
  }