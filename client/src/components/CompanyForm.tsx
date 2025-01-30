import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import companyTypes from "@/constants/companyType";
import { useCompanyService } from "@/services/companyService";
import { FormFieldWrapper } from "@/components/FormFieldWrapper";

const formSchema = z.object({
  companyName: z.string().min(1, { message: "Company name is required" }),
  industry: z.string().min(1),
  address: z.string().min(1),
  city: z.string().min(1),
  zip: z.string().min(1),
  country: z.string().min(1),
});

export default function CompanyForm() {
  const navigate = useNavigate();
  const { createCompany, isLoading, error } = useCompanyService();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      companyName: "",
      industry: "",
      address: "",
      city: "",
      zip: "",
      country: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    const result = await createCompany(values);

    if (result) {
      navigate("/dashboard");
    } else {
      console.log(error);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormFieldWrapper
          name="companyName"
          control={form.control}
          label="Company name"
          placeholder="Enter your email..."
        />
        <FormField
          control={form.control}
          name="industry"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Industry</FormLabel>
              <FormControl>
                <Select onValueChange={field.onChange} {...field}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select company type" />
                  </SelectTrigger>
                  <SelectContent>
                    {companyTypes.map((type) => (
                      <SelectItem value={type.value}>{type.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormFieldWrapper
          name="address"
          control={form.control}
          label="Address"
          placeholder="Enter your address..."
        />

        <div className="flex w-full gap-2">
          <div className="w-3/4">
            <FormFieldWrapper
              name="city"
              control={form.control}
              label="City"
              placeholder="Enter your city..."
            />
          </div>
          <div>
            <FormFieldWrapper
              name="zip"
              control={form.control}
              label="ZIP Code"
              placeholder="Enter your ZIP code..."
            />
          </div>
        </div>

        <FormFieldWrapper
          name="country"
          control={form.control}
          label="Country"
          placeholder="Enter your country..."
        />
        {error && !isLoading && <p className="text-red-500">{error}</p>}
        <div className="mt-4 w-full">
          <Button className="w-full" type="submit" disabled={isLoading}>
            {isLoading ? "Submitting..." : "Submit"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
