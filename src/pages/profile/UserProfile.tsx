import BaseTitle from "@/shared/components/BaseTitle";
import { useEffect, useState } from "react";
import PartnerService from "@/services/api/partner";
import { UserDto } from "@/services/api/partner/partner.dto";
import { useTransform, motion, useSpring } from "framer-motion";
import { useForm, useWatch } from "react-hook-form";
import ProfileCard from "@/shared/components/profile/ProfileCard";

const cardRotation = 15;
const cardScale = 1.07;

export default function UserProfile() {
  const [data, setData] = useState<UserDto | null>(null);
  const xPcnt = useSpring(0, { stiffness: 100, damping: 10 });
  const yPcnt = useSpring(0, { stiffness: 100, damping: 10 });
  const scale = useSpring(1, { stiffness: 100, damping: 10 });
  const [update, setUpdate] = useState(false);
  const [cardColor, setCardColor] = useState("#ffffff");
  const [isOpen, setIsOpen] = useState(false);
  const toggleDropdown = () => setIsOpen((prev) => !prev);
  const [selectedBank, setSelectedBank] = useState<string | null>(null);

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
    reset,
  } = useForm({
    defaultValues: {
      bank: "",
      cardNumber: "",
      expiryDate: "",
      isCorporateCard: false,
      name: "",
      cvc: "",
      pw: "",
    },
  });

  const cardNumber = useWatch({ control, name: "cardNumber" });
  const bank = useWatch({ control, name: "bank" });

  useEffect(() => {
    const fetchData = async () => {
      const response = await PartnerService.getUser();
      setData(response);
    };
    fetchData();
  }, []);

  const onSubmit = (formData: any) => {
    console.log(formData);
  };

  return (
    <>
      <div className="flex flex-col h-full w-full">
        <BaseTitle text="프로필" />
        <div className="flex-1 md:p-16 flex flex-col md:flex-row">
          <div className="flex items-center justify-center flex-grow-[2] md:border md:rounded-s-md">
            <motion.div
              onMouseMove={handleMouseMove}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              style={{
                transformStyle: "preserve-3d",
                rotateX,
                rotateY,
                scale,
                backgroundColor: cardColor,
                color:
                  cardColor === "#ffffff" || cardColor === "#fee300"
                    ? "#000000"
                    : "#ffffff",
              }}
              className={`flex flex-col min-h-[96px] w-64 rounded-lg p-4 shadow-lg overflow-hidden group mb-6 md:mb-0`}
            >
              <ProfileCard
                name={data?.name}
                phone={data?.phone}
                role={data?.roleName}
                activatedAt={data?.activatedAt}
              />
            </motion.div>
          </div>
          <div className="flex items-center justify-center flex-grow-[8] pb-4 md:border md:rounded-e-md md:p-10">
            <div className="w-full mx-auto">
              <div className="flex flex-col md:flex-row gap-2 w-full mb-8">
                <div className="flex-1 flex flex-col gap-2">
                  <div>
                    <label
                      htmlFor="company"
                      className="block mb-1 text-sm font-medium text-gray-900"
                    >
                      이름
                    </label>
                    <input
                      type="text"
                      id="company"
                      disabled
                      value={data ? data.name : "-"}
                      aria-describedby="helper-text-explanation"
                      className="border disabled:text-gray-400 border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                      placeholder="ex)쏘카"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="pSeq"
                      className="block mb-1 text-sm font-medium text-gray-900"
                    >
                      휴대폰 번호
                    </label>
                    <input
                      type="text"
                      id="pSeq"
                      disabled
                      value={data ? data.phone : "-"}
                      className="border disabled:text-gray-400 border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                    />
                  </div>
                </div>

                <div className="flex-1 flex flex-col gap-2">
                  <div className="flex-1"></div>
                  <div>
                    <label
                      htmlFor="address"
                      className="block mb-1 text-sm font-medium text-gray-900"
                    >
                      역할
                    </label>
                    <input
                      type="text"
                      id="address"
                      disabled
                      value={data ? data.roleName : "-"}
                      className="border disabled:text-gray-400 border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
