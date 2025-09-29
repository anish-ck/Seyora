import React from "react";
import { useFormContext } from "react-hook-form";
import { z } from "zod";
import { indiaRegions, RegisterFormSchema } from "@/lib/constant";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Calendar1Icon } from "lucide-react";

interface City {
  id: number;
  name: string;
}

interface TripInformationFormProps {
  state: string;
  setState: (state: string) => void;
  citiesm: City[];
  setCities: (cities: City[]) => void;
}

const TripInformationForm: React.FC<TripInformationFormProps> = ({
  state,
  setState,
  citiesm,
  setCities,
}) => {
  const form = useFormContext<z.infer<typeof RegisterFormSchema>>();

  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-bold text-white mb-4 border-b-2 border-purple-500 pb-2">
        Trip Information
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
        {/* Trip Start */}
        <FormField
          control={form.control}
          name="tripStart"
          render={({ field }) => (
            <FormItem className="flex-1">
              <Label className="text-white text-xl font-bold">Trip Start</Label>
              <FormControl>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full flex justify-between py-4 border border-gray-700 bg-gray-900 rounded-md text-gray-400 z-10 text-left cursor-pointer"
                    >
                      {field.value
                        ? new Date(field.value).toLocaleDateString()
                        : "Select start date"}
                      <Calendar1Icon />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={field.value ? new Date(field.value) : undefined}
                      onSelect={(date) => field.onChange(date)}
                    />
                  </PopoverContent>
                </Popover>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Trip End */}
        <FormField
          control={form.control}
          name="tripEnd"
          render={({ field }) => (
            <FormItem className="flex-1">
              <Label className="text-white text-xl font-bold">Trip End</Label>
              <FormControl>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full flex justify-between py-4 border border-gray-700 bg-gray-900 rounded-md 
                           text-gray-400 z-10 text-left cursor-pointer"
                    >
                      {field.value
                        ? new Date(field.value).toLocaleDateString()
                        : "Select end date"}
                      <Calendar1Icon />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={field.value ? new Date(field.value) : undefined}
                      onSelect={(date) => field.onChange(date)}
                    />
                  </PopoverContent>
                </Popover>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Accommodation */}
        <FormField
          control={form.control}
          name="accomodation"
          render={({ field }) => (
            <FormItem className="md:col-span-2">
              <Label className="text-white text-xl font-bold">
                Accommodation
              </Label>
              <FormControl>
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger className="w-full cursor-pointer">
                    <SelectValue placeholder="Select accommodation" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="hotel">Hotel</SelectItem>
                    <SelectItem value="hostel">Hostel</SelectItem>
                    <SelectItem value="bnb">BnB</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Trip Purpose */}
        <FormField
          control={form.control}
          name="tripPurpose"
          render={({ field }) => (
            <FormItem className="md:col-span-2">
              <Label className="text-white text-xl font-bold">
                Trip Purpose
              </Label>
              <FormControl>
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger className="w-full cursor-pointer">
                    <SelectValue placeholder="Choose purpose" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="travel">Travel</SelectItem>
                    <SelectItem value="buisness">Business</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Trip Details */}
        <FormField
          control={form.control}
          name="tripDetails"
          render={({ field }) => (
            <FormItem className="md:col-span-2">
              <Label className="text-white text-xl font-bold">
                Trip Details
              </Label>
              <FormControl>
                <Textarea
                  placeholder="Enter trip details"
                  className="w-full py-4 border border-gray-700 bg-gray-900 rounded-md 
                     text-lg font-medium text-white placeholder:text-gray-400 z-10"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex gap-8 justify-between md:col-span-2">
          <FormField
            control={form.control}
            name="tripState"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel className="text-white text-xl font-bold">
                  TripState*
                </FormLabel>
                <FormControl>
                  <Select
                    onValueChange={(val) => {
                      setState(val);
                      setCities([]);
                      field.onChange(val);
                    }}
                  >
                    <SelectTrigger className="w-full cursor-pointer">
                      <SelectValue placeholder="select state Of trip" />
                    </SelectTrigger>
                    <SelectContent>
                      {indiaRegions.map((region, index) => {
                        return (
                          <SelectItem key={index} value={region.state_iso2}>
                            {region.state}
                          </SelectItem>
                        );
                      })}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="tripCity"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel className="text-white text-xl font-bold">
                  Select city*
                </FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange} value={field.value} >
                    <SelectTrigger className="w-full cursor-pointer">
                      <SelectValue placeholder="select city  for trip" />
                    </SelectTrigger>
                    <SelectContent>
                      {citiesm.map((value, index) => {
                        return (
                          <SelectItem key={index} value={value.name}>
                            {value.name}
                          </SelectItem>
                        );
                      })}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        {/* Health Info */}
        <FormField
          control={form.control}
          name="healthInfo"
          render={({ field }) => (
            <FormItem className="md:col-span-2">
              <Label className="text-white text-xl font-bold">
                Health Info
              </Label>
              <FormControl>
                <Textarea
                  placeholder="Enter health information"
                  className="w-full py-4 border border-gray-700 bg-gray-900 rounded-md 
                     text-lg font-medium text-white placeholder:text-gray-400 z-10"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
};

export default TripInformationForm;
