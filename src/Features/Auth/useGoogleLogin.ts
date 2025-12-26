import { useGoogleLogin } from "@react-oauth/google";
import { message } from "antd";
import { useNavigate } from "react-router-dom";
import { AuthService } from "./index";

interface UseGoogleLoginProps {
  onLoadingChange: (loading: boolean) => void;
}

export const useGoogleLoginHook = ({
  onLoadingChange,
}: UseGoogleLoginProps) => {
  const navigate = useNavigate();

  const handleGoogleLoginSuccess = async (credentialResponse: any) => {
    try {
      onLoadingChange(true);
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
      onLoadingChange(false);
    }
  };

  const googleLogin = useGoogleLogin({
    onSuccess: handleGoogleLoginSuccess,
    onError: () => {
      message.error("Đăng nhập Google thất bại. Vui lòng thử lại.");
    },
  });

  return googleLogin;
};
