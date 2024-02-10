import { useFormik } from "formik";
import { toAbsoluteUrl } from "../../../_cloner/helpers";
import Inputs from "./components/Inputs";
import * as Yup from "yup";
import Captcha from "./components/Captcha";
import { useGetCaptcha } from "./core/_hooks";
import { useState } from "react";
import { loginUser } from "./core/_requests";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import LoginForm from "./LoginForm";

const Login = () => {
  const loginSchema = Yup.object().shape({
    username: Yup.string()
      .min(3, "تعداد کاراکتر کمتر از 3 مجاز نمی باشد")
      .max(50, "تعداد کاراکتر بیشتر از 50 مجاز نمی باشد")
      .required("نام کاربری الزامی است"),
    password: Yup.string()
      .min(3, "تعداد کاراکتر کمتر از 3 مجاز نمی باشد")
      .max(50, "تعداد کاراکتر بیشتر از 50 مجاز نمی باشد")
      .required("رمز عبور الزامی است"),
    captcha: Yup.string().required("کدامنیتی الزامی است"),
  });

  const initialValues = {
    username: "",
    password: "",
    captcha: "",
  };

  const [loading, setLoading] = useState<boolean>(false);

  const { data: captcha, refetch } = useGetCaptcha();

  const formik = useFormik({
    initialValues,
    validationSchema: loginSchema,
    onSubmit: async (values, { setStatus, setSubmitting }) => {
      setLoading(true);
      const userData = {
        username: values.username,
        password: values.password,
        captchaToken: captcha.tokenString,
        captchaCode: values.captcha,
      };
      try {
        const auth = await loginUser(userData);
        console.log(auth);
        if (auth.status === 400 || auth.status === 404) {
          toast.error(auth.data.errors.ErrorMessasge);
          refetch();
          setLoading(false);
        } else {
          localStorage.setItem("auth", JSON.stringify(auth));
          Cookies.set("token", `${auth?.jwtToken}`);
          setLoading(false);
          window.location.reload();
        }
      } catch (error) {
        setStatus("اطلاعات ورود نادرست می باشد");
        setSubmitting(false);
        setLoading(false);
        refetch();
      }
    },
  });

  return (
    <>
      <div
        className="h-screen  md:block hidden "
        style={{
          backgroundImage: `url(${toAbsoluteUrl("/media/logos/login-bg.png")})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "left top ",
          rotate: "180deg",
        }}
      >
        <div
          className={
            "md:w-[70%] xl:w-[50%] mr-auto h-full flex items-center justify-center [rotate:180deg]"
          }
        >
          <form
            onSubmit={formik.handleSubmit}
            className="flex justify-center items-center flex-col border-[1px] box-shadow shadow-sm rounded-[10px] hadow-[#4E68C2] w-[80%] shrink-0 md:max-w-[600px] min-w-[500px] py-8 h-fit "
          >
            <LoginForm formik={formik} loading={loading} />
          </form>
        </div>
      </div>

      <div
        className={"md:hidden h-screen"}
        style={{
          backgroundImage: `url(${toAbsoluteUrl(
            "/media/logos/mobile-login-bg.png"
          )})`,
          backgroundRepeat: "repeat-y",
          backgroundSize: "cover",
          backgroundPosition: "center center ",
        }}
      >
        <div
          className={"w-full h-full mr-auto flex items-center justify-center"}
        >
          <form
            onSubmit={formik.handleSubmit}
            className="bg-white flex justify-center items-center flex-col border-[1px] box-shadow shadow-sm rounded-[10px] hadow-[#4E68C2] w-[80%] shrink-0  py-8 h-fit"
          >
            <LoginForm formik={formik} loading={loading} />
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
