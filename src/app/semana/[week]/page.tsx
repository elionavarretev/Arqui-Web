import { notFound } from "next/navigation";
import Link from "next/link";
import { week1 } from "@/lib/content/week1";
import WeekPageClient from "./WeekPageClient";

const weekContent: Record<number, typeof week1> = {
  1: week1,
};

export default async function WeekPage({ params }: { params: Promise<{ week: string }> }) {
  const { week } = await params;
  const weekNum = parseInt(week);
  const content = weekContent[weekNum];
  if (!content) notFound();

  return <WeekPageClient content={content} />;
}

export function generateStaticParams() {
  return [{ week: "1" }];
}
