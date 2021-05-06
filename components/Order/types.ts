export interface OrderForm {
  note: string;
  summonerName: string | null;
  details: {
    primaryRole: string;
    secondaryRole: string;
    summonerName: string;
    champions: any[];
  };
  accountDetails: {
    username: string | null;
    password: string | null;
  };
}
