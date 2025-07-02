import {
  PasswordInputWithLabel,
  SubmitButton,
  TextInputWithLabel,
} from "@/components";
import Card from "@/components/Card";
import api from "@/config/api";
import { apiErrorHandler, formErrorsHandler } from "@/helpers/errorHandler";
import { zodResolver } from "@hookform/resolvers/zod";
import { animate } from "animejs";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { z } from "zod";

function Register() {
  const formSchema = z.object({
    username: z.string().min(1, "Username is required"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
  });
  type formDataTypes = z.infer<typeof formSchema>;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<formDataTypes>({
    resolver: zodResolver(formSchema),
    defaultValues: { username: "", email: "", password: "" },
    mode: "onSubmit",
    reValidateMode: "onSubmit",
  });

  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const onSubmit = async (data: formDataTypes) => {
    setIsLoading(true);
    try {
      const response = await api.post("/auth/register", data);
      if (response.status === 201) {
        toast.success("Registration successful! Please log in.");
        navigate("/login");
      }
    } catch (error) {
      apiErrorHandler(error);
      animate(".form-container", {
        translateX: [25, 0, -25, 0, 25, 0, -25, 0],
        duration: 300,
        ease: "inOutExpo",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const isError = formErrorsHandler(errors);

  return (
    <Card>
      <div className="form-container w-full h-screen flex flex-col items-center justify-center">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className={`flex flex-col space-y-6 bg-white/30 p-8 rounded-xl shadow-md w-full max-w-lg ${
            isError && "border-red-400 border-2"
          }`}
        >
          <h2 className="text-2xl font-bold mb-6 text-purple-700 text-center">
            Register
          </h2>

          <TextInputWithLabel
            label="Username"
            id="username"
            placeholder="I_Am_Batman"
            hint="Enter a username that will be displayed everywhere in the application"
            {...register("username")}
          />
          <TextInputWithLabel
            label="Email"
            id="email"
            placeholder="someone@domain.xyz"
            hint="Enter your email"
            {...register("email")}
          />
          <PasswordInputWithLabel
            label="Password"
            id="password"
            placeholder="$trongP@ssw0rd@321"
            hint="Enter a strong password for your account"
            {...register("password")}
          />
          <SubmitButton isLoading={isLoading} title="Register" />
        </form>
        <span className="mt-6">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-700 hover:underline">
            Click here
          </Link>{" "}
          to log in.
        </span>
      </div>
    </Card>
  );
}

export default Register;
