import { formErrorsHandler } from "@/helpers/errorHandler";
import useAuthStore from "@/stores/auth.store";
import { registerSchema } from "@/validation/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { animate } from "animejs";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { z } from "zod";

export type RegisterFormDate = z.infer<typeof registerSchema>;

export const useRegisterForm = () => {
  const register = useAuthStore((s) => s.register);
  const login = useAuthStore((s) => s.login);
  const loading = useAuthStore((s) => s.loading);

  const navigate = useNavigate();

  const form = useForm<RegisterFormDate>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      password: "",
      username: "",
    },
    mode: "onSubmit",
    reValidateMode: "onSubmit",
  });

  const onSubmit = async (data: RegisterFormDate) => {
    try {
      const registered = await register(data);

      if (registered) {
        const loggedIn = await login({
          email: data.email,
          password: data.password,
        });

        if (loggedIn) {
          toast.success("Account created successfully!");
          navigate("/dashboard");
        }
      } else {
        animate(".form-container", {
          translateX: [25, 0, -25, 0, 25, 0, -25, 0],
          duration: 300,
          ease: "inOutExpo",
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const isError = !!formErrorsHandler(form.formState.errors);

  return {
    form,
    onSubmit: form.handleSubmit(onSubmit),
    isError,
    loading,
  };
};
