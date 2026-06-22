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
import { redirect } from "next/navigation";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
// import { redirect } from "next/navigation";

import { FcGoogle } from "react-icons/fc";
import { HiSparkles } from "react-icons/hi2";


export default function SignUpPage() {
    const [mounted, setMounted] = useState(false);
    const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);
  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const user = Object.fromEntries(formData.entries());

    await authClient.signUp.email({
      ...user,
      plan: 'free',
    });

    // redirect('/')
     router.push("/");
  };
  

  return (
    <section className="relative w-full min-h-screen overflow-hidden bg-black">
      {/* Background decoration */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, #84cc16 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }}
      />

      {/* Gradient accents */}
      <div className="absolute -left-40 top-20 h-[500px] w-[500px] rounded-full bg-lime-300/5 blur-3xl" />
      <div className="absolute -right-40 bottom-20 h-[500px] w-[500px] rounded-full bg-lime-300/5 blur-3xl" />

      <div className="relative z-10 flex items-center justify-center min-h-screen px-6 py-16 sm:px-10 lg:px-16">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="mb-10 text-center">
            <div
              className={`mb-5 flex items-center justify-center gap-2 transition-all duration-700 ease-out ${
                mounted ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
              }`}
            >
              <HiSparkles className="h-4 w-4 text-lime-300" />
              <span className="text-xs font-bold uppercase tracking-[0.3em] text-lime-300">
                Join FitHub
              </span>
            </div>

            <h1
              className={`text-4xl font-bold uppercase italic leading-[1.1] tracking-tight text-white transition-all duration-700 ease-out ${
                mounted ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
              }`}
              style={{ transitionDelay: "100ms" }}
            >
              Create Account
            </h1>

            <p
              className={`mt-4 text-base font-medium text-white/60 transition-all duration-700 ease-out ${
                mounted ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
              }`}
              style={{ transitionDelay: "200ms" }}
            >
              Start your fitness journey today
            </p>
          </div>

          {/* Form */}
          <div
            className={`rounded-3xl border border-white/10 bg-white/5 p-8 transition-all duration-700 ease-out ${
              mounted ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
            }`}
            style={{ transitionDelay: "300ms" }}
          >
            <Form onSubmit={onSubmit}>
              <Fieldset className="w-full">
                <Fieldset.Legend className="text-white font-bold uppercase text-lg">
                  Signup
                </Fieldset.Legend>
                <Description className="text-white/40 mb-4">
                  Create your account
                </Description>

                <Fieldset.Group className="space-y-4">
                  <TextField isRequired name="name">
                    <Label className="text-white font-medium">Name</Label>
                    <Input
                      placeholder="John Doe"
                      className="rounded-2xl bg-white/5 border-white/10 text-white placeholder:text-white/40"
                    />
                    <FieldError className="text-red-400" />
                  </TextField>

                  <TextField name="image" type="url">
                    <Label className="text-white font-medium">Image URL</Label>
                    <Input
                      placeholder="Image URL"
                      className="rounded-2xl bg-white/5 border-white/10 text-white placeholder:text-white/40"
                    />
                    <FieldError className="text-red-400" />
                  </TextField>

                  <TextField isRequired name="email" type="email">
                    <Label className="text-white font-medium">Email</Label>
                    <Input
                      placeholder="john@example.com"
                      className="rounded-2xl bg-white/5 border-white/10 text-white placeholder:text-white/40"
                    />
                    <FieldError className="text-red-400" />
                  </TextField>

                  <TextField isRequired name="password" type="password">
                    <Label className="text-white font-medium">Password</Label>
                    <Input
                      placeholder="Password"
                      className="rounded-2xl bg-white/5 border-white/10 text-white placeholder:text-white/40"
                    />
                    <FieldError className="text-red-400" />
                  </TextField>

                  <Select isRequired name="role" placeholder="Select one">
                    <Label className="text-white font-medium">Signup As</Label>
                    <Select.Trigger className="rounded-2xl bg-white/5 border-white/10 text-white">
                      <Select.Value />
                      <Select.Indicator />
                    </Select.Trigger>
                    <Select.Popover className="bg-black border border-white/10 rounded-2xl">
                      <ListBox>
                        <ListBox.Item id="trainer" textValue="buyer" className="text-white hover:bg-lime-300/10">
                          Trainer
                          <ListBox.ItemIndicator />
                        </ListBox.Item>
                        <ListBox.Item id="member" textValue="seller" className="text-white hover:bg-lime-300/10">
                          Member
                          <ListBox.ItemIndicator />
                        </ListBox.Item>
                      </ListBox>
                    </Select.Popover>
                  </Select>
                </Fieldset.Group>

                <Button
                  onClick={() => toast.success("Account created successfully!")}
                  type="submit"
                  className="w-full h-14 mt-4 bg-lime-300 text-black font-bold uppercase tracking-wide rounded-2xl transition-all duration-300 hover:scale-[1.02] active:scale-95 hover:shadow-[0_0_40px_rgba(132,204,22,0.3)]"
                >
                  Signup
                </Button>

                <div className="mt-4">
                  <div className="relative flex items-center gap-4 py-2">
                    <div className="flex-1 border-t border-white/10" />
                    <span className="text-xs font-medium uppercase tracking-wider text-white/30">
                      Or
                    </span>
                    <div className="flex-1 border-t border-white/10" />
                  </div>

                  <Button
                    type="button"
                    className="w-full h-12 bg-white text-black font-medium rounded-2xl transition-all duration-300 hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-2"
                  >
                    <FcGoogle className="h-5 w-5" />
                    Sign Up with Google
                  </Button>
                </div>
              </Fieldset>
            </Form>
          </div>
        </div>
      </div>
    </section>
  );
}
