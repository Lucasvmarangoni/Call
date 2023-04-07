import { TextInput, Button, Text } from "@ignite-ui/react";
import { Form, FormAnnotation } from "./style";
import { ArrowRight } from "phosphor-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/router";

const claimUsernameFormSchema = z.object({
  username: z
    .string()
    .min(3, { message: "Without minimum 3 characters" })
    .regex(/^[a-z\\-]+$/, { message: "Only letters and hyphens" })
    .transform((username) => username.toLowerCase()),
});

type ClaimUsernameFormData = z.infer<typeof claimUsernameFormSchema>;

export function ClaimUsernameForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ClaimUsernameFormData>({
    resolver: zodResolver(claimUsernameFormSchema),
  });

  const router = useRouter();

  async function handleClaimUsername(data: ClaimUsernameFormData) {
    const { username } = data;

    await router.push(`/register?username=${username}`);
  }

  return (
    <>
      <Form as="form" onSubmit={handleSubmit(handleClaimUsername)}>
        <TextInput
          size="sm"
          prefix="ignite.com/"
          placeholder="Enter your username"
          {...register("username")}
        />

        <Button size="sm" type="submit" disable={isSubmitting}>
          Reserve
          <ArrowRight />
        </Button>
      </Form>

      <FormAnnotation>
        <Text size="sm">
          {errors.username ? errors.username.message : "Your username"}
        </Text>
      </FormAnnotation>
    </>
  );
}
