import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LoginForm } from "./components/login-form.component";
import { SignUpForm } from "./components/sign-up-form.component";

const AuthenticationPage = () => (
  <main className="mx-auto my-60 w-full max-w-screen-sm rounded-md bg-white px-6 py-4 shadow-md shadow-slate-400/25">
    <Tabs defaultValue="login">
      <div className="flex flex-wrap items-center justify-between">
        <h2 className="text-muted-foreground">Authentication</h2>

        <TabsList>
          <TabsTrigger value="login">Login</TabsTrigger>
          <TabsTrigger value="sign-up">Sign Up</TabsTrigger>
        </TabsList>
      </div>
      <TabsContent value="login">
        <LoginForm />
      </TabsContent>
      <TabsContent value="sign-up">
        <SignUpForm />
      </TabsContent>
    </Tabs>
  </main>
);

export { AuthenticationPage };
