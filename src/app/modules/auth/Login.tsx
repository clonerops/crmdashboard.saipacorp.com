import { useFormik } from "formik";
import { toAbsoluteUrl } from "../../../_cloner/helpers";
import Inputs from "./components/Inputs";
import * as Yup from "yup";
import Captcha from "./components/Captcha";
import { useGetCaptcha } from "./core/_hooks";
import { useState } from "react";
import { loginUser } from "./core/_requests";
import Cookies from 'js-cookie'
import { toast } from "react-toastify";

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

    const [loading, setLoading] = useState<boolean>(false)

    const { data: captcha, refetch } = useGetCaptcha();

    const formik = useFormik({
        initialValues,
        validationSchema: loginSchema,
        onSubmit: async (values, { setStatus, setSubmitting }) => {
            setLoading(true)
            const userData = {
                username: values.username,
                password: values.password,
                captchaToken: captcha.tokenString,
                captchaCode: values.captcha
            }
            try {
                const auth = await loginUser(userData);
                console.log(auth)
                if(auth.status === 400 || auth.status === 404) {
                    toast.error(auth.data.errors.ErrorMessasge)
                    refetch()
                    setLoading(false)
                } else {
                    localStorage.setItem("auth", JSON.stringify(auth))
                    Cookies.set("token", `${auth?.jwtToken}`);
                    setLoading(false)
                    window.location.reload();
                }
            } catch (error) {
                setStatus("اطلاعات ورود نادرست می باشد");
                setSubmitting(false);
                setLoading(false)
                refetch()
            }
        },
    });

    return (
        <>
            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 h-screen">
                <form
                    onSubmit={formik.handleSubmit}
                    className="flex justify-center items-center flex-col"
                >
                    <div>
                        <img
                            src={`${toAbsoluteUrl(
                                "/media/logos/saipa-logo.png"
                            )}`}
                            alt="background"
                        />
                    </div>

                    <div>
                        <label className="text-black text-3xl font-yekan_bold">
                            ورود
                        </label>
                    </div>
                    <div className="w-50">
                        <Inputs
                            type="text"
                            login={true}
                            getFieldProps={formik.getFieldProps}
                            touched={formik.touched.username}
                            errors={formik.errors.username}
                            name={"username"}
                            title="نام کاربری"
                        ></Inputs>
                    </div>
                    <div className="w-50">
                        <Inputs
                            type="password"
                            login={true}
                            getFieldProps={formik.getFieldProps}
                            touched={formik.touched.password}
                            errors={formik.errors.password}
                            name={"password"}
                            title="کلمه عبور"
                        ></Inputs>
                    </div>
                    <div className="w-50">
                        <Captcha captcha={captcha?.image} refetch={refetch} />
                        <Inputs
                            type="text"
                            login={true}
                            getFieldProps={formik.getFieldProps}
                            touched={formik.touched.captcha}
                            errors={formik.errors.captcha}
                            name={"captcha"}
                            title="کد امنیتی"
                        ></Inputs>
                    </div>
                    <div className="d-grid mb-10 w-50">
                        <button
                            type="submit"
                            id="kt_sign_in_submit"
                            className="btn btn-primary"
                            disabled={formik.isSubmitting || !formik.isValid}
                        >
                            {!loading && (
                                <span className="indicator-label">ادامه</span>
                            )}
                            {loading && (
                                <span
                                    className="indicator-progress"
                                    style={{ display: "block" }}
                                >
                                    درحال پردازش...
                                    <span className="spinner-border spinner-border-sm align-middle ms-2"></span>
                                </span>
                            )}
                        </button>
                    </div>
                </form>
                <div className="hidden md:block">
                    <div
                        className="h-full w-full bg-cover"
                        style={{
                            backgroundImage: `url(${toAbsoluteUrl(
                                "/media/logos/auth-bg.png"
                            )})`,
                        }}
                    >
                        <div className="flex justify-center items-center">
                            <img
                                src={`${toAbsoluteUrl(
                                    "/media/logos/saipa-image.png"
                                )}`}
                                alt="background"
                            />
                        </div>
                        <div className="flex justify-center items-center">
                            <label className="text-white font-yekan_bold text-2xl my-8">
                                داشبورد اختصاصی مدیریت مشتریان
                            </label>
                        </div>
                        <div className="relative flex justify-center items-center">
                            <img
                                src={`${toAbsoluteUrl(
                                    "/media/logos/shahin.png"
                                )}`}
                                alt="background"
                                className="z-10"
                            />
                            <img
                                src={`${toAbsoluteUrl(
                                    "/media/logos/demo_7403_none-2.png"
                                )}`}
                                alt="background"
                                // width={340}
                                className="absolute top-0 right-0 left-0 bottom-0"
                                // height={340}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;
