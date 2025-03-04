export const getToken = () => {
  return localStorage.getItem("token");
};

export const getUserName = () => {
  return localStorage.getItem("userName");
};

export const getUserEmail = () => {
  return localStorage.getItem("userEmail");
};

export const getUserImage = () => {
  return localStorage.getItem("userImage");
};


export const clearToken = () => {
  return localStorage.removeItem("token");
};

export function getStatus(num) {
  switch (num) {
    case 0:
      return { color: "#fd7e14", text: "Accepted" };
    case 100:
      return { color: "green", text: "Completed" };
    case -1:
      return { color: "red", text: "Not Accepted" };
    default:
      return { color: "blue", text: `Partial Complete (${num}%)` };
  }
}

export const priorityOptions = [
  { label: "Low", value: "Low" },
  { label: "Medium", value: "Medium" },
  { label: "High", value: "High" },
];

export const statusOptions = [
  { label: "All", value: "" },
  { label: "Not Accepted", value: "Not Accepted" },
  { label: "Partial Complete", value: "Partial Complete" },
  { label: "Accepted", value: "Accepted" },
  { label: "Completed", value: "Completed" },
];
