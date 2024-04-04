"use client";

// ui
import { Button } from "@/ui/button";
import { Dialog, DialogTrigger, DialogContent, DialogTitle } from "@/ui/dialog";
import { Table as UiTable, TableBody, TableRow, TableCell } from "@/ui/table";
import { Input } from "@/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/ui/select"

// icons
import { PlusIcon } from "lucide-react";

export function New() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          <PlusIcon className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <div>
          <DialogTitle>New Organization</DialogTitle>
          <p className="pt-1 text-sm text-muted-foreground">
            Add an organization to the database.
          </p>
        </div>
        <UiTable>
          <TableBody>
            <TableRow>
              <TableCell className="font-semibold">Name</TableCell>
              <TableCell><Input placeholder="OrgTech" /></TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-semibold">Type</TableCell>
              <TableCell>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Business">Business</SelectItem>
                    <SelectItem value="Non Profit">NonProfit</SelectItem>
                    <SelectItem value="Government">Gov</SelectItem>
                  </SelectContent>
                </Select>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-semibold">Website</TableCell>
              <TableCell><Input placeholder="example.com" /></TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-semibold">Email</TableCell>
              <TableCell><Input type="email" placeholder="human@mail.net" /></TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-semibold">Phone</TableCell>
              <TableCell><Input type="tel" placeholder="(555) 123-4567" /></TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-semibold">Address</TableCell>
              <TableCell><Input placeholder="555 N Place St" /></TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-semibold">Notes</TableCell>
              <TableCell><Input placeholder="More info..." /></TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="align-top font-semibold">Contact</TableCell>
              <TableCell>
                <div className="flex flex-col gap-2">
                  <Input placeholder="Jane Doe" />
                  <Input type="email" placeholder="jane@mail.net" />
                  <Input type="tel" placeholder="(555) 765-4321" />
                </div>
              </TableCell>
            </TableRow>
          </TableBody>
        </UiTable>
        <Button type="submit" className="submit">Submit</Button>
      </DialogContent>
    </Dialog>
  );
}
