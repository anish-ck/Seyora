"use client";
import React, { useEffect, useState } from "react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterFormSchema } from "@/lib/constant";
import { Form } from "@/components/ui/form";
import Image from "next/image";
import { IdCardIcon } from "lucide-react";
import { trpc } from "@/trpc/client";
import { useRef } from "react";
import { ProgressPopover } from "@/modules/register/view/showPop";
import PersonalInfoForm from "@/modules/register/components/PersonalInfoForm";
import IdVerificationForm from "@/modules/register/components/IdVerificationForm";
import EmergencyContactsForm from "@/modules/register/components/EmergencyContactsForm";
import TripInformationForm from "@/modules/register/components/TripInformationForm";
type City = {
  id: number;
  name: string;
};

const Page = () => {
  const [date, setDate] = useState<Date>();
  const [state, setState] = useState("");
  const [citiesm, setCities] = useState<City[]>([]);
  const [error, setError] = useState("");
  const [currentRegistrationStp, setcurrentRegistrationStp] = useState(0);
  const [ipfsUrl, setIpfsURl] = useState("");
  const [IsOpen, setPopup] = useState(false);
  const form = useForm<z.infer<typeof RegisterFormSchema>>({
    resolver: zodResolver(RegisterFormSchema),
    defaultValues: {
      fullName: "nnn",
      DOB: new Date(),
      idType: "panCard", // Default to a valid enum value
      adhaarCardValue: 997765659,
      panCardValue: {
        panNo: "",
        dateOfBirth: "01/01/",
        name: "HASINA ",
      },
      phoneNumber: "8888888888",
      email: "mrayan1qaz@gmail.com",
      emergencyContactOne: {
        phoneNumber: "9998888679",
        name: "iiiiii",
        relation: "999999",
      },
      emergencyContactTwo: {
        phoneNumber: "888889898788",
        name: "999999999",
        relation: "uuuuuuuuu",
      },
      tripStart: new Date(),
      tripEnd: new Date(),
      accomodation: "",
      tripPurpose: "travel", // Default to a valid enum value
      tripDetails: "jjjjjjjj",
      tripState: "jj",
      tripCity: "jjj",
      healthInfo: "nnnn",
    },
  });
  const uploadToPinata = trpc.registerationRouter.uploadJson.useMutation();
  const emailExistInDatabase =
    trpc.registerationRouter.checkEmailInDatabase.useMutation();
  const createCustodialWallet =
    trpc.registerationRouter.createWallet.useMutation();
  const createAnNftnAddress =
    trpc.registerationRouter.creditAnNftInHisWallet.useMutation();
  const userWalletAddressInDataBase =
    trpc.registerationRouter.storeInDAtaBase.useMutation();
  const verifyPanCard = trpc.registerationRouter.veriPanCard.useMutation();
  const requestForAdhaarOTP =
    trpc.registerationRouter.verifyAdhaaarCard.useMutation();
  // const verifyUserByGivingOtp =
  //   trpc.registerationRouter.sendAdhaarOtpForVerification.useMutation();
  const { data: citiesData } = trpc.tripRegister.getCities.useQuery(
    { state_iso2: state },
    { enabled: !!state } // only run when state is set
  );

  useEffect(() => {
    if (citiesData) {
      setCities(citiesData);
    }
  }, [citiesData]);

  const isAbortingRef = useRef(false);

  async function handleSubmit(values: z.infer<typeof RegisterFormSchema>) {
    isAbortingRef.current = false; // Reset abort flag for new submission

    let walletAddress: string | undefined;
    try {
      setPopup(true);
      // Step 0: Validating your details (Initial check and ID verification)
      if (isAbortingRef.current) return;
      setcurrentRegistrationStp(1); // "Validating your details"
      console.log("checking user exist in database or not");
      const isEmailExistInData = await emailExistInDatabase.mutateAsync({
        email: values.email,
      });
      if (isEmailExistInData) {
        setError("Email already used by another user");
        return; // Exit on error
      }

      if (isAbortingRef.current) return;

      if (values.idType === "adhaarCard") {
        try {
          setcurrentRegistrationStp(2); // "Sending Aadhaar OTP"
          const resultData = await requestForAdhaarOTP.mutateAsync({
            adhaarNumber: values.adhaarCardValue!,
          });
          if (resultData.message === "Invalid Aadhaar Card") {
            setError(resultData.message);
            return;
          }
        } catch (error: any) {
          setError(error.message);
          console.log("failed due to", error.message);
          return; // Abort if Aadhaar verification fails
        }
      } else if (values.idType === "panCard") {
        setcurrentRegistrationStp(2); // "Sending Aadhaar OTP"
        setTimeout(() => {
          console.log("rrr");
        }, 4000);
        if (isAbortingRef.current) return;
        // try {
        //   // PAN Card verification is considered part of "Validating your details" (Step 0)
        //   if (!values.panCardValue) {
        //     setError("PAN card details are incomplete.");
        //     return;
        //   }
        //   const isPanValid = await verifyPanCard.mutateAsync({
        //     panNo: values.panCardValue.panNo!,
        //     dob: values.panCardValue.dateOfBirth!,
        //     name: values.panCardValue.name!,
        //   });
        //   if (isPanValid.status !== "VALID") {
        //     setError(`ddd${isPanValid.message}`);
        //     console.log("PAN card verification failed:", isPanValid.message)
        //     return;
        //   }
        // } catch (error: any) {
        //   setError(error.message || "PAN card verification failed.");
        //   console.log("PAN verification failed due to", error.message);
        //   return; // Abort if PAN verification fails
        // }
      }
      if (isAbortingRef.current) return;
      setcurrentRegistrationStp(3); // "Uploading docs securely"
      console.log("uploading to Pinata...");
      const { cid, url } = await uploadToPinata.mutateAsync({
        data: values,
      });
      setIpfsURl(url);
      console.log("Pinata URL:", url, "CID:", cid);

      // Step 4: Creating Custodial Wallet
      if (isAbortingRef.current) return;
      setcurrentRegistrationStp(4); // "Creating Custodial Wallet"
      console.log("creating wallet on sepolia...");
      try {
        const { address } = await createCustodialWallet.mutateAsync({
          email: values.email,
        });
        walletAddress = address;
        console.log("wallet created:", address);

        if (isAbortingRef.current) return;
        try {
          // Store wallet address in DB - this is part of wallet creation/finalization
          const tripduration: number =
            values.tripStart.getDay() - values.tripEnd.getDay();
          await userWalletAddressInDataBase.mutateAsync({
            email: values.email,
            tripduration,
            cid,
            tripEnd: values.tripEnd.getDay(),
            location: `${values.tripState}, ${values.tripCity}`,
          });
        } catch (err: any) {
          console.error("Failed to store wallet in DB:", err.message);
          setError("Could not save wallet address to database");
          return; // stop further steps
        }
      } catch (err: any) {
        console.error("Wallet creation failed:", err.message);
        setError("Failed to create wallet");
        return;
      }

      // Step 5: Minting NFT Tourist ID
      if (isAbortingRef.current) return;
      const startTimeInUnix = Math.floor(values.tripStart.getTime() / 1000);
      const endTimeInUnix = Math.floor(values.tripEnd.getTime() / 1000);
      setcurrentRegistrationStp(5); // "Minting NFT Tourist ID"
      const nftTx = await createAnNftnAddress.mutateAsync({
        walletAddress,
        startTime: startTimeInUnix,
        endTime: endTimeInUnix,
        ipfsDataUri: ipfsUrl,
      });
      console.log("NFT minted:", nftTx);
      setcurrentRegistrationStp(6); // "Finalizing trip data"
      // Step 6: Finalizing trip data
      if (isAbortingRef.current) return;
      setcurrentRegistrationStp(7); // "Completed!"
    } catch (error: any) {
      console.error("handleSubmit error:", error.message);
      setError(error.message || "Something went wrong");
    }
  }

  const handleAbortProcess = () => {
    console.log("Registration process aborted by user.");
    isAbortingRef.current = true; // Set abort flag
    setPopup(false); // Reset to initial step
    setError(""); // Clear any error messages
    setIpfsURl(""); // Clear IPFS URL if set
  };

  return (
    <div className="min-h-screen w-full flex p-20 flex-col bg-black/90">
      <div className="mb-10 text-center flex items-center justify-center space-x-4">
        <h1 className="text-purple-600 text-4xl font-extrabold">
          Get your tourist Identity
        </h1>
        <IdCardIcon className="w-16 h-16 text-white" /> {/* white icon */}
      </div>

      {/* This container now aligns items to the top */}
      <div className="flex items-start justify-between relative px-24 pl-10">
        {/* Left Column: Form */}
        <div className="w-2/3 py-10 relative">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="space-y-12"
            >
              {/* Personal Information Section */}
              <PersonalInfoForm date={date} setDate={setDate} />
              {/* ID Verification Section */}
              <IdVerificationForm />

              {/* Emergency Contacts Section */}
              <EmergencyContactsForm />

              {/* Trip Details Section */}
              <TripInformationForm
                state={state}
                setState={setState}
                citiesm={citiesm}
                setCities={setCities}
              />

              <div className="w-full mt-10 flex mb-72 justify-end">
                <Button
                  type="submit"
                  className="cursor-pointer w-[300px] py-4 text-2xl font-medium text-black 
             bg-white rounded-md
             hover:bg-purple-600 hover:text-white hover:scale-102"
                >
                  Submit
                </Button>
              </div>
            </form>
          </Form>
        </div>

        {/* Right Column: Image */}
        <div className="w-1/3 rounded-md border-3 sticky ml-12  top-16 right-0 z-index-10  border-gray-700">
          <Image
            src="/identityCard.png"
            alt="identity"
            height={500}
            width={400}
            className=" right-0 top-0"
          />
        </div>
        <ProgressPopover
          currentStep={currentRegistrationStp}
          isOpen={IsOpen}
          error={error}
          qrCodeUrl={ipfsUrl}
          onOpenChange={setPopup}
          onAbort={handleAbortProcess}
        />
      </div>
    </div>
  );
};

export default Page;
