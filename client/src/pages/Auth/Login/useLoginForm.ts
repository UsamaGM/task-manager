import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "react-toastify";
import { animate } from "animejs";
import { useNavigate } from "react-router-dom";
import useAuthStore from "@/stores/auth.store";
import { formErrorsHandler } from "@/helpers/errorHandler";
import { loginSchema } from "@/validation/schemas";

export type LoginFormData = z.infer<typeof loginSchema>;

export const useLoginForm = () => {
  const { login, loading } = useAuthStore();
  const navigate = useNavigate();

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
    mode: "onSubmit",
    reValidateMode: "onSubmit",
  });

  const onSubmit = async (data: LoginFormData) => {
    const loggedIn = await login(data);

    if (loggedIn) {
      toast.success("Login successful!");
      navigate("/dashboard");
    } else {
      animate(".form-container", {
        translateX: [25, 0, -25, 0, 25, 0, -25, 0],
        duration: 300,
        ease: "inOutExpo",
      });
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
