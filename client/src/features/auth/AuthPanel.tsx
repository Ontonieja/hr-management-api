import { Tabs, TabsContent, TabsTrigger } from "../../components/ui/tabs";
import { TabsList } from "@radix-ui/react-tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import loginImg from "../../assets/loginImg.svg";

export default function AuthPanel() {
  return (
    <Tabs defaultValue="login" className="w-[90svw] sm:w-[80svw] md:w-[70svw]">
      <div className="flex justify-around gap-14 items-center flex-row-reverse">
        <div className="w-1/2 max-md:hidden">
          <img src={loginImg} className=""></img>
        </div>
        <div className="flex-1">
          <TabsList className="grid grid-cols-2 w-full">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="register">Register</TabsTrigger>
          </TabsList>
          <TabsContent value="login">
            <Card>
              <CardHeader>
                <CardTitle>Login</CardTitle>
                <CardDescription>
                  Access your account to continue
                </CardDescription>
              </CardHeader>
              <CardContent>
                <LoginForm />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="register">
            <Card>
              <CardHeader>
                <CardTitle>Register</CardTitle>
                <CardDescription>
                  Create a new account to get started
                </CardDescription>
              </CardHeader>
              <CardContent>
                <RegisterForm />
              </CardContent>
            </Card>
          </TabsContent>
        </div>
      </div>
    </Tabs>
  );
}
