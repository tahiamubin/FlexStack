"use client";

import { authClient } from "@/lib/auth-client";

import {
  Button,
  Description,
  FieldError,
  Fieldset,
  Form,
  Input,
  Label,
  Surface,
  ListBox,
  Select,
  TextField,
} from "@heroui/react";
import Link from "next/link";
import { redirect } from "next/navigation";

// import { redirect } from "next/navigation";
import React from "react";
import toast from "react-hot-toast";


export default function SignInPage() {
  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const user = Object.fromEntries(formData.entries());

    const { data, error } = await authClient.signIn.email({
      email: user.email,
      password: user.password,
    });
    if (data) {
     redirect('/')
    }
    if (error) {
      toast.error("Sign in not successful");
    }
  };

  return (
    <div className="flex items-center justify-center rounded-3xl bg-surface p-6 max-w-2xl mx-auto border mt-5">
      <Surface className="w-full">
        <Form onSubmit={onSubmit}>
          <Fieldset className="w-full">
            <Fieldset.Group>
              <TextField isRequired name="email" type="email">
                <Label>Email</Label>
                <Input placeholder="john@example.com" variant="secondary" />
                <FieldError />
              </TextField>

              <TextField isRequired name="password" type="password">
                <Label>Password</Label>
                <Input placeholder="Password" variant="secondary" />
                <FieldError />
              </TextField>
            </Fieldset.Group>

            <Button type="submit" className={"w-full"}>
              Signin
            </Button>

            <div
              className="text-center pt-4 border-t border-zinc-100
         dark:border-zinc-800 mt-2 text-sm text-zinc-600 dark:text-zinc-400"
            >
              New to HireLoop?{" "}
              <Link
                href="/signup"
                className="font-medium cursor-pointer text-sm text-blue-600 dark:text-blue-400"
              >
                Create an account
              </Link>
            </div>
          </Fieldset>
        </Form>
      </Surface>
    </div>
  );
}
