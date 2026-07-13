import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { userService } from "../../services/user.service";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [showOtpForm, setShowOtpForm] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const data = await userService.getMe();
      if (data.success && data.user.role === "admin") {
        navigate("/admin", { replace: true });
      }
    } catch (err) {
      // Not logged in, stay on login page
      setLoading(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");
    setLoginLoading(true);
    try {
      const data = await userService.login(email, password);
      if (data.success) {
        if (data.requiresTwoFactor) {
          setShowOtpForm(true);
        } else {
          navigate("/admin", { replace: true });
        }
      } else {
        setLoginError("Login failed.");
      }
    } catch (err: any) {
      setLoginError(err.response?.data?.message || "Invalid credentials.");
    } finally {
      setLoginLoading(false);
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");
    setLoginLoading(true);
    try {
      const data = await userService.verifyOtp(email, otp);
      if (data.success) {
        navigate("/admin", { replace: true });
      }
    } catch (err: any) {
      setLoginError(err.response?.data?.message || "Invalid OTP code.");
    } finally {
      setLoginLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-slate-950 text-white font-sans">
        <div className="text-xl font-bold animate-pulse">Checking Session...</div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 p-6 font-sans">
      <div className="w-full max-w-md rounded-2xl border border-slate-800/80 bg-slate-900/40 p-8 shadow-2xl backdrop-blur-md">
        <h2 className="text-center text-3xl font-extrabold tracking-tight text-white mb-6">
          Admin <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-indigo-400">Portal</span>
        </h2>

        {loginError && (
          <div className="mb-4 rounded-lg bg-red-950/50 border border-red-500/30 p-3 text-sm text-red-400 text-center">
            {loginError}
          </div>
        )}

        {showOtpForm ? (
          <form onSubmit={handleVerifyOtp} className="space-y-4">
            <div className="text-slate-350 text-sm text-center mb-6">
              A 6-digit verification code has been dispatched to your email address. Please enter it below.
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Verification Code</label>
              <input
                type="text"
                required
                maxLength={6}
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                placeholder="000000"
                className="w-full text-center text-2xl font-mono font-bold tracking-[8px] rounded-lg border border-slate-700 bg-slate-800/50 px-4 py-2.5 text-white placeholder-slate-650 outline-none focus:border-purple-500 transition-colors"
              />
            </div>

            <button
              type="submit"
              disabled={loginLoading}
              className="w-full rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 py-3 font-semibold text-white transition-all shadow-md active:scale-95 disabled:opacity-50"
            >
              {loginLoading ? "Verifying..." : "Verify Code"}
            </button>

            <button
              type="button"
              onClick={() => {
                setShowOtpForm(false);
                setOtp("");
                setLoginError("");
              }}
              className="w-full text-xs text-slate-400 hover:text-slate-200 transition-colors mt-2"
            >
              ← Back to Sign In
            </button>
          </form>
        ) : (
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Email Address</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@portfolio.com"
                className="w-full rounded-lg border border-slate-700 bg-slate-800/50 px-4 py-2.5 text-white placeholder-slate-500 outline-none focus:border-purple-500 transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Password</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full rounded-lg border border-slate-700 bg-slate-800/50 px-4 py-2.5 text-white placeholder-slate-500 outline-none focus:border-purple-500 transition-colors"
              />
            </div>

            <button
              type="submit"
              disabled={loginLoading}
              className="w-full rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 py-3 font-semibold text-white transition-all shadow-md active:scale-95 disabled:opacity-50"
            >
              {loginLoading ? "Authenticating..." : "Sign In"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default LoginPage;
