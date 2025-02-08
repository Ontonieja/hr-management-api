import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { useRegister } from "@/services/authService";
import { FormFieldWrapper } from "../../components/FormFieldWrapper";

const formSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(6, { message: "Password must contains at least 6 character" }),
  firstName: z.string().min(1, { message: "First  name is required" }),
  lastName: z.string().min(1, { message: "Last name is required" }),
});

export default function RegisterForm() {
  const { mutate, isPending, error } = useRegister();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      firstName: "",
      lastName: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    mutate(values);
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormFieldWrapper
          name="email"
          control={form.control}
          label="Email"
          placeholder="Enter your company name..."
          disabled={isPending}
        />
        <FormFieldWrapper
          name="password"
          control={form.control}
          label="Password"
          placeholder="Enter your password..."
          type="password"
          disabled={isPending}
        />
        <FormFieldWrapper
          name="firstName"
          control={form.control}
          label="First name"
          placeholder="Enter your first name..."
          disabled={isPending}
        />
        <FormFieldWrapper
          name="lastName"
          control={form.control}
          label="Last name"
          placeholder="Enter your last name..."
          disabled={isPending}
        />
        {!isPending && error && <p className="text-red-500">{error.message}</p>}
        <div className="mt-4 w-full">
          <Button className="w-full" type="submit" disabled={isPending}>
            {isPending ? "Registering..." : "Register"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
