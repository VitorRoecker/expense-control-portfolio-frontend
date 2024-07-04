import { useSession } from "next-auth/react";
import { Layout } from "antd";
import { useEffect } from "react";
import { useRouter } from "next/router";
import AuthPage from "./auth";

const { Footer } = Layout;

export default function Home() {
  const session = useSession();
  const router = useRouter();

  useEffect(() => {}, []);

  return (
    <>
      <AuthPage></AuthPage>
    </>
  );
}
