import { Button, Heading, MultiStep, TextInput } from "@ignite-ui/react";
import { Container, Form, FormError, Header } from "./styles";
import { Text } from "@ignite-ui/react";
import { ArrowRight } from "phosphor-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { api } from "@/lib/axios";

const registerFormSchema = z.object({
  username: z
    .string()
    .min(3, { message: "Without minimum 3 characters" })
    .regex(/^[a-z\\-]+$/, { message: "Only letters and hyphens" })
    .transform((username) => username.toLowerCase()),

  name: z.string().min(3, { message: "Without minimum 3 characters" }),
});

type RegisterFormData = z.infer<typeof registerFormSchema>;

export default function Register() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerFormSchema),
  });

  const router = useRouter();

  useEffect(() => {
    router.query.username &&
      setValue("username", String(router.query.username));
  }, [router.query?.username, setValue]);

  async function handleRegister(data: RegisterFormData) {
    try {
      await api.post("/users", {
        username: data.username,
        name: data.name,
      });
    }
    catch (err) {
      console.log(err);
    }
  }

  return (
    <Container>
      <Header>
        <Heading as="strong">Welcome to Ignite Call</Heading>
        <Text>
          We need some information to create your profile! Ah, you can edit this
          information later.
        </Text>

        <MultiStep size={4} currentStep={1} />
      </Header>

      <Form as="form" onSubmit={handleSubmit(handleRegister)}>
        <label>
          <Text size="sm">User Name</Text>
          <TextInput
            prefix="ignite.com/"
            placeholder="your user"
            {...register("username")}
          />
          {errors.username && (
            <FormError size="sm">{errors.username.message}</FormError>
          )}
        </label>

        <label>
          <Text size="sm">Full name</Text>
          <TextInput placeholder="your full name" {...register("name")} />

          {errors.name && (
            <FormError size="sm">{errors.name.message}</FormError>
          )}
        </label>

        <Button type="submit">
          Next step
          <ArrowRight />
        </Button>
      </Form>
    </Container>
  );
}
