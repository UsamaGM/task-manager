import {
  PasswordInputWithLabel,
  SubmitButton,
  TextInputWithLabel,
} from "@/components";
import Card from "@/components/Card";
import { useRegisterForm } from "./useRegisterForm";
import { Link } from "react-router-dom";

function Register() {
  const { form, isError, loading, onSubmit } = useRegisterForm();

  return (
    <Card>
      <div className="form-container w-full h-screen flex flex-col items-center justify-center">
        <form
          onSubmit={onSubmit}
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
            {...form.register("username")}
          />
          <TextInputWithLabel
            label="Email"
            id="email"
            placeholder="someone@domain.xyz"
            hint="Enter your email"
            {...form.register("email")}
          />
          <PasswordInputWithLabel
            label="Password"
            id="password"
            placeholder="$trongP@ssw0rd@321"
            hint="Enter a strong password for your account"
            {...form.register("password")}
          />
          <SubmitButton isLoading={loading} title="Register" />
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
