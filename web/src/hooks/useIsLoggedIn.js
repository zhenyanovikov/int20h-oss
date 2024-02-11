import useClientStore from "../store/clientStore";

function useIsLoggedIn() {
  const token = useClientStore((state) => state.token);

  return !!token;
}

export default useIsLoggedIn;
