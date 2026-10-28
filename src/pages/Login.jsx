import { useForm } from "react-hook-form";
import Field from "../components/Field";
import Fieldset from "../components/Fieldset";
import Form from "../components/Form";
import SubmitButton from "../components/SubmitButton";
import { signInUserWithEmailAndPassword } from "../superbase";

function Login() {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();

  async function handleSignIn(data) {
    await signInUserWithEmailAndPassword(data.email, data.password);
    reset();
  }
  return (
    <Form onSubmit={handleSubmit(handleSignIn)}>
      <Fieldset title={"Login With Your Account"}>
        <Field label={"Email"} error={errors.email}>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email"
            autoCapitalize="email"
            {...register("email", { required: "Email is requird" })}
          />
        </Field>
        <Field label={"password"} error={errors.password}>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Enter your password"
            autoCapitalize="password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password should be gratter then 6",
              },
            })}
          />
        </Field>
        <SubmitButton />
      </Fieldset>
    </Form>
  );
}

export default Login;
