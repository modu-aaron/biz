import BaseTitle from "@/components/shared/BaseTitle";
import MainWrapper from "@/components/shared/MainWrapper";
import { MouseEventHandler, useEffect, useState } from "react";
import { FaCcVisa } from "react-icons/fa";
import PartnerService from "@/services/api/partner";
import { PartnerCardDto, PartnerDto } from "@/services/api/partner/partner.dto";
import { useTransform, motion, useSpring } from "framer-motion";
import { Controller, useForm } from "react-hook-form";

const cardRotation = 15;
const cardScale = 1.07;

export default function Partner() {
  const [data, setData] = useState<PartnerDto | null>(null);
  const xPcnt = useSpring(0, { stiffness: 100, damping: 10 });
  const yPcnt = useSpring(0, { stiffness: 100, damping: 10 });
  const scale = useSpring(1, { stiffness: 100, damping: 10 });

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

  useEffect(() => {
    const fetchData = async () => {
      const response = await PartnerService.getPartner();
      setData(response);
    };
    fetchData();
  }, []);

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

  const handleMouseMove: MouseEventHandler = (e) => {
    const { currentMouseX, currentMouseY, containerWidth, containerHeight } =
      getMousePosition(e);

    xPcnt.set(currentMouseX / containerWidth - 0.5);
    yPcnt.set(currentMouseY / containerHeight - 0.5);
  };

  const handleMouseEnter: MouseEventHandler = (e) => {
    scale.set(cardScale);
  };

  const handleMouseLeave: MouseEventHandler = (e) => {
    scale.set(1);
    xPcnt.set(0);
    yPcnt.set(0);
  };

  const { control, handleSubmit } = useForm({
    defaultValues: {
      cardNumber: "",
      expiryDate: "",
      isCorporateCard: false,
      birthDate: "",
    },
  });

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <MainWrapper>
      <div className="flex flex-col h-full w-full">
        <BaseTitle text="파트너상세" />
        <div className="flex-1 md:p-24 flex flex-col md:flex-row">
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
              }}
              className="flex flex-col h-64 w-96 md:h-96 md:w-64 rounded-xl bg-gradient-to-br p-4 shadow-lg overflow-hidden group"
            >
              <CardContent card={data ? data.partnerCard : null} />
            </motion.div>
          </div>
          <div className="flex items-center justify-center flex-grow-[8] md:border md:rounded-e-md md:p-10">
            <form className="w-full mx-auto">
              <div className="flex flex-col md:flex-row gap-4 w-full">
                <div className="flex-1 flex flex-col gap-2">
                  {/* 소속 */}
                  <div>
                    <label
                      htmlFor="company"
                      className="block mb-1 text-md font-bold text-gray-900"
                    >
                      소속
                    </label>
                    <input
                      type="string"
                      id="company"
                      disabled
                      value={data?.name}
                      aria-describedby="helper-text-explanation"
                      className="border disabled:text-gray-400 border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 "
                      placeholder="ex)쏘카"
                    />
                    <p
                      id="helper-text-explanation"
                      className="mt-2 text-sm text-gray-500 dark:text-gray-400"
                    >
                      여러분의 소속 정보입니다.
                    </p>
                  </div>

                  {/* 번호 */}
                  <div>
                    <label
                      htmlFor="pSeq"
                      className="block mb-1 text-md font-bold text-gray-900"
                    >
                      번호
                    </label>
                    <input
                      type="string"
                      id="pSeq"
                      disabled
                      value={data?.pSeq}
                      aria-describedby="helper-text-explanation"
                      className="border disabled:text-gray-400 border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 "
                    />
                  </div>
                </div>

                {/* Right Section: 주소 */}
                <div className="flex-1 flex flex-col gap-2">
                  {/* 빈 공간 */}
                  <div className="flex-1"></div>

                  {/* 주소 */}
                  <div>
                    <label
                      htmlFor="address"
                      className="block mb-1 text-md font-bold text-gray-900"
                    >
                      주소
                    </label>
                    <input
                      type="string"
                      id="address"
                      disabled
                      value={data?.address}
                      className="border disabled:text-gray-400 border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 "
                    />
                  </div>
                </div>
              </div>
              <div className="flex flex-col md:flex-row gap-4 w-full">
                <div className="flex-1 flex flex-col gap-2">
                  {/* 법인카드 여부 */}
                  <div>
                    <label
                      htmlFor="isCorporateCard"
                      className="block mb-1 text-md font-bold text-gray-900"
                    >
                      법인카드 여부
                    </label>
                    <Controller
                      name="isCorporateCard"
                      control={control}
                      render={({ field }) => (
                        <input
                          type="checkbox"
                          id="isCorporateCard"
                          {...field}
                          className="border border-gray-300 text-gray-900 text-sm rounded-lg block"
                        />
                      )}
                    />
                  </div>

                  {/* 카드번호 */}
                  <div>
                    <label
                      htmlFor="cardNumber"
                      className="block mb-1 text-md font-bold text-gray-900"
                    >
                      카드번호
                    </label>
                    <Controller
                      name="cardNumber"
                      control={control}
                      render={({ field }) => (
                        <input
                          type="text"
                          id="cardNumber"
                          {...field}
                          className="border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                        />
                      )}
                    />
                  </div>

                  {/* 유효기간 */}
                  <div>
                    <label
                      htmlFor="expiryDate"
                      className="block mb-1 text-md font-bold text-gray-900"
                    >
                      유효기간
                    </label>
                    <Controller
                      name="expiryDate"
                      control={control}
                      render={({ field }) => (
                        <input
                          type="text"
                          id="expiryDate"
                          {...field}
                          className="border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                        />
                      )}
                    />
                  </div>

                  {/* 생년월일 */}
                  <div>
                    <label
                      htmlFor="birthDate"
                      className="block mb-1 text-md font-bold text-gray-900"
                    >
                      생년월일
                    </label>
                    <Controller
                      name="birthDate"
                      control={control}
                      render={({ field }) => (
                        <input
                          type="date"
                          id="birthDate"
                          {...field}
                          className="border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                        />
                      )}
                    />
                  </div>
                </div>
              </div>
              <button
                type="submit"
                className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-lg"
              >
                저장
              </button>
            </form>
          </div>
        </div>
      </div>
    </MainWrapper>
  );
}

const CardContent = ({ card }: { card: PartnerCardDto | null }) => {
  return (
    <>
      <div className="relative border w-32 md:w-full aspect-square rounded-md overflow-hidden">
        <img
          src="https://ca.slack-edge.com/T04GJSZC2-U06DV3V3TL6-f19097d81964-512"
          alt="프로필"
          className="object-cover h-full md:object-fill"
        />
      </div>

      <div className="flex flex-col gap-0 mt-4">
        <h1 className="text-xl font-semibold tracking-tight leading-tight">
          {card ? card.number : "**** **** **** ****"}
        </h1>
        <p className="text-sm text-neutral-700 font-mono">MM/YY</p>
      </div>
      <div className="mt-auto flex justify-between items-center">
        <span className="text-[0.6rem] font-medium px-2 py-[3px] border-neutral-700 border-[1px] rounded-sm">
          SOCAR
        </span>
        <FaCcVisa size={28} color="#000000" className="opacity-70" />
      </div>
    </>
  );
};
