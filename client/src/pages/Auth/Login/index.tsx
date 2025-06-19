import Card from "@/components/Card";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import api from "@/config/api";
import { setCookie } from "@/config/cookie";
import { animate } from "animejs";
import { formErrorsHandler } from "@/helpers/errorHandler";

function Login() {
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

  const navigate = useNavigate();
  const onSubmit = async (data: formDataTypes) => {
    try {
      const response = await api.post("/auth/login", data);
      if (response.status === 200) {
        localStorage.setItem("user", JSON.stringify(response.data.user));
        localStorage.setItem("token", response.data.token);
        setCookie("token", response.data.token, {
          maxAge: 3600,
          path: "/",
        });
        api.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${response.data.token}`;

        toast.success("Login successful!");
        navigate("/dashboard");
      }
    } catch (error: any) {
      toast.error(error.response.data.message);
      animate(".form-container", {
        translateX: [25, 0, -25, 0, 25, 0, -25, 0],
        duration: 300,
        ease: "inOutExpo",
      });
    }
  };

  const isError = formErrorsHandler(errors);

  return (
    <Card>
      <div className="form-container w-full h-screen flex flex-col space-y-4 items-center justify-center">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className={`flex flex-col bg-white/30 p-8 rounded-xl shadow-md w-full max-w-md ${
            isError && "border-red-400 border-2"
          }`}
        >
          <h2 className="text-2xl font-bold mb-6 text-purple-700 text-center">
            Login
          </h2>
          <input
            type="email"
            placeholder="Email"
            title="someone@mail.domain"
            className="w-full mb-4 px-4 py-2 outline rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all duration-300 ease-in-out"
            {...register("email")}
          />
          <input
            type="password"
            placeholder="Password"
            title="$ecureP@ssword123"
            className="w-full mb-4 px-4 py-2 outline rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all duration-300 ease-in-out"
            {...register("password")}
          />
          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition"
          >
            Login
          </button>
        </form>
        <span>
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
