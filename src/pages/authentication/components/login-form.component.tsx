import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  loginSchema,
  LoginSchema,
} from "@/shared/schema/authentication.schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/icon/icon.component";
import { useState } from "react";
import { useLoginMutation } from "@/hooks/queries/authentication.hooks";

const LoginForm = () => {
  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const { mutate: loginMutation } = useLoginMutation();

  return (
    <Form {...form}>
      <form
        className="flex flex-col gap-4"
        onSubmit={form.handleSubmit(({ email, password }) =>
          loginMutation({ email, password })
        )}
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="email"
                  placeholder="example@domain.com"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field: { ref, ...fieldProps } }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  {...fieldProps}
                  inputRef={ref}
                  type={isPasswordVisible ? "text" : "password"}
                  icon={
                    <Icon type={isPasswordVisible ? "eye-closed" : "eye"} />
                  }
                  iconInsideInput
                  onIconClick={() =>
                    setIsPasswordVisible((isVisible) => !isVisible)
                  }
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Continue</Button>
      </form>
    </Form>
  );
};

export { LoginForm };
