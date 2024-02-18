import auth from "../../api/auth.api";
import SignUpForm from "./SignUpForm/SignUpForm";

function SignUpPage() {
  return (
    <div>
      <SignUpForm onSignUp={auth.signUp} />
    </div>
  );
}

export default SignUpPage;
