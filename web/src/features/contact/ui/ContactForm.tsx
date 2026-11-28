"use client";

import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter } from "next/navigation";
import { Controller, useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ContactBody, contactSchema } from "../schema";
import { api } from "@/lib/axios";
import { toast } from "sonner";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
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

export default function ContactForm() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { isSubmitting, errors },
  } = useForm<ContactBody>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "GENERAL",
      content: "",
    },
  });

  const subject = useWatch({
    control,
    name: "subject",
    defaultValue: "GENERAL",
  });

  const onSubmit = async (data: ContactBody) => {
    try {
      await api.post("/contact", data);

      router.push("/");
      reset();
      toast.success(`Message has been sent`);
    } catch (error) {
      toast.error(`Something went wrong. Try again later.`);
      reset();
      console.error("Subscription Error:", error);
    }
  };

  return (
    <motion.form
      onSubmit={handleSubmit(onSubmit)}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="w-full max-w-3xl space-y-6"
    >
      <motion.div
        variants={itemVariants}
        className="flex flex-col items-center gap-2 lg:flex-row"
      >
        <Field>
          <FieldLabel htmlFor="fullName">Full Name</FieldLabel>
          <Input
            id="fullName"
            placeholder="John Doe"
            className="transition-shadow duration-300 focus-visible:ring-2"
            {...register("name")}
          />
          {errors.name && <FieldError>{errors.name.message}</FieldError>}
        </Field>

        <Field>
          <FieldLabel htmlFor="email">Email Address</FieldLabel>
          <Input
            id="email"
            type="email"
            placeholder="john@example.com"
            autoComplete="email"
            className="transition-shadow duration-300 focus-visible:ring-2"
            {...register("email")}
          />
          {errors.email && <FieldError>{errors.email.message}</FieldError>}
        </Field>
      </motion.div>

      <Controller
        name="subject"
        control={control}
        render={({ field }) => (
          <Field>
            <FieldLabel htmlFor="subject">Subject</FieldLabel>

            <Select value={subject} onValueChange={field.onChange}>
              <SelectTrigger id="subject" className="w-full">
                <SelectValue placeholder="Choose a Subject" />
              </SelectTrigger>

              <SelectContent>
                <SelectGroup>
                  <SelectItem value="GENERAL">General</SelectItem>
                  <SelectItem value="FESTIVAL_SCREENING">
                    Festival & Screening
                  </SelectItem>
                  <SelectItem value="PRESS_INTERVIEW">
                    Press & Interview
                  </SelectItem>
                  <SelectItem value="CREATIVE_COLLABORATION">
                    Creative Collaboration
                  </SelectItem>
                  <SelectItem value="OTHER">Something Else</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>

            {errors.subject && (
              <FieldError>{errors.subject.message}</FieldError>
            )}
          </Field>
        )}
      />

      <motion.div variants={itemVariants}>
        <Field>
          <FieldLabel htmlFor="message">Message</FieldLabel>
          <Textarea
            id="message"
            placeholder="Start writing..."
            className="h-30 resize-none transition-shadow duration-300 focus-visible:ring-2"
            {...register("content")}
          />
        </Field>
        {errors.content && <FieldError>{errors.content.message}</FieldError>}
      </motion.div>

      <motion.div variants={itemVariants} className="w-full lg:w-fit">
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          transition={{ duration: 0.2 }}
          className="w-full lg:w-fit"
        >
          <Button
            disabled={isSubmitting}
            className="w-full lg:w-fit"
            size="lg"
            type="submit"
          >
            {isSubmitting ? "Sending..." : "Send Message"}
          </Button>
        </motion.div>
      </motion.div>
    </motion.form>
  );
}
