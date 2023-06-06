import Cookies from "js-cookie";

const userLogOut = (): void => {
  sessionStorage.removeItem("_cttkn");
  sessionStorage.removeItem("_#@ena");
  Cookies.remove("__cretorty");
  Cookies.remove("__cretorly");

  window.location.href = "/login";
};

export default userLogOut;
