import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import bizLogo from "@/assets/images/biz-logo.png";
import { useSpinner } from "@/store/useSpinner";
import Spinner from "@/shared/components/Spinner";
import { toast } from "react-toastify";
import { useAuth } from "@/store/useAuth";
import InputField from "@/shared/components/InputField";

const SignIn = () => {
  const { handleSubmit, register, watch } = useForm();
  const { isSpinnerOpen } = useSpinner();
  const { signIn, getMenus } = useAuth();
  const navigate = useNavigate();

  const id = watch("id");
  const pw = watch("pw");

  const onSubmit = async () => {
    try {
      await signIn({
        email: id,
        password: pw,
      });
      await getMenus();
      navigate("/ticket");
    } catch (e: unknown) {
      console.log(e);
    }
  };

  return (
    <>
      <main className="flex items-center justify-center h-[100dvh] relative">
        {isSpinnerOpen && <Spinner />}
        <div className="flex flex-col md:flex-row h-full w-full">
          <div className="flex-grow-[3] md:flex-grow-[6] bg-center bg-cover bg-no-repeat bg-coverImg" />
          <div className="flex-grow-[7] md:flex-grow-[4] overflow-hidden">
            <div className="h-full relative">
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="absolute w-2/3 top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2"
              >
                <div className="flex flex-col gap-2">
                  <img className="mb-4" src={bizLogo} />
                  <InputField
                    label="아이디"
                    type="email"
                    id="id"
                    placeholder="아이디를 입력해주세요"
                    register={register}
                    required={true}
                  />
                  <InputField
                    label="비밀번호"
                    id="pw"
                    type="password"
                    placeholder="비밀번호를 입력해주세요"
                    register={register}
                    required={true}
                  />
                  <button className="px-6 py-2 mt-3 bg-[#0078ff] text-white rounded-sm">
                    로그인
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default SignIn;
