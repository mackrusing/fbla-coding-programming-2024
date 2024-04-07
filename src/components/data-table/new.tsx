"use client";

// form
import { zodResolver } from "@hookform/resolvers/zod";
import { set, useForm } from "react-hook-form";
import { z } from "zod";
// ui
import { Button } from "@/ui/button";
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogClose } from "@/ui/dialog";
import { Table as UiTable, TableBody, TableRow, TableCell } from "@/ui/table";
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
  FormDescription,
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

// schemas
const form1Schema = z.object({
  name: z.string().min(2, { message: "Please enter a name" }),
  type: z.enum(["Business", "NonProfit", "Gov"]),
});

const form2Schema = z.object({
  website: z
    .string()
    .regex(/[\w\d\-]+\.[\w\d\-\.]+/, {
      message: 'Please enter a valid url in the form "example.com"',
    }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  phone: z
    .string()
    .regex(/^\(\d{3}\) \d{3}-\d{4}$/, {
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
  contactPhone: z
    .string()
    .regex(/^\(\d{3}\) \d{3}-\d{4}$/, {
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

  // form 1 handlers
  function onForm1Submit(values: z.infer<typeof form1Schema>) {
    setFormPart1Result(values);
    setFormPart(2);
  }

  // form 2 handlers
  function onForm2Back() {
    setFormPart(1);
  }
  function onForm2Submit(values: z.infer<typeof form2Schema>) {
    setFormPart2Result(values);
    setFormPart(3);
  }

  // form 3 handlers
  function onForm3Back(e: React.MouseEvent<HTMLButtonElement>) {
    setFormPart(2);
  }
  async function onForm3Submit(values: z.infer<typeof form3Schema>) {
    setFormPart3Result(values);
    setIsSubmitting(true);
  }

  // effect
  useEffect(() => {
    if (isSubmitting && formPart1Result && formPart2Result && formPart3Result) {
      const submitForm = async () => {        
        const res = await addOrg({
          ...formPart1Result,
          ...formPart2Result,
          ...formPart3Result,
        });
        console.log(res);
        form1.reset();
        form2.reset();
        form3.reset();
        setIsSubmitting(false);
        setFormPart(4);
      }
      submitForm();
    }
  }, [isSubmitting]);

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
            <div>
              <DialogTitle>New Organization</DialogTitle>
              <p className="pt-1 text-sm text-muted-foreground">
                Add an organization to the database.
              </p>
            </div>
            <FormField
              control={form1.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="OrgTech" {...field} />
                  </FormControl>
                  {/* <FormDescription>
                    Enter the name of the organization.
                  </FormDescription> */}
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
                  {/* <FormDescription>
                    Select the type of organization.
                  </FormDescription> */}
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
            <div>
              <DialogTitle>Organization Info</DialogTitle>
              <p className="pt-1 text-sm text-muted-foreground">
                Now, let's add some more information.
              </p>
            </div>
            <FormField
              control={form2.control}
              name="website"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Website</FormLabel>
                  <FormControl>
                    <Input placeholder="orgtech.com" {...field} />
                  </FormControl>
                  {/* <FormDescription>
                    Enter the website of the organization.
                  </FormDescription> */}
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
                  {/* <FormDescription>
                    Enter the email of the organization.
                  </FormDescription> */}
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
                    <Input placeholder="(555) 123-4567" {...field} />
                  </FormControl>
                  {/* <FormDescription>
                    Enter the phone number of the organization.
                  </FormDescription> */}
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
                  {/* <FormDescription>
                    Enter the address of the organization.
                  </FormDescription> */}
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
                  {/* <FormDescription>
                    Other notes about the organization.
                  </FormDescription> */}
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid pt-4 grid-cols-2 gap-4">
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
            <div>
              <DialogTitle>Contact Info</DialogTitle>
              <p className="pt-1 text-sm text-muted-foreground">
                Now, add a contact for this organization.
              </p>
            </div>
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
              {/* <FormDescription>
                Enter the contact's first and last name.
              </FormDescription> */}
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
                  {/* <FormDescription>
                    Enter the email of the contact.
                  </FormDescription> */}
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
                    <Input placeholder="(555) 765-4321" {...field} />
                  </FormControl>
                  {/* <FormDescription>
                    Enter the phone number of the contact.
                  </FormDescription> */}
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid pt-4 grid-cols-2 gap-4">
              <Button onClick={onForm3Back} type="button" variant="secondary">
                Back
              </Button>
              <Button type="submit" disabled={isSubmitting}>Submit</Button>
            </div>
          </form>
        </Form>

        {/* success page */}
        <div className={`space-y-4 ${formPart === 4 ? "" : "hidden"}`}>
          <div>
            <DialogTitle>Success</DialogTitle>
            <p className="pt-1 text-sm text-muted-foreground">
              Your organization has been added to the database.
            </p>
          </div>
          <div className="grid pt-4 grid-cols-2 gap-4">
            <DialogClose asChild>
              <Button onClick={() => setFormPart(1)} variant="secondary">Close</Button>
            </DialogClose>
            <Button onClick={() => setFormPart(1)}>Add Another</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
