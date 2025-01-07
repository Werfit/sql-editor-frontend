import { Button } from "@/components/ui/button";
import { Error, ErrorDescription, ErrorTitle } from "@/components/ui/error";
import { useRouter } from "@tanstack/react-router";

type GlobalErrorProps = {
  message: string;
};

const GlobalError: React.FC<GlobalErrorProps> = ({ message }) => {
  const router = useRouter();

  return (
    <Error className="my-40 px-6">
      <ErrorTitle>Unexpected error occurred</ErrorTitle>
      <ErrorDescription>{message}</ErrorDescription>

      <Button onClick={() => router.invalidate()}>Try again</Button>
    </Error>
  );
};

export { GlobalError };
