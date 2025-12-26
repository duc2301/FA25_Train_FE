import { GoogleLogin } from "@react-oauth/google";
import { message } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthService } from "../../Features/Auth";
import LoginImage from "../../Shared/Assets/Images/wallpaper_login.jpg";
import FakeBookIcon from "../../Shared/Assets/Icon/Fakebook_Icon_1.png";


const LoginPage = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [step, setStep] = useState<"register" | "otp">("register");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  // Logic giữ nguyên
  const getHeaderText = () => {
    if (isLogin) return "Welcome back to FakeBook";
    if (step === "register") return "Create your account";
    return "Verify OTP";
  };

  const getSubText = () => {
    if (isLogin) return "Connect with friends and the world around you.";
    if (step === "register") return "Join our community today.";
    return "Check your email for the verification code.";
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
    <div className=" bg-gray-100 flex items-center justify-center p-4 font-sans">
      <div className="w-full max-w-6xl bg-white rounded-3xl shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-[43%_57%] scale-96 h-fit">

        {/* LEFT SIDE - Image */}
        <div className="relative hidden lg:block h-full">
          <img
            src={LoginImage}
            alt="Login Visual"
            className="absolute inset-0 h-full w-full object-cover"
          />
          {/* Dark Overlay for text readability */}
          <div className="absolute inset-0 bg-black/40 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>

          <div className="absolute top-8 left-8">
            <h2 className="text-white text-2xl font-bold flex items-center gap-2">
              <span className="rounded-lg -mr-2">
                <img
                  src={FakeBookIcon}
                  alt="Login Visual"
                  className="inset-0 h-8 w-8 object-cover"
                />
              </span> akeBook
            </h2>
          </div>

          <div className="absolute bottom-12 left-8 right-8 text-white">
            <p className="text-xl font-medium leading-relaxed mb-4">
              "Simply all the tools that my team and I need to connect and share moments."
              <br/>
              "And Bo may dep trai"
            </p>
            <div>
              <p className="font-bold text-lg">Duc Pham</p>
              <p className="text-sm opacity-80">Fakebook Founder</p>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE - Form */}
        <div className="p-8 md:p-12 lg:p-16 flex flex-col justify-center bg-white">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{getHeaderText()}</h1>
            <p className="text-gray-500">{getSubText()}</p>
          </div>

          {/* LOGIN FORM */}
          {isLogin && (
            <form onSubmit={handleLogin} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all"
                  placeholder="ducpv@fakebook.com"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Mật khẩu</label>
                <input
                  type="password"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all"
                  placeholder="••••••••"
                  required
                />
              </div>

              {/* Extra UI options specific to design (Visual only for now) */}
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-6 bg-blue-600 rounded-full relative cursor-pointer opacity-80">
                    <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full shadow-sm"></div>
                  </div>
                  <span className="text-gray-600">Remember me</span>
                </div>
                <a href="#" className="text-blue-600 font-semibold hover:underline">Forgot password?</a>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-xl shadow-lg shadow-blue-600/30 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed text-lg"
              >
                {loading ? "Processing..." : "Log in"}
              </button>
            </form>
          )}

          {/* REGISTER FORM */}
          {!isLogin && step === "register" && (
            <form onSubmit={handleRegister} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">User Name</label>
                <input
                  type="text"
                  value={registerUsername}
                  onChange={(e) => setRegisterUsername(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all"
                  placeholder="Your user name"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  value={registerEmail}
                  onChange={(e) => setRegisterEmail(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all"
                  placeholder="ducpv@fakebook.com"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Mật khẩu</label>
                  <input
                    type="password"
                    value={registerPassword}
                    onChange={(e) => setRegisterPassword(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all"
                    placeholder="••••••••"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Xác nhận</label>
                  <input
                    type="password"
                    value={registerConfirmPassword}
                    onChange={(e) => setRegisterConfirmPassword(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all"
                    placeholder="••••••••"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-xl shadow-lg shadow-blue-600/30 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed text-lg"
              >
                {loading ? "Processing..." : "Sign up"}
              </button>
            </form>
          )}

          {/* OTP FORM */}
          {!isLogin && step === "otp" && (
            <form onSubmit={handleVerifyOtp} className="space-y-6">
              <div className="text-center bg-blue-50 p-4 rounded-xl border border-blue-100">
                <p className="text-sm text-blue-800">
                  OPT sent: <strong className="block text-lg">{email}</strong>
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 text-center">Enter OTP</label>
                <input
                  type="text"
                  value={otpCode}
                  onChange={(e) => setOtpCode(e.target.value)}
                  className="w-full px-4 py-4 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-blue-600 transition-colors text-center text-3xl tracking-[1em] font-bold"
                  placeholder="••••••"
                  maxLength={6}
                  required
                />
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setStep("register");
                    setOtpCode("");
                  }}
                  className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold py-3 px-4 rounded-xl transition-all"
                >
                  Back
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-[2] bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-xl shadow-lg shadow-blue-600/30 transition-all disabled:opacity-50"
                >
                  {loading ? "..." : "Verify"}
                </button>
              </div>
            </form>
          )}

          {/* DIVIDER */}
          {isLogin && (
            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-gray-500 uppercase tracking-wider text-xs">OR</span>
              </div>
            </div>
          )}

          {/* GOOGLE LOGIN */}
          {isLogin && (
            <div className="flex justify-center w-full">
              <GoogleLogin
                onSuccess={handleGoogleLoginSuccess}
                onError={() => {
                  message.error("Đăng nhập Google thất bại. Vui lòng thử lại.");
                }}
                width="500" 
                shape="rectangular"
                theme="outline"
              />
            </div>
          )}

          {/* FOOTER SWITCHER */}
          <div className="mt-8 text-center">
            {isLogin ? (
              <p className="text-gray-600">
                Don't have an account?{" "}
                <button
                  onClick={() => {
                    setIsLogin(false);
                    setLoginEmail("");
                    setLoginPassword("");
                  }}
                  className="text-blue-600 font-bold hover:underline"
                >
                  Sign up
                </button>
              </p>
            ) : (
              <p className="text-gray-600 mt-4">
                Already have an account?{" "}
                <button
                  onClick={() => {
                    setIsLogin(true);
                    setStep("register");
                    // Reset form fields logic if needed
                  }}
                  className="text-blue-600 font-bold hover:underline"
                >
                  Log in
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