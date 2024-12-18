import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { useNavigate } from "react-router-dom";
import { useAuthService } from "@/services/authService";

const formSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(6, { message: "Password must contains at least 6 character" }),
  firstName: z.string().min(1, { message: "First  name is required" }),
  lastName: z.string().min(1, { message: "Last name is required" }),
});

export default function RegisterForm() {
  const { register, isLoading, error } = useAuthService();

  const navigate = useNavigate();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const result = await register(values);

    if (result) {
      console.log(result);
      navigate("/dashboard");
    } else {
      console.log(error);
    }
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Enter your email..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter your password..."
                  {...field}
                  type="password"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="firstName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>First name</FormLabel>
              <FormControl>
                <Input placeholder="Enter your first name..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="lastName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Last name</FormLabel>
              <FormControl>
                <Input placeholder="Enter your first name..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {!isLoading && error && <p className="text-red-500">{error}</p>}
        <div className="mt-4 w-full">
          <Button className="w-full" type="submit" disabled={isLoading}>
            {isLoading ? "Registering..." : "Register"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
