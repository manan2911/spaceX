import { gql } from "@apollo/client";

export const NEXT_LAUNCH = gql`
  query NextLaunch {
    launchNext {
      mission_name
      launch_date_local
      rocket {
        rocket_name
      }
      launch_site {
        site_name_long
      }
    }
  }
`;
