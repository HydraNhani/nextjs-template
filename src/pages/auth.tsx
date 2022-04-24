import type { NextPageWithConfiguration } from "types";
import { useTitle, useDescription, useHeader } from "@lib/hooks";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import { EmailAuthProvider } from "firebase/auth";
import { auth } from "@lib/firebase";

const AuthenticationPage: NextPageWithConfiguration = () => {
    //Layout hooks
    const { setTitle } = useTitle();
    const { setDescription } = useDescription();
    const { setHeader } = useHeader();
    //Page info
    setTitle("Authentication");
    setDescription("Sign in or create an account to access the dashboard!");
    setHeader("Authorize");
    return (
        <StyledFirebaseAuth uiConfig={{
            signInFlow: "popup",
            signInSuccessUrl: "/account",
            signInOptions: [{
                provider: EmailAuthProvider.PROVIDER_ID,
                requireDisplayName: true
            }]
        }} firebaseAuth={auth} className="font-coc-description"/>
    );
};
AuthenticationPage.noAuthenticationRequired = true;

export default AuthenticationPage;