import { useQuery } from "@tanstack/react-query";
import { useLocalStorage } from '@mantine/hooks';

import { getPartnerCompanyUsers } from "../services";
import { COMPANY_TOKEN_CREDENTIALS_KEY, queryKeys } from "../config";
import type { CompanyCredentialsType } from "../types";

export const useCompanyUsers = (
  partnerToken: string,
  companies?: string[] | null,
)=> {
  const [companyCredentials, setCompanyCredentials] = useLocalStorage<CompanyCredentialsType>({ key: COMPANY_TOKEN_CREDENTIALS_KEY });
  const companyId = companyCredentials?.company_id;

  return useQuery({
    queryKey: queryKeys.companyUsers(partnerToken, companies, companyId),
    queryFn: async () => {
      try {
        if (partnerToken && companyId) {
          const currentUser = companyCredentials?.user_id;
          const users = await getPartnerCompanyUsers(partnerToken, companyId);

          if (!currentUser) {
            const preselectedUser = users.length ? users[0] : crypto.randomUUID();

            setCompanyCredentials((prevState) => ({
              ...prevState,
              user_id: preselectedUser,
            }))
          }

          return users;
        }
      } catch {
        const newUser = crypto.randomUUID();
        setCompanyCredentials((prevState) => ({
          ...prevState,
          user_id: newUser,
        }));

        return [newUser];
      }
    },
    enabled: !!partnerToken && !!companies && !!companyId,
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  });
}