"use client";
import { motion } from "motion/react";

interface Props {
  title: string;
  titleHighlighted: string;
}

export default function PageHeading({ title, titleHighlighted }: Props) {
  return (
    <motion.h1
      initial={{ opacity: 0, y: -16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.5,
        ease: "easeOut",
      }}
      className="text-4xl sm:text-5xl md:text-6xl uppercase font-serif font-semibold mb-8"
    >
      {title} <br />
      <span className="italic text-primary">{titleHighlighted}</span>
    </motion.h1>
  );
}
