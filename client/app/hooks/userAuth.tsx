import { useSelector } from "react-redux";

export default function useUserAuth() {
  const { user } = useSelector((state: any) => state.auth);

  return Boolean(user);
}
