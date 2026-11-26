"use client";

import { DEVELOPERS_DATA } from "@/config/developers.data";
import Image from "next/image";
import { Link as LinkIcon } from "lucide-react";
import { motion } from "motion/react";

export default function Developers() {
  return (
    <section className="mx-auto max-w-4xl grid md:grid-cols-2 gap-4">
      {DEVELOPERS_DATA.map((item, index) => {
        const { name, role, socials, src } = item;

        return (
          <motion.article
            key={name}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{
              duration: 0.5,
              delay: index * 0.2,
              ease: "easeOut",
            }}
            className="group relative isolate aspect-3/4 rounded-2xl max-w-md mx-auto h-full w-full overflow-hidden"
          >
            <Image
              src={src}
              width={800}
              height={600}
              alt={name}
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />

            <div className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-4 p-6 md:p-8">
              <div>
                <p className="mb-3 text-xs font-medium uppercase tracking-[0.3em] text-primary">
                  {role}
                </p>
                <h2 className="font-serif text-3xl font-semibold uppercase leading-tight">
                  {name}
                </h2>
              </div>

              {socials.length > 0 && (
                <div className="flex shrink-0 items-center gap-3">
                  {socials.map((social) => (
                    <a
                      key={social.platform}
                      href={social.url}
                      target="_blank"
                      className="flex size-10 items-center justify-center rounded-full border border-border bg-secondary text-primary opacity-100 transition-all duration-300 hover:border-primary md:translate-y-2 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100"
                    >
                      <LinkIcon className="size-5" />
                    </a>
                  ))}
                </div>
              )}
            </div>
          </motion.article>
        );
      })}
    </section>
  );
}
