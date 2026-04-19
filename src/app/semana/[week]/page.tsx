import { notFound } from "next/navigation";
import { week1 } from "@/lib/content/week1";
import { week2 } from "@/lib/content/week2";
import { week3 } from "@/lib/content/week3";
import { week4 } from "@/lib/content/week4";
import WeekPageClient from "./WeekPageClient";
import type { WeekContent } from "@/lib/content/week1";

const weekContent: Record<number, WeekContent> = {
  1: week1,
  2: week2,
  3: week3,
  4: week4,
};

export default async function WeekPage({ params }: { params: Promise<{ week: string }> }) {
  const { week } = await params;
  const weekNum = parseInt(week);
  const content = weekContent[weekNum];
  if (!content) notFound();

  return <WeekPageClient content={content} />;
}

export function generateStaticParams() {
  return [{ week: "1" }, { week: "2" }, { week: "3" }, { week: "4" }];
}
