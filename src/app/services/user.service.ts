declare var google: any;
import { EventEmitter, Injectable } from '@angular/core';
import { TokenPayload, User } from 'src/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  googleReadyEvt = new EventEmitter<void>();
  loginEvt = new EventEmitter<void>();
  googleReady = false;
  user?: User;
  accessToken?: string;

  get loggedIn() : boolean {
    return this.user !== undefined;
  }

  private localStorageId = 'user';

  constructor() {
      const accessToken = sessionStorage.getItem("accessToken");
      if(accessToken) {
        this.accessToken = accessToken;
        this.user = this.convertToUser(this.decodeJWTToken(accessToken));
        console.log("user retrieved from storage");
      } else {
        // @ts-ignore
        window.onGoogleLibraryLoad = () => {
          console.log("google library loaded");
          google.accounts.id.initialize({
            client_id: '406074535204-tnrjrd519js21j2c6iql44akg97qhlv3.apps.googleusercontent.com',
            callback: (resp: any) => this.handleOauthResponse(resp)
          });
          this.googleReady = true;
          this.googleReadyEvt.emit();
        }
        // google.accounts.id.prompt();
      }
  }
  private decodeJWTToken(token: string) : TokenPayload {
    return JSON.parse(atob(token.split(".")[1]))
  }

  private handleOauthResponse(response: any){
    console.log(response);
    this.accessToken = response.credential;
    const responsePayload = this.decodeJWTToken(response.credential)
    console.log(responsePayload);
    console.log(JSON.stringify(responsePayload));
    this.user = this.convertToUser(responsePayload);
    sessionStorage.setItem("accessToken", response.credential);
    this.loginEvt.emit();
  }

  private convertToUser(usr: TokenPayload) : User {
    return {
      id: usr.sub,
      email: usr.email,
      family_name: usr.family_name,
      given_name: usr.given_name,
      name: usr.name,
      picture: usr.picture
    }
  }
}
