"use client";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { trpc } from "@/trpc/client";
import { LandingLayout } from "@/modules/landingPage/layout/layout";
export default function Home() {
  const hello = trpc.hello.useQuery({ name: "ayan shaikh" });
  const orderPizza = trpc.orderPizza.useMutation();
  if (!hello.data) return <p>Loading.....</p>;
  return (
    <>
      <LandingLayout/>
    </>
      
  );
}
