import { useForm } from "react-hook-form";
import Field from "../components/Field";
import Fieldset from "../components/Fieldset";
import Form from "../components/Form";
import SubmitButton from "../components/SubmitButton";
import { registerUserWithEmailAndPass } from "../superbase";
function Register() {
  const {
    handleSubmit,
    reset,
    register,
    formState: { errors },
  } = useForm();

  async function handleRegistration(data) {
    await registerUserWithEmailAndPass(data.email, data.password);
    reset();
  }

  return (
    <Form onSubmit={handleSubmit(handleRegistration)}>
      <Fieldset title={"Create an account"}>
        <Field label={"Email"} error={errors.email}>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email"
            {...register("email", { required: "Email is required" })}
            autoComplete="email"
          />
        </Field>
        <Field label={"Password"} error={errors.password}>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Enter your password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password should be gratter then 6",
              },
            })}
            autoComplete="password"
          />
        </Field>
        <Field label={"Confirm Password"} error={errors.confirmPassword}>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            placeholder="Re-type your password"
            {...register("confirmPassword", {
              validate: (value, formValues) =>
                value === formValues.password || "Password dont match",
            })}
            autoComplete="confirmPassword"
          />
        </Field>
        <SubmitButton />
      </Fieldset>
    </Form>
  );
}

export default Register;
