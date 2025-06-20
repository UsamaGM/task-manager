import Card from "@/components/Card";
import api from "@/config/api";
import { apiErrorHandler, formErrorsHandler } from "@/helpers/errorHandler";
import { zodResolver } from "@hookform/resolvers/zod";
import { animate } from "animejs";
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

  const navigate = useNavigate();
  const onSubmit = async (data: formDataTypes) => {
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
    }
  };

  const isError = formErrorsHandler(errors);

  return (
    <Card>
      <div className="w-full h-screen flex flex-col space-y-6 items-center justify-center">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className={`flex flex-col bg-white/30 p-8 rounded-xl shadow-md w-full max-w-md ${
            isError && "border-red-400 border-2"
          }`}
        >
          <h2 className="text-2xl font-bold mb-6 text-purple-700 text-center">
            Register
          </h2>

          <input
            type="username"
            placeholder="Username"
            title="Someone..."
            className="w-full mb-4 px-4 py-2 outline rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all duration-300 ease-in-out"
            {...register("username")}
          />
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
            Register
          </button>
        </form>
        <span>
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
