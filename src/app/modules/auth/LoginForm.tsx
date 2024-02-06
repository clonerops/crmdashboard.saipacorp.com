import { toAbsoluteUrl } from "../../../_cloner/helpers";
import Inputs from "./components/Inputs";
import Captcha from "./components/Captcha";
import { useGetCaptcha } from "./core/_hooks";
const LoginForm = (props: any) => {
  const { formik, loading } = props;
  const { data: captcha, refetch } = useGetCaptcha();

  return (
    <>
      <div className={"mb-4 space-y-4"}>
        <img
          src={`${toAbsoluteUrl("/media/logos/saipa-logo.png")}`}
          alt="background"
          className={"mx-auto"}
        />
        <p className={"text-[#1B3070] text-[18px] font-[800] leading-9"}>
          داشبورد اختصاصی مدیریت مشتریان
        </p>
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
      <div className="w-50 space-y-4">
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
          {!loading && <span className="indicator-label">ادامه</span>}
          {loading && (
            <span className="indicator-progress" style={{ display: "block" }}>
              درحال پردازش...
              <span className="spinner-border spinner-border-sm align-middle ms-2"></span>
            </span>
          )}
        </button>
      </div>
    </>
  );
};

export default LoginForm;
