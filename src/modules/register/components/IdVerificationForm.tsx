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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const IdVerificationForm: React.FC = () => {
  const form = useFormContext<z.infer<typeof RegisterFormSchema>>();

  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-bold text-white mb-4 border-b-2 border-purple-500 pb-2">
        ID Verification
      </h2>
      <FormField
        control={form.control}
        name="idType"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-white text-xl font-bold">
              Select ID Type*
            </FormLabel>
            <FormControl>
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger className="w-full cursor-pointer">
                  <SelectValue placeholder="Choose Kyc verificatoin step" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="adhaarCard">Aadhaar Card</SelectItem>
                  <SelectItem value="panCard">PAN Card</SelectItem>
                </SelectContent>
              </Select>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      {form.watch("idType") === "adhaarCard" && (
        <FormField
          control={form.control}
          name="adhaarCardValue"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white text-xl font-bold">
                Aadhaar Card Number*
              </FormLabel>
              <FormControl>
                <Input
                  type="number"
                  autoComplete="off"
                  placeholder="Enter your Aadhaar number"
                  className="w-full py-6 border border-gray-700 bg-gray-900 rounded-md text-2xl font-medium text-white placeholder:text-gray-400 z-10 "
                  {...field}
                  onChange={(event) =>
                    field.onChange(Number(event.target.value))
                  }
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      )}

      {form.watch("idType") === "panCard" && (
        <div className="space-y-4">
          <Label className="text-white text-xl font-bold">
            PAN Card Details*
          </Label>
          <FormField
            control={form.control}
            name="panCardValue.panNo"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    autoComplete="off"
                    placeholder="Enter PAN number"
                    className="w-full py-6 border border-gray-700 hover:scale-102 bg-gray-900 rounded-md text-2xl font-medium text-white placeholder:text-gray-400 z-10"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="panCardValue.name"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    autoComplete="off"
                    placeholder="Name on PAN Card"
                    className="w-full py-6 border border-gray-700 hover:scale-102 bg-gray-900 rounded-md text-2xl font-medium text-white placeholder:text-gray-400 z-10"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="panCardValue.dateOfBirth"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    autoComplete="off"
                    placeholder="Date of Birth (DD/MM/YYYY)"
                    className="w-full py-6 border border-gray-700 hover:scale-102 bg-gray-900 rounded-md text-2xl font-medium text-white placeholder:text-gray-400 z-10"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      )}
    </div>
  );
};

export default IdVerificationForm;
