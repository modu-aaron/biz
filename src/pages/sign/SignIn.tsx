import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import bizLogo from "../../assets/images/biz-logo.png";
import { useSpinner } from "../../store/useSpinner";
import Spinner from "../../components/shared/Spinner";
import { toast } from "react-toastify";
import { useAuth } from "../../store/useAuth";

const SignIn = () => {
  const { handleSubmit, register, watch } = useForm();
  const { isSpinnerOpen, setIsSpinner } = useSpinner();
  const { signIn, getMenus } = useAuth();
  const navigate = useNavigate();

  const id = watch("id");
  const pw = watch("pw");

  const onSubmit = async () => {
    try {
      setIsSpinner(true);
      await signIn({
        email: id,
        password: pw,
      });
      //TODO: 추후 router guard로 변경
      await getMenus();
      setIsSpinner(false);
      navigate("/ticket");
    } catch (e: unknown) {
      const error = e as Error;
      toast(error.message);
    }
  };

  return (
    <main className="flex items-center justify-center h-[100dvh] relative">
      {isSpinnerOpen && <Spinner />}
      <div className="flex flex-col md:flex-row h-full w-full">
        <div className="flex-grow-[3] md:flex-grow-[6] bg-center bg-cover bg-no-repeat bg-coverImg" />
        <div className="flex-grow-[7] md:flex-grow-[4] overflow-hidden">
          <div className="h-full relative">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2"
            >
              <div className="flex flex-col gap-2">
                <img className="mb-4" src={bizLogo} />
                <input
                  className="pl-2 pr-8 py-2 rounded-sm border border-neutral-300/50"
                  type="text"
                  placeholder="아이디를 입력해주세요"
                  defaultValue={""}
                  {...register("id", { required: true })}
                />
                <input
                  className="pl-2 pr-8 py-2 rounded-sm border border-neutral-300/50"
                  type="password"
                  placeholder="비밀번호를 입력해주세요"
                  defaultValue={""}
                  {...register("pw", { required: true })}
                />
                <button className="px-6 py-2 mt-3 bg-[#0099ff] text-white rounded-sm">
                  로그인
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
};

export default SignIn;
