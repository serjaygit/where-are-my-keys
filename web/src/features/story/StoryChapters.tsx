"use client";

import { CHAPTERS_DATA } from "@/config/chapters.data";
import Image from "next/image";
import { motion } from "motion/react";

export default function StoryChapters() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 18 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut" as const,
      },
    },
  };
  return (
    <motion.section
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      aria-label="The three acts"
      className="mx-auto max-w-6xl space-y-12 sm:space-y-16 lg:space-y-18"
    >
      {CHAPTERS_DATA.map((chapter, index) => (
        <motion.article
          variants={itemVariants}
          key={chapter.title}
          className={`grid items-start gap-5 sm:gap-8 md:grid-cols-2 md:gap-12 ${
            chapter.imageSide === "right"
              ? "md:[&>div:first-child]:order-2"
              : ""
          }`}
        >
          <div className="relative aspect-[1.55] overflow-hidden rounded-xl border border-border bg-card">
            <Image
              src="/house.png"
              alt={`A quiet moment from act ${index + 1} of the story`}
              fill
              sizes="(max-width: 768px) 100vw, 55vw"
              className="object-cover"
            />
          </div>
          <div
            className={`max-w-md ${chapter.imageSide === "right" ? "md:justify-self-end" : ""}`}
          >
            <p className="mb-3 text-xs uppercase tracking-[.24em] text-primary">
              {chapter.label}
            </p>
            <h2 className="max-w-sm font-serif text-3xl uppercase leading-[.94] sm:text-4xl">
              {chapter.title}
            </h2>
            <p className="mt-4 max-w-sm leading-relaxed text-muted-foreground">
              {chapter.copy}
            </p>
          </div>
        </motion.article>
      ))}
    </motion.section>
  );
}
