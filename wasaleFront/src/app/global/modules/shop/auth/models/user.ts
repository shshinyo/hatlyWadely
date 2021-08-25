import { isString } from "src/app/shared/utilities/utils";
import { ITokenPayload, UserType } from "./token-payload";
// import { isString, toBoolean } from "@core/utilities";

/** Current user. */
export class User {
  id?: string;
  accessToken?: string;
  email: string;
  emailVerified?: boolean;
  password?: string;
  /** Only if has a phone number. */
  username?: string;
  phoneNumber?: string;
  /** Only if has a phone number. */
  phoneVerified?: boolean;
  /** Only if the current user is Staff */
  userType?: UserType[];

  // Roles
  haveRole?: boolean;
  isAdmin?: boolean;
  isGeneral?: boolean;
  isClient?: boolean;
  isBoth?: boolean;
  isPilot?: boolean;

  constructor(payload: ITokenPayload) {
    this.id = payload.sub;
    this.email = payload.email;
    this.phoneNumber = payload.phone_number;
    this.username = payload.full_name;
    this.userType = isString(payload.userType)
      ? [payload.userType as UserType]
      : (payload.userType as UserType[]);

    this.haveRole = !!this.userType && this.userType.length > 0;
    this.isAdmin = this.haveRole && this.userType.includes("Admin");
    this.isGeneral = this.haveRole && this.userType.includes("General");
    this.isClient = this.haveRole && this.userType.includes("Client");
    this.isBoth = this.haveRole && this.userType.includes("Both");
    this.isPilot = this.haveRole && this.userType.includes("Pilot");
  }
}
