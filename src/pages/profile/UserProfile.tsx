import BaseTitle from "@/shared/components/BaseTitle";
import { useEffect, useState } from "react";
import partnerService from "@/services/api/partner";
import { UserDto } from "@/services/api/partner/partner.dto";
import { useTransform, motion, useSpring } from "framer-motion";
import { useForm, useWatch } from "react-hook-form";
import ProfileCard from "@/shared/components/profile/ProfileCard";
import InputField from "@/shared/components/InputField";
import Error from "@/pages/Error";
import { toast } from "react-toastify";

interface FormData {
  name: string;
  phone: string;
}

const cardRotation = 15;
const cardScale = 1.07;

export default function UserProfile() {
  const [data, setData] = useState<UserDto | null>(null);
  const xPcnt = useSpring(0, { stiffness: 100, damping: 10 });
  const yPcnt = useSpring(0, { stiffness: 100, damping: 10 });
  const scale = useSpring(1, { stiffness: 100, damping: 10 });
  const [update, setUpdate] = useState(false);

  const rotateX = useTransform(
    yPcnt,
    [-0.5, 0.5],
    [`-${cardRotation}deg`, `${cardRotation}deg`]
  );
  const rotateY = useTransform(
    xPcnt,
    [-0.5, 0.5],
    [`-${cardRotation}deg`, `${cardRotation}deg`]
  );

  const getMousePosition = (e: React.MouseEvent<Element, MouseEvent>) => {
    const { width, height, left, top } =
      e.currentTarget.getBoundingClientRect();

    const currentMouseX = e.clientX - left;
    const currentMouseY = e.clientY - top;

    return {
      currentMouseX,
      currentMouseY,
      containerWidth: width,
      containerHeight: height,
    };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    const { currentMouseX, currentMouseY, containerWidth, containerHeight } =
      getMousePosition(e);

    xPcnt.set(currentMouseX / containerWidth - 0.5);
    yPcnt.set(currentMouseY / containerHeight - 0.5);
  };

  const handleMouseEnter = () => {
    scale.set(cardScale);
  };

  const handleMouseLeave = () => {
    scale.set(1);
    xPcnt.set(0);
    yPcnt.set(0);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    control,
  } = useForm({
    defaultValues: {
      name: "",
      phone: "",
      role: "",
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      const response = await partnerService.getUser();
      setData(response);
      setValue("name", response.name);
      setValue("phone", response.phone);
      setValue("role", response.roleName);
    };
    fetchData();
  }, [setValue]);

  const name = useWatch({ control, name: "name" });
  const phone = useWatch({ control, name: "phone" });

  if (!data) return <Error />;

  const handleUpdate = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setUpdate(true);
  };

  const handleCancel = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setValue("name", data.name);
    setValue("phone", data.phone);
    setUpdate(false);
  };

  const onSubmit = async (formData: FormData) => {
    await partnerService.updateUser(formData);
    await partnerService.getUser();
    setUpdate(false);
    toast.success("프로필 수정완료");
  };

  return (
    <>
      <div className="flex flex-col h-full w-full">
        <BaseTitle text="프로필" />
        <div className="flex-1 md:p-16 flex flex-col md:flex-row">
          <div className="flex items-center justify-center flex-grow-[2]">
            <motion.div
              onMouseMove={handleMouseMove}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              style={{
                transformStyle: "preserve-3d",
                rotateX,
                rotateY,
                scale,
              }}
              className={`flex flex-col min-h-[96px] w-full md:w-64  rounded-lg p-4 shadow-lg overflow-hidden group mb-6 md:mb-0`}
            >
              <ProfileCard
                name={name}
                phone={phone}
                role={data.roleName}
                activatedAt={data.activatedAt}
              />
            </motion.div>
          </div>
          <div className="flex items-start md:items-center justify-center flex-grow-[8] md:p-10">
            <form className="w-full mx-auto">
              <div className="flex flex-col md:flex-row md:gap-4 w-full mb-4">
                <div className="flex-1 flex flex-col gap-2">
                  <InputField
                    label="이름"
                    id="name"
                    placeholder="이름을 입력해주세요."
                    register={register}
                    required={true}
                    disabled={!update}
                    className="mt-2"
                  />
                  <InputField
                    label="전화번호"
                    id="phone"
                    placeholder="전화번호를 입력해주세요."
                    register={register}
                    required={true}
                    disabled={!update}
                    className="mt-2"
                  />
                </div>
                <div className="flex-1 flex flex-col gap-2">
                  <div className="flex-1"></div>
                  <div>
                    <InputField
                      label="역할"
                      id="role"
                      register={register}
                      required={false}
                      disabled
                      className="mt-2"
                    />
                  </div>
                </div>
              </div>
              {!update ? (
                <div className="flex justify-end">
                  <button
                    className="bg-[#0078ff] text-white text-sm py-[10px] px-5 rounded-lg"
                    onClick={handleUpdate}
                  >
                    수정하기
                  </button>
                </div>
              ) : (
                <div className="flex justify-end gap-3">
                  <button
                    className="bg-gray-400 text-white text-sm py-[10px] px-5 rounded-lg"
                    onClick={handleCancel}
                  >
                    취소
                  </button>
                  <button
                    className="bg-[#0078ff] text-white text-sm py-[10px] px-5 rounded-lg"
                    onClick={handleSubmit(onSubmit)}
                  >
                    확인
                  </button>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
