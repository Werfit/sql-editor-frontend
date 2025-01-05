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
  SignUpSchema,
  signUpSchema,
} from "@/shared/schema/authentication.schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Icon } from "@/components/icon/icon.component";
import { useSignUpMutation } from "@/hooks/queries/authentication.hooks";

const SignUpForm = () => {
  const form = useForm<SignUpSchema>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: "",
      password: "",
      passwordConfirmation: "",
    },
  });

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isPasswordConfirmationVisible, setIsPasswordConfirmationVisible] =
    useState(false);

  const { mutate: signUpMutation } = useSignUpMutation();

  return (
    <Form {...form}>
      <form
        className="flex flex-col gap-4"
        onSubmit={form.handleSubmit((data) => signUpMutation(data))}
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
                  type="password"
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

        <FormField
          control={form.control}
          name="passwordConfirmation"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="password"
                  icon={
                    <Icon
                      type={
                        isPasswordConfirmationVisible ? "eye-closed" : "eye"
                      }
                    />
                  }
                  iconInsideInput
                  onIconClick={() =>
                    setIsPasswordConfirmationVisible((isVisible) => !isVisible)
                  }
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Create an account</Button>
      </form>
    </Form>
  );
};

export { SignUpForm };
