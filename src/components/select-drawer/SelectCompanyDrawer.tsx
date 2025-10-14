import { NavLink, Stack, TextInput } from "@mantine/core";
import { useLocalStorage } from "@mantine/hooks";
import { useDeferredValue, useMemo, useState } from "react";
import { CiCirclePlus, CiSearch } from "react-icons/ci";

import { COMPANY_TOKEN_CREDENTIALS_KEY } from "../../config";
import { usePartnerCompanies } from "../../hooks";
import type { CompanyCredentialsType } from "../../types";
import { generateRandomName } from "../../utils";
import { CustomDrawer } from "./CustomDrawer.tsx";

type SelectCompanyDrawerProps = {
  opened: boolean;
  onClose: VoidFunction;
};

const AddCompanyButton = (
  <div style={{ alignItems: "center", display: "flex", gap: "5px" }}>
    <p>Add Company</p>
    <CiCirclePlus />
  </div>
);

export const SelectCompanyDrawer = ({
  opened,
  onClose,
}: SelectCompanyDrawerProps) => {
  const [companyCredentials, setCompanyCredentials] =
    useLocalStorage<CompanyCredentialsType>({
      key: COMPANY_TOKEN_CREDENTIALS_KEY,
    });

  const { data: fetchedCompanies = [] } = usePartnerCompanies();
  const [manuallyAddedIds, setManuallyAddedIds] = useState<string[]>([]);
  const [query, setQuery] = useState("");
  const deferredQuery = useDeferredValue(query);

  const handleAddCredential = () => {
    const newCredentialId = crypto.randomUUID();
    setManuallyAddedIds((prevIds) => [newCredentialId, ...prevIds]);
  };

  const allCompanyIds = useMemo(() => {
    const combinedIds = [...manuallyAddedIds, ...(fetchedCompanies || [])];

    return Array.from(new Set(combinedIds));
  }, [fetchedCompanies, manuallyAddedIds]);

  const handleSelectCredential = (externalId: string) => {
    setCompanyCredentials({ company_id: externalId });
  };

  const visibleCompanies = useMemo(() => {
    const search = deferredQuery.toLowerCase();
    const mappedCompanies = allCompanyIds.map((companyId) => ({
      externalId: companyId,
      label: generateRandomName(companyId, "company_id"),
    }));

    if (!search) {
      return mappedCompanies;
    }

    return mappedCompanies.filter(
      (company) =>
        company.label.toLowerCase().includes(search) ||
        company.externalId.toLowerCase().includes(search),
    );
  }, [allCompanyIds, deferredQuery]);

  return (
    <CustomDrawer opened={opened} onClose={onClose} title="Select Company">
      <Stack>
        <TextInput
          placeholder="Search Company..."
          value={query}
          leftSection={<CiSearch />}
          onChange={({ target }) => setQuery(target.value)}
        />
        {!query && (
          <NavLink label={AddCompanyButton} onClick={handleAddCredential} />
        )}
        {visibleCompanies.map(({ externalId, label }) => (
          <NavLink
            key={externalId}
            label={label}
            active={externalId === companyCredentials?.company_id}
            onClick={() => handleSelectCredential(externalId)}
          />
        ))}
      </Stack>
    </CustomDrawer>
  );
};
