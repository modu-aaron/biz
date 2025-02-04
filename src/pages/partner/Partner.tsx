import BaseTitle from "@/shared/components/BaseTitle";
import { useEffect, useState } from "react";
import PartnerService from "@/services/api/partner";
import { PartnerDto } from "@/services/api/partner/partner.dto";
import { useTransform, motion, useSpring } from "framer-motion";
import { useForm, useWatch } from "react-hook-form";
import { companyLogo } from "@/assets/CompanyLogos";
import { CARD_BACKGROUND_COLOR } from "@/enums";
import { Company } from "@/types/payment";
import InputField from "@/shared/components/InputField";
import Card from "@/shared/components/partner/Card";
import Error from "@/pages/Error";

const cardRotation = 15;
const cardScale = 1.07;

export default function Partner() {
  const [data, setData] = useState<PartnerDto | null>(null);
  const xPcnt = useSpring(0, { stiffness: 100, damping: 10 });
  const yPcnt = useSpring(0, { stiffness: 100, damping: 10 });
  const scale = useSpring(1, { stiffness: 100, damping: 10 });
  const [update, setUpdate] = useState(false);
  const [cardColor, setCardColor] = useState("#ffffff");
  const [isOpen, setIsOpen] = useState(false);
  const [selectedBank, setSelectedBank] = useState<string | null>(null);
  const toggleDropdown = () => setIsOpen((prev) => !prev);

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
      const response = await PartnerService.getPartner();
      setData(response);
      if (response.partnerCard?.number) {
        setValue("cardNumber", response.partnerCard.number);
      }
    };
    fetchData();
  }, [setValue, reset]);

  const onSubmit = (formData: any) => {
    console.log(formData);
  };

  if (!data) return <Error />;

  return (
    <>
      <div className="flex flex-col h-full w-full">
        <BaseTitle text="파트너상세" />
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
                backgroundColor: cardColor,
                color:
                  cardColor === "#ffffff" || cardColor === "#fee300"
                    ? "#000000"
                    : "#ffffff",
              }}
              className={`flex flex-col h-64 w-96 md:h-96 md:w-64 rounded-lg p-4 shadow-lg overflow-hidden group mb-6 md:mb-0`}
            >
              <Card cardNumber={cardNumber} />
            </motion.div>
          </div>
          <div className="flex items-center justify-center flex-grow-[8] pb-4 md:border md:rounded-md md:p-10">
            <div className="w-full mx-auto">
              <div className="flex flex-col md:flex-row gap-4 w-full mb-8">
                <div className="flex-1 flex flex-col gap-2">
                  {/* 소속 */}
                  <div>
                    <label
                      htmlFor="company"
                      className="block mb-1 text-sm font-medium text-gray-900"
                    >
                      소속
                    </label>
                    <input
                      type="text"
                      id="company"
                      disabled
                      value={data.name || "-"}
                      aria-describedby="helper-text-explanation"
                      className="border disabled:text-gray-400 border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                      placeholder="ex)쏘카"
                    />
                  </div>

                  {/* 번호 */}
                  <div>
                    <label
                      htmlFor="pSeq"
                      className="block mb-1 text-sm font-medium text-gray-900"
                    >
                      번호
                    </label>
                    <input
                      type="text"
                      id="pSeq"
                      disabled
                      value={data.pSeq || "-"}
                      className="border disabled:text-gray-400 border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                    />
                  </div>
                </div>

                {/* Right Section: 주소 */}
                <div className="flex-1 flex flex-col gap-2">
                  <div className="flex-1"></div>
                  <div>
                    <label
                      htmlFor="address"
                      className="block mb-1 text-sm font-medium text-gray-900"
                    >
                      주소
                    </label>
                    <input
                      type="text"
                      id="address"
                      disabled
                      value={data.address || "-"}
                      className="border disabled:text-gray-400 border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                    />
                  </div>
                </div>
              </div>
              {!update && (
                <div className="flex justify-end mt-6">
                  <button
                    className="bg-[#0078ff] text-white text-sm py-2 px-4 rounded-lg"
                    onClick={() => setUpdate(!update)}
                  >
                    {data.partnerCard ? "카드 변경하기" : "카드 등록하기"}
                  </button>
                </div>
              )}
              {update && (
                <form onSubmit={handleSubmit(onSubmit)}>
                  <hr className="py-4" />
                  <div className="grid md:grid-cols-2 gap-x-4 w-full">
                    <div className="flex flex-col mt-4">
                      <label
                        htmlFor="bank"
                        className="block mb-1 text-sm font-medium text-gray-900"
                      >
                        은행
                      </label>
                      <div className="relative w-full">
                        <button
                          type="button"
                          onClick={toggleDropdown}
                          className="flex items-center justify-between w-full py-2.5 px-4 text-sm font-medium text-center text-gray-900 border rounded-md"
                        >
                          {selectedBank ? (
                            <span className="flex-shrink-1 flex gap-3 items-center justify-center">
                              {companyLogo[selectedBank as Company]}
                              <p>{selectedBank}</p>
                            </span>
                          ) : (
                            <span>은행을 선택해주세요</span>
                          )}
                          <svg
                            className="w-2.5 h-2.5 ms-2.5"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 10 6"
                          >
                            <path
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="m1 1 4 4 4-4"
                            />
                          </svg>
                        </button>

                        {isOpen && (
                          <div className="absolute mt-2 z-20 bg-white divide-y divide-gray-100 rounded-lg shadow w-full">
                            <ul className="py-2 text-sm text-gray-700">
                              {Object.entries(companyLogo).map(
                                ([cardName, LogoComponent], index) => (
                                  <li key={index}>
                                    <button
                                      type="button"
                                      onClick={() => {
                                        setSelectedBank(cardName); // 선택된 은행 설정
                                        setIsOpen(false);
                                        setCardColor(
                                          CARD_BACKGROUND_COLOR[
                                            cardName as Company
                                          ]
                                        );
                                      }}
                                      className="inline-flex items-center gap-2 px-4 py-2 w-full text-sm text-gray-700 hover:bg-gray-100"
                                    >
                                      <span className="flex-shrink-0">
                                        {LogoComponent}
                                      </span>
                                      <span>{cardName}</span>
                                    </button>
                                  </li>
                                )
                              )}
                            </ul>
                          </div>
                        )}
                      </div>
                    </div>
                    <InputField
                      label="카드번호"
                      id="cardNumber"
                      placeholder="16자리를 입력해주세요"
                      register={register}
                      required={true}
                      error={errors.cardNumber && "카드번호는 필수입니다."}
                      className="mt-2"
                    />

                    <InputField
                      label="유효기간"
                      id="expiryDate"
                      placeholder="MM/YY"
                      register={register}
                      required={true}
                      error={errors.expiryDate && "유효기간은 필수입니다."}
                      className="mt-2 w-1/2"
                    />

                    <InputField
                      label="CVC"
                      id="cvc"
                      placeholder="CVC"
                      register={register}
                      required={true}
                      className="mt-2 w-1/2"
                    />

                    <InputField
                      label="비밀번호 앞 2자리"
                      id="pw"
                      placeholder="비밀번호 앞 2자리"
                      register={register}
                      required={true}
                      className="mt-2"
                    />

                    <InputField
                      label="이름 (선택)"
                      id="name"
                      placeholder="소유자 이름을 입력해주세요"
                      register={register}
                      required={false}
                      className="mt-2"
                    />
                  </div>

                  <div className="flex justify-end mt-6 gap-2">
                    <button
                      onClick={() => {
                        setSelectedBank(null);
                        setCardColor("#ffffff");
                        setUpdate(false);
                      }}
                      className="bg-gray-400 text-white text-sm py-2 px-4 rounded-lg"
                    >
                      취소
                    </button>
                    <button
                      type="submit"
                      className="bg-[#0078ff] text-white text-sm py-2 px-4 rounded-lg"
                    >
                      저장
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
