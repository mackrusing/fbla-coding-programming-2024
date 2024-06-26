// db
import { Org } from "@/db/drizzle";
// components
import { TypeChip } from "./table/type-chip";
import { CopyLink } from "./table/copy-link";
// ui
import {
  Table as UiTable,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/ui/dialog";
// lib
import { parseOrgType } from "@/lib/utils";

export function Table({ orgs }: { orgs: Org[] }) {
  // create the table rows
  let orgRows = orgs.map((org) => (
    <Dialog key={org.id}>
      <DialogTrigger asChild>
        <OrgTableRow org={org} />
      </DialogTrigger>
      <OrgDialogContent org={org} />
    </Dialog>
  ));

  if (orgRows.length === 0) {
    orgRows = [
      <TableRow key="noresult">
        <TableCell colSpan={3} className="text-center">
          No Results
        </TableCell>
      </TableRow>,
    ];
  }

  return <TableBase>{orgRows}</TableBase>;
}

// the base table component with header
function TableBase({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-md border">
      <UiTable>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Type</TableHead>
            <TableHead className="hidden sm:table-cell">Contact</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>{children}</TableBody>
      </UiTable>
    </div>
  );
}

// a single row in the table
function OrgTableRow({ org }: { org: Org }) {
  return (
    <TableRow>
      <TableCell>{org.name}</TableCell>
      <TableCell>
        <TypeChip orgType={org.type} />
      </TableCell>
      <TableCell className="hidden sm:table-cell">
        <div className="inline-flex">
          {org.contactFirstName} {org.contactLastName}
        </div>
      </TableCell>
    </TableRow>
  );
}

// the dialog content for each row / organization
function OrgDialogContent({ org }: { org: Org }) {
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>{org.name}</DialogTitle>
        <DialogDescription>{parseOrgType(org.type)}</DialogDescription>
      </DialogHeader>
      <UiTable>
        <TableBody>
          <TableRow>
            <TableCell className="align-top font-semibold">Website</TableCell>
            <TableCell>
              <a
                className="underline decoration-muted-foreground"
                href={"https://" + org.website ?? ""}
                target="_blank"
              >
                {org.website}
              </a>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="align-top font-semibold">Email</TableCell>
            <TableCell>
              <CopyLink text={org.email ?? ""} />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="align-top font-semibold">Phone</TableCell>
            <TableCell>{org.phone}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="align-top font-semibold">Address</TableCell>
            <TableCell>{org.address}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="align-top font-semibold">Notes</TableCell>
            <TableCell>{org.notes}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="align-top font-semibold">Contact</TableCell>
            <TableCell>
              <p className="pb-0.5 font-bold">
                {org.contactFirstName} {org.contactLastName}
              </p>
              <p>
                <CopyLink text={org.contactEmail ?? ""} />
              </p>
              <p>{org.contactPhone}</p>
            </TableCell>
          </TableRow>
        </TableBody>
      </UiTable>
    </DialogContent>
  );
}
