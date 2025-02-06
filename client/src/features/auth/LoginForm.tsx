import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useLogin } from "@/services/authService";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { FormFieldWrapper } from "../../components/FormFieldWrapper";

const formSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(6, { message: "Password must contains at least 6 character" }),
});

export default function LoginForm() {
  const { mutate, isPending } = useLogin();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    mutate(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormFieldWrapper
          name="email"
          control={form.control}
          label="Email"
          placeholder="Enter your email..."
        />
        <FormFieldWrapper
          name="password"
          control={form.control}
          label="Password"
          placeholder="Enter your password..."
          type="password"
        />
        <div className="mt-4 w-full">
          <Button className="w-full" type="submit" disabled={isPending}>
            {isPending ? "Logging in..." : "Login"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
