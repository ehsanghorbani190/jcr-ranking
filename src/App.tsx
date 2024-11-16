import "./style.css";
import useJCRData from "./hooks/useJCRData";
import {
  Table,
  Stack,
  Grid,
  GridItem,
  Input,
  Text,
  HStack,
} from "@chakra-ui/react";
import {
  PaginationItems,
  PaginationNextTrigger,
  PaginationPrevTrigger,
  PaginationRoot,
} from "@/components/ui/pagination";
import { Field } from "@/components/ui/field";
import { useState } from "preact/hooks";
import { quartilesColors } from "./constants";
import { Alert } from "@/components/ui/alert";

export default function App() {
  const [page, setPage] = useState<number>(1);
  const [name, setName] = useState<string>("");
  const [issn, setIssn] = useState<string>("");
  const [eissn, setEissn] = useState<string>("");
  const { journals, keys } = useJCRData({ name, issn, eissn });

  return (
    <Stack alignItems="center" paddingTop={10} paddingBottom={10}>
      <Stack
        flexDirection={"row"}
        flexWrap={"wrap"}
        alignItems={"center"}
        justifyContent={"center"}>
        <Grid>
          <GridItem>
            <Field label="Journal Name">
              <Input
                name="name"
                value={name}
                onInput={(e) => {
                  setName((e.target as HTMLInputElement).value || "");
                  setPage(1);
                }}
              />
            </Field>
          </GridItem>
        </Grid>
        <Grid>
          <GridItem>
            <Field label="ISSN">
              <Input
                name="issn"
                value={issn}
                onInput={(e) => {
                  setIssn((e.target as HTMLInputElement).value || "");
                  setPage(1);
                }}
              />
            </Field>
          </GridItem>
        </Grid>
        <Grid>
          <GridItem>
            <Field label="eISSN">
              <Input
                name="eissn"
                value={eissn}
                onInput={(e) => {
                  setEissn((e.target as HTMLInputElement).value || "");
                  setPage(1);
                }}
              />
            </Field>
          </GridItem>
        </Grid>
      </Stack>
      {journals.length ? (
        <>
          <Table.ScrollArea
            marginTop={10}
            marginLeft={5}
            marginRight={5}
            h={"xl"}
            w={"80vw"}>
            <Table.Root stickyHeader interactive>
              <Table.Header>
                <Table.Row>
                  {keys.map((heading) => (
                    <Table.ColumnHeader key={heading}>
                      {heading !== "eISSN"
                        ? heading.charAt(0).toUpperCase() + heading.slice(1)
                        : heading}
                    </Table.ColumnHeader>
                  ))}
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {journals
                  .slice((page - 1) * 20, page * 20)
                  .map((journal, index) => (
                    <Table.Row key={`${journal.name}-${index}`}>
                      {Object.keys(journal).map((cell) => (
                        <Table.Cell
                          key={cell}
                          backgroundColor={
                            cell === "quartile"
                              ? quartilesColors[journal[cell].toLowerCase()]
                              : null
                          }
                          textAlign={cell === "quartile" ? "center" : "left"}>
                          {journal[cell]}
                        </Table.Cell>
                      ))}
                    </Table.Row>
                  ))}
              </Table.Body>
            </Table.Root>
          </Table.ScrollArea>
          <PaginationRoot
            count={journals.length}
            pageSize={20}
            page={page}
            onPageChange={({ page }) => {
              setPage(page);
            }}
            siblingCount={0}
            marginTop={6}>
            <HStack wrap="wrap">
              <PaginationPrevTrigger />
              <PaginationItems />
              <PaginationNextTrigger />
            </HStack>
          </PaginationRoot>
        </>
      ) : (
        <Alert
          status="error"
          title="No journals found!"
          maxW={"sm"}
          marginTop={6}>
          No journals matched your filters in the JCR ranking.
        </Alert>
      )}
    </Stack>
  );
}
