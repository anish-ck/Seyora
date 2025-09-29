import React from "react";
import { useFormContext } from "react-hook-form";
import { z } from "zod";
import { RegisterFormSchema } from "@/lib/constant";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";

interface PersonalInfoFormProps {
  date: Date | undefined;
  setDate: (date: Date | undefined) => void;
}

const PersonalInfoForm: React.FC<PersonalInfoFormProps> = ({
  date,
  setDate,
}) => {
  const form = useFormContext<z.infer<typeof RegisterFormSchema>>();

  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-bold text-white mb-4 border-b-2 border-purple-500 pb-2">
        Personal Information
      </h2>
      <FormField
        control={form.control}
        name="fullName"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-white text-xl font-bold mb-2">
              Full Name*
            </FormLabel>
            <FormControl>
              <Input
                autoComplete="off"
                placeholder="Enter fullName"
                className="w-full py-6 border border-gray-700 bg-gray-900 rounded-md text-2xl font-medium text-white placeholder:text-gray-400 hover:scale-102"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="phoneNumber"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-white text-xl font-bold">
              Phone No*
            </FormLabel>
            <FormControl>
              <Input
                autoComplete="off"
                placeholder="Enter PhoneNo"
                className="w-full py-6 border border-gray-700 bg-gray-900 rounded-md text-2xl font-medium text-white placeholder:text-gray-400 hover:scale-102"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="email"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-white text-xl font-bold">
              Email*
            </FormLabel>
            <FormControl>
              <Input
                autoComplete="off"
                placeholder="Enter @gmail.com"
                className="w-full py-6 border border-gray-700 bg-gray-900 rounded-md text-2xl font-medium text-white placeholder:text-gray-400 hover:scale-102"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="DOB"
        render={({ field }) => (
          <FormItem className="">
            <FormLabel className="text-white text-xl font-bold">
              Date of birth*
            </FormLabel>
            <FormControl>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-[200px] justify-start text-left font-normal cursor-pointer"
                  >
                    {date ? format(date, "PPP") : "Pick a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    captionLayout="dropdown"
                  />
                </PopoverContent>
              </Popover>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default PersonalInfoForm;
