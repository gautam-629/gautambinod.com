"use client"

import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Github, Linkedin, Mail } from 'lucide-react'

export function Contact() {
  return (
    <section id="contact" className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold mb-4">Get in Touch</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Feel free to reach out for collaborations or just a friendly hello
          </p>
        </motion.div>

        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader className="text-center">
              <CardTitle>Contact Information</CardTitle>
              <CardDescription>Connect with me on social media or via email</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-center gap-4">
                <Button variant="outline" size="lg" asChild>
                  <a
                    href="https://github.com/gautam-629"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2"
                  >
                    <Github className="h-5 w-5" />
                    GitHub
                  </a>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <a
                    href="https://www.linkedin.com/in/gautambinod/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2"
                  >
                    <Linkedin className="h-5 w-5" />
                    LinkedIn
                  </a>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <a
                    href="mailto:gautambinod629@gmail.com"
                    className="flex items-center gap-2"
                  >
                    <Mail className="h-5 w-5" />
                    Email
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}