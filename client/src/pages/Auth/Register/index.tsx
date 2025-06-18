import Card from "@/components/Card";
import api from "@/config/api";
import { zodResolver } from "@hookform/resolvers/zod";
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
  });

  const navigate = useNavigate();
  const onSubmit = async (data: formDataTypes) => {
    try {
      const response = await api.post("/auth/register", data);
      if (response.status === 201) {
        toast.success("Registration successful! Please log in.");
        navigate("/login");
      }
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <Card>
      <div className="w-full h-screen flex flex-col space-y-6 items-center justify-center">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col space-y-3 bg-white/30 p-8 rounded-xl shadow-md w-full max-w-md"
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
          {errors.username && (
            <span className="text-red-500 text-sm -mt-2">
              {errors.username.message}
            </span>
          )}
          <input
            type="email"
            placeholder="Email"
            title="someone@mail.domain"
            className="w-full mb-4 px-4 py-2 outline rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all duration-300 ease-in-out"
            {...register("email")}
          />
          {errors.email && (
            <span className="text-red-500 text-sm -mt-2">
              {errors.email.message}
            </span>
          )}
          <input
            type="password"
            placeholder="Password"
            title="$ecureP@ssword123"
            className="w-full mb-4 px-4 py-2 outline rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all duration-300 ease-in-out"
            {...register("password")}
          />
          {errors.password && (
            <span className="text-red-500 text-sm -mt-2">
              {errors.password.message}
            </span>
          )}
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
