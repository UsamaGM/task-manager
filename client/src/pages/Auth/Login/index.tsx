import Card from "@/components/Card";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { animate } from "animejs";
import { formErrorsHandler } from "@/helpers/errorHandler";
import { useAuth } from "@/contexts/AuthContext";
import {
  FormContainer,
  PasswordInputWithLabel,
  SubmitButton,
  TextInputWithLabel,
} from "@/components";
import { useState } from "react";

function Login() {
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const formSchema = z.object({
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
    defaultValues: { email: "", password: "" },
    mode: "onSubmit",
    reValidateMode: "onSubmit",
  });

  async function onSubmit(data: formDataTypes) {
    setLoading(true);
    const loggedIn = await login(data);
    setLoading(false);

    if (loggedIn) {
      toast.success("Login successful!");
      navigate("/home/dashboard");
    } else
      animate(".form-container", {
        translateX: [25, 0, -25, 0, 25, 0, -25, 0],
        duration: 300,
        ease: "inOutExpo",
      });
  }

  const isError = !!formErrorsHandler(errors);

  return (
    <Card>
      <div className="form-container w-full h-screen flex flex-col items-center justify-center">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className={`flex flex-col space-y-6 bg-white/30 p-8 rounded-xl shadow-md w-full max-w-lg ${
            isError && "border-red-400 border-2"
          }`}
        >
          <h2 className="text-2xl font-bold mb-10 text-purple-700 text-center">
            Log In
          </h2>
          <TextInputWithLabel
            label="Email"
            id="email"
            placeholder="someone@domain.xyz"
            hint="Enter the email that you used to register previously"
            {...register("email")}
          />
          <PasswordInputWithLabel
            label="Password"
            id="password"
            placeholder="Your$trongP@ssword@123"
            hint="Enter the same password you used to register previously"
            {...register("password")}
          />
          <SubmitButton title="Log In" isLoading={loading} />
        </form>
        <span className="mt-6">
          Already have an account?{" "}
          <Link to="/register" className="text-blue-700 hover:underline">
            Click here
          </Link>{" "}
          to get started.
        </span>
      </div>
    </Card>
  );
}

export default Login;
