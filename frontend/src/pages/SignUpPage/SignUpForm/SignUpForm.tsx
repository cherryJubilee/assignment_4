import { FormEventHandler, useState } from "react";

type SignUpFormProps = {
  onSignUp: (dto: {
    email: string;
    password: string;
    id: string;
  }) => Promise<void>;
};

function SignUpForm({ onSignUp }: SignUpFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [id, setId] = useState("");
  const [error, setError] = useState("");

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    try {
      await onSignUp({ email, password, id });
      // 회원가입 성공 후 추가 처리 (예: 로그인 페이지로 리디렉션)
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
      <input
        type="text"
        value={id}
        onChange={(e) => setId(e.target.value)}
        placeholder="사용자 ID"
        required
      />
      <button type="submit">회원가입</button>
      {error && <p className="error-message">{error}</p>}
    </form>
  );
}

export default SignUpForm;
