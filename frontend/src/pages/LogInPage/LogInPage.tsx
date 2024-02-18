import auth from "../../api/auth.api";
import LogInForm from "./LogInForm/LogInForm";

function LogInPage() {
  return (
    <div>
      <LogInForm onLogin={auth.logIn} />
    </div>
  );
}

export default LogInPage;
