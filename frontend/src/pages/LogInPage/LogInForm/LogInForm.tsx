import { FormEventHandler, useState } from "react";
import { useNavigate } from "react-router-dom";

type LogInFormProps = {
  onLogin: (dto: { email: string; password: string }) => Promise<string>;
};

function LogInForm({ onLogin }: LogInFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    try {
      console.log("sdsd");

      const accessToken = await onLogin({ email, password });
      console.log("accessToken", accessToken);
      navigate("/");
      localStorage.setItem("token", accessToken);
    } catch (error) {
      setError("오류 발생");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="이메일"
        required
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="비밀번호"
        required
      />
      <button type="submit">로그인</button>
      {error && <p className="error-message">{error}</p>}
    </form>
  );
}

export default LogInForm;
