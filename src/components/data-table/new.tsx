"use client";

// form
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
// ui
import { Button } from "@/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogClose,
  DialogDescription,
  DialogHeader,
} from "@/ui/dialog";
import { Input } from "@/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/ui/form";
// icons
import { PlusIcon } from "lucide-react";
// react
import { useState, useEffect } from "react";
// actions
import { addOrg } from "@/actions/db-actions";
// lib
import { parsePhone } from "@/lib/utils";

// schemas
const form1Schema = z.object({
  name: z.string().min(2, { message: "Please enter a name" }),
  type: z.enum(["Business", "NonProfit", "Gov"]),
});
const form2Schema = z.object({
  website: z.string().regex(/[\w\d\-]+\.[\w\d\-\.]+/, {
    message: 'Please enter a valid url in the form "example.com"',
  }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  phone: z.string().regex(/^\d{10}$/, {
    message: "Please enter a valid 10-digit phone number",
  }),
  address: z.string().min(2, { message: "Please enter an address" }),
  notes: z.string(),
});
const form3Schema = z.object({
  contactFirstName: z.string().min(2, { message: "Please enter a first name" }),
  contactLastName: z.string().min(2, { message: "Please enter a last name" }),
  contactEmail: z
    .string()
    .email({ message: "Please enter a valid email address" }),
  contactPhone: z.string().regex(/^\d{10}$/, {
    message: "Please enter a valid 10-digit phone number",
  }),
});

export function New() {
  // state
  const [formPart, setFormPart] = useState(1);
  const [formPart1Result, setFormPart1Result] = useState<z.infer<
    typeof form1Schema
  > | null>(null);
  const [formPart2Result, setFormPart2Result] = useState<z.infer<
    typeof form2Schema
  > | null>(null);
  const [formPart3Result, setFormPart3Result] = useState<z.infer<
    typeof form3Schema
  > | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // forms
  const form1 = useForm<z.infer<typeof form1Schema>>({
    resolver: zodResolver(form1Schema),
    defaultValues: {
      name: "",
      type: "Business",
    },
  });
  const form2 = useForm<z.infer<typeof form2Schema>>({
    resolver: zodResolver(form2Schema),
    defaultValues: {
      website: "",
      email: "",
      phone: "",
      address: "",
      notes: "",
    },
  });
  const form3 = useForm<z.infer<typeof form3Schema>>({
    resolver: zodResolver(form3Schema),
    defaultValues: {
      contactFirstName: "",
      contactLastName: "",
      contactEmail: "",
      contactPhone: "",
    },
  });

  // handlers
  function onForm1Submit(values: z.infer<typeof form1Schema>) {
    setFormPart1Result(values);
    setFormPart(2);
  }
  function onForm2Back() {
    setFormPart(1);
  }
  function onForm2Submit(values: z.infer<typeof form2Schema>) {
    setFormPart2Result(values);
    setFormPart(3);
  }
  function onForm3Back(e: React.MouseEvent<HTMLButtonElement>) {
    setFormPart(2);
  }
  async function onForm3Submit(values: z.infer<typeof form3Schema>) {
    setFormPart3Result(values);
    setIsSubmitting(true);
  }

  // handle submissions
  useEffect(() => {
    if (isSubmitting && formPart1Result && formPart2Result && formPart3Result) {
      // define a function to submit the form
      const submitForm = async () => {
        const res = await addOrg({
          ...formPart1Result,
          ...formPart2Result,
          ...formPart3Result,
          phone: parsePhone(formPart2Result.phone),
          contactPhone: parsePhone(formPart3Result.contactPhone),
        });
        if (res) {
          // reset forms and show success page
          form1.reset();
          form2.reset();
          form3.reset();
          setIsSubmitting(false);
          setFormPart(4);
        } else {
          // alert user of error
          alert("There was an error adding the organization to the database.");
          setIsSubmitting(false);
        }
      };

      // call the submit function
      submitForm();
    }
  }, [
    isSubmitting,
    formPart1Result,
    formPart2Result,
    formPart3Result,
    form1,
    form2,
    form3,
  ]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          <PlusIcon className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        {/* form 1 */}
        <Form {...form1}>
          <form
            onSubmit={form1.handleSubmit(onForm1Submit)}
            className={`space-y-4 ${formPart === 1 ? "" : "hidden"}`}
          >
            <DialogHeader>
              <DialogTitle>New Organization</DialogTitle>
              <DialogDescription>
                Add an organization to the database.
              </DialogDescription>
            </DialogHeader>
            <FormField
              control={form1.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="OrgTech" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form1.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Type</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Business">Business</SelectItem>
                      <SelectItem value="NonProfit">Non Profit</SelectItem>
                      <SelectItem value="Gov">Government</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid pt-4">
              <Button type="submit">Next</Button>
            </div>
          </form>
        </Form>

        {/* form 2 */}
        <Form {...form2}>
          <form
            onSubmit={form2.handleSubmit(onForm2Submit)}
            className={`space-y-4 ${formPart === 2 ? "" : "hidden"}`}
          >
            <DialogHeader>
              <DialogTitle>Organization Info</DialogTitle>
              <DialogDescription>
                Now, let&apos;s add some more information.
              </DialogDescription>
            </DialogHeader>
            <FormField
              control={form2.control}
              name="website"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Website</FormLabel>
                  <FormControl>
                    <Input placeholder="orgtech.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form2.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="info@orgtech.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form2.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone</FormLabel>
                  <FormControl>
                    <Input placeholder="5551234567" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form2.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="555 N Place St Town, USA 55555"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form2.control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Notes</FormLabel>
                  <FormControl>
                    <Input placeholder="More info..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-2 gap-4 pt-4">
              <Button onClick={onForm2Back} type="button" variant="secondary">
                Back
              </Button>
              <Button type="submit">Next</Button>
            </div>
          </form>
        </Form>

        {/* form 3 */}
        <Form {...form3}>
          <form
            onSubmit={form3.handleSubmit(onForm3Submit)}
            className={`space-y-4 ${formPart === 3 ? "" : "hidden"}`}
          >
            <DialogHeader>
              <DialogTitle>Contact Info</DialogTitle>
              <DialogDescription>
                Now, add a contact for this organization.
              </DialogDescription>
            </DialogHeader>
            <div>
              <FormLabel>Contact Name</FormLabel>
              <div className="my-2 grid w-full grid-cols-2 gap-4">
                <FormField
                  control={form3.control}
                  name="contactFirstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input placeholder="Jane" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form3.control}
                  name="contactLastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input placeholder="Doe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <FormField
              control={form3.control}
              name="contactEmail"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contact Email</FormLabel>
                  <FormControl>
                    <Input placeholder="jane@orgtech.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form3.control}
              name="contactPhone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contact Phone</FormLabel>
                  <FormControl>
                    <Input placeholder="5557654321" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-2 gap-4 pt-4">
              <Button onClick={onForm3Back} type="button" variant="secondary">
                Back
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                Submit
              </Button>
            </div>
          </form>
        </Form>

        {/* success page */}
        <div className={`space-y-4 ${formPart === 4 ? "" : "hidden"}`}>
          <DialogHeader>
            <DialogTitle>Success</DialogTitle>
            <DialogDescription>
              Your organization has been added to the database.
            </DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-4 pt-4">
            <DialogClose asChild>
              <Button onClick={() => setFormPart(1)} variant="secondary">
                Close
              </Button>
            </DialogClose>
            <Button onClick={() => setFormPart(1)}>Add Another</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
