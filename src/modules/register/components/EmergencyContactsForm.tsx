import React from "react";
import { useFormContext } from "react-hook-form";
import { z } from "zod";
import { RegisterFormSchema } from "@/lib/constant";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

const EmergencyContactsForm: React.FC = () => {
  const form = useFormContext<z.infer<typeof RegisterFormSchema>>();

  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-bold text-white mb-4 border-b-2 border-purple-500 pb-2">
        Emergency Contacts
      </h2>
      <div className="space-y-4 border border-gray-700 p-6 rounded-lg">
        <Label className="text-white text-xl font-bold">
          Emergency Contact One*
        </Label>

        <Input
          autoComplete="off"
          placeholder="Phone Number"
          className="w-full py-6 border border-gray-700 hover:scale-102 bg-gray-900 rounded-md text-2xl font-medium text-white placeholder:text-gray-400 z-10"
          {...form.register("emergencyContactOne.phoneNumber")}
        />

        <Input
          autoComplete="off"
          placeholder="Name"
          className="w-full py-6 border border-gray-700 hover:scale-102 bg-gray-900 rounded-md text-2xl font-medium text-white placeholder:text-gray-400 z-10"
          {...form.register("emergencyContactOne.name")}
        />

        <Input
          autoComplete="off"
          placeholder="Relation"
          className="w-full py-6 border border-gray-700 hover:scale-102 bg-gray-900 rounded-md text-2xl font-medium text-white placeholder:text-gray-400 z-10"
          {...form.register("emergencyContactOne.relation")}
        />
      </div>

      {/* Emergency Contact Two (optional) */}
      <div className="space-y-4 mt-6 border border-gray-700 p-6 rounded-lg">
        <Label className="text-white text-xl font-bold">
          Emergency Contact Two (Optional)
        </Label>

        <Input
          autoComplete="off"
          placeholder="Phone Number"
          className="w-full py-6 border border-gray-700 hover:scale-102 bg-gray-900 rounded-md text-2xl font-medium text-white placeholder:text-gray-400 z-10"
          {...form.register("emergencyContactTwo.phoneNumber")}
        />

        <Input
          autoComplete="off"
          placeholder="Name"
          className="w-full py-6 border border-gray-700 hover:scale-102 bg-gray-900 rounded-md text-2xl font-medium text-white placeholder:text-gray-400 z-10"
          {...form.register("emergencyContactTwo.name")}
        />

        <Input
          autoComplete="off"
          placeholder="Relation"
          className="w-full py-6 border border-gray-700 hover:scale-102 bg-gray-900 rounded-md text-2xl font-medium text-white placeholder:text-gray-400 z-10"
          {...form.register("emergencyContactTwo.relation")}
        />
      </div>
    </div>
  );
};

export default EmergencyContactsForm;
