"use client"

import { motion } from "framer-motion"

const defaultVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
}

export default function ScrollReveal({
  children,
  className = "",
  variants = defaultVariants,
  transition = { duration: 0.5, ease: "easeOut" },
  once = true,
  amount = 0.2,
}) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount }}
      variants={variants}
      transition={transition}
      className={className}
    >
      {children}
    </motion.div>
  )
}
