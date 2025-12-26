import { GoogleLogin } from "@react-oauth/google";
import { message } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthService } from "../../Features/Auth";

const LoginPage = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [step, setStep] = useState<"register" | "otp">("register");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const getHeaderText = () => {
    if (isLogin) return "Đăng nhập tài khoản";
    if (step === "register") return "Tạo tài khoản mới";
    return "Xác minh OTP";
  };

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const [registerEmail, setRegisterEmail] = useState("");
  const [registerUsername, setRegisterUsername] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [registerConfirmPassword, setRegisterConfirmPassword] = useState("");

  const [otpCode, setOtpCode] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await AuthService.login({
        email: loginEmail,
        password: loginPassword,
      });

      if (response.isSuccess && response.result) {
        AuthService.setToken(response.result);
        message.success("Đăng nhập thành công!");
        navigate("/");
      } else {
        message.error(response.message || "Đăng nhập thất bại");
      }
    } catch (err) {
      message.error("Có lỗi xảy ra. Vui lòng thử lại.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (registerPassword !== registerConfirmPassword) {
      message.error("Mật khẩu không khớp");
      setLoading(false);
      return;
    }

    try {
      const response = await AuthService.register({
        userName: registerUsername,
        email: registerEmail,
        password: registerPassword,
        confirmPassword: registerConfirmPassword,
      });

      if (response.isSuccess) {
        setEmail(registerEmail);
        setStep("otp");
        message.success("OTP đã được gửi đến email của bạn!");
      } else {
        message.error(response.message || "Đăng ký thất bại");
      }
    } catch (err) {
      message.error("Có lỗi xảy ra. Vui lòng thử lại.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await AuthService.verifyOtp({
        email,
        otpCode,
      });

      if (response.isSuccess) {
        message.success("Xác minh OTP thành công! Vui lòng đăng nhập.");
        setIsLogin(true);
        setStep("register");
        setRegisterEmail("");
        setRegisterUsername("");
        setRegisterPassword("");
        setRegisterConfirmPassword("");
        setOtpCode("");
      } else {
        message.error(response.message || "Mã OTP không hợp lệ");
      }
    } catch (err) {
      message.error("Có lỗi xảy ra. Vui lòng thử lại.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLoginSuccess = async (credentialResponse: any) => {
    try {
      setLoading(true);
      const idToken = credentialResponse.credential;

      if (!idToken) {
        message.error("Không thể lấy token từ Google");
        return;
      }

      const response = await AuthService.googleLogin({ idToken });

      if (response.isSuccess && response.result) {
        AuthService.setToken(response.result);
        message.success("Đăng nhập Google thành công!");
        navigate("/");
      } else {
        message.error(response.message || "Đăng nhập Google thất bại");
      }
    } catch (err: any) {
      message.error(
        err.message || "Có lỗi xảy ra khi đăng nhập Google. Vui lòng thử lại."
      );
      console.error("Google login error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-600 via-white to-black flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-blue-600 mb-2">FakeBook</h1>
            <p className="text-gray-600">{getHeaderText()}</p>
          </div>

          {isLogin && (
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label
                  htmlFor="login-email"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Email
                </label>
                <input
                  id="login-email"
                  type="email"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-600 transition-colors"
                  placeholder="your@email.com"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="login-password"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Mật khẩu
                </label>
                <input
                  id="login-password"
                  type="password"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-600 transition-colors"
                  placeholder="••••••••"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Đang xử lý..." : "Đăng nhập"}
              </button>
            </form>
          )}

          {!isLogin && step === "register" && (
            <form onSubmit={handleRegister} className="space-y-4">
              <div>
                <label
                  htmlFor="register-username"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Tên người dùng
                </label>
                <input
                  id="register-username"
                  type="text"
                  value={registerUsername}
                  onChange={(e) => setRegisterUsername(e.target.value)}
                  className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-600 transition-colors"
                  placeholder="Nhập tên người dùng"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="register-email"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Email
                </label>
                <input
                  id="register-email"
                  type="email"
                  value={registerEmail}
                  onChange={(e) => setRegisterEmail(e.target.value)}
                  className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-600 transition-colors"
                  placeholder="your@email.com"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="register-password"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Mật khẩu
                </label>
                <input
                  id="register-password"
                  type="password"
                  value={registerPassword}
                  onChange={(e) => setRegisterPassword(e.target.value)}
                  className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-600 transition-colors"
                  placeholder="••••••••"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="register-confirm-password"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Xác nhận mật khẩu
                </label>
                <input
                  id="register-confirm-password"
                  type="password"
                  value={registerConfirmPassword}
                  onChange={(e) => setRegisterConfirmPassword(e.target.value)}
                  className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-600 transition-colors"
                  placeholder="••••••••"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Đang xử lý..." : "Đăng ký"}
              </button>
            </form>
          )}

          {!isLogin && step === "otp" && (
            <form onSubmit={handleVerifyOtp} className="space-y-4">
              <div className="text-center mb-4">
                <p className="text-sm text-gray-600">
                  Mã OTP đã được gửi đến: <strong>{email}</strong>
                </p>
              </div>

              <div>
                <label
                  htmlFor="otp-code"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Mã OTP
                </label>
                <input
                  id="otp-code"
                  type="text"
                  value={otpCode}
                  onChange={(e) => setOtpCode(e.target.value)}
                  className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-600 transition-colors text-center text-lg tracking-widest"
                  placeholder="000000"
                  maxLength={6}
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Đang xác minh..." : "Xác minh OTP"}
              </button>

              <button
                type="button"
                onClick={() => {
                  setStep("register");
                  setOtpCode("");
                }}
                className="w-full bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-2 px-4 rounded-lg transition-all duration-200"
              >
                Quay lại
              </button>
            </form>
          )}

          {isLogin && (
            <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
              <p className="text-xs text-gray-600 mb-4 text-center font-semibold">
                Hoặc đăng nhập với Google
              </p>
              <div className="flex justify-center">
                <GoogleLogin
                  onSuccess={handleGoogleLoginSuccess}
                  onError={() => {
                    message.error(
                      "Đăng nhập Google thất bại. Vui lòng thử lại."
                    );
                  }}
                  width="100"
                />
              </div>
            </div>
          )}

          <div className="mt-6 text-center border-t border-gray-200 pt-6">
            {isLogin ? (
              <p className="text-gray-600 text-sm">
                Chưa có tài khoản?{" "}
                <button
                  onClick={() => {
                    setIsLogin(false);
                    setLoginEmail("");
                    setLoginPassword("");
                  }}
                  className="text-blue-600 font-bold hover:underline"
                >
                  Đăng ký ngay
                </button>
              </p>
            ) : (
              <p className="text-gray-600 text-sm">
                Đã có tài khoản?{" "}
                <button
                  onClick={() => {
                    setIsLogin(true);
                    setStep("register");
                    setRegisterEmail("");
                    setRegisterUsername("");
                    setRegisterPassword("");
                    setRegisterConfirmPassword("");
                    setOtpCode("");
                  }}
                  className="text-blue-600 font-bold hover:underline"
                >
                  Đăng nhập
                </button>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
