import Card from "@/components/Card";
import { Link } from "react-router-dom";
import {
  PasswordInputWithLabel,
  SubmitButton,
  TextInputWithLabel,
} from "@/components";
import { useLoginForm } from "./useLoginForm";

function Login() {
  const { form, onSubmit, isError, loading } = useLoginForm();

  return (
    <Card>
      <div className="form-container w-full h-screen flex flex-col items-center justify-center">
        <form
          onSubmit={onSubmit}
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
            {...form.register("email")}
          />
          <PasswordInputWithLabel
            label="Password"
            id="password"
            placeholder="Your$trongP@ssword@123"
            hint="Enter the same password you used to register previously"
            {...form.register("password")}
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
