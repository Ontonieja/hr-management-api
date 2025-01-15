import CompanyForm from "@/components/CompanyForm";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Company() {
  return (
    <main className="flex justify-center items-center h-svh ">
      <Card className="w-[90svw] md:w-[60svw] 2xl:w-[40svw]">
        <CardHeader>
          <CardTitle>Create Your Business Profile</CardTitle>
          <CardDescription>
            Provide your company's details to establish your professional
            identity.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <CompanyForm />
        </CardContent>
      </Card>
    </main>
  );
}
