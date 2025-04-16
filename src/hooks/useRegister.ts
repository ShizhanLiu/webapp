import { Profile } from "../model/Profile"
import { useState } from "react"
import { createProfile } from "../services/auth-service";

export const useRegister = () => {
    const [error, setError] = useState<string>("");
    const [isLoading, setLoader] = useState<boolean>(false);
    const [toast, setToast] = useState<string>("");
    const signup = (profile: Profile) =>{
        setLoader(true);
      createProfile(profile)
        .then(response => {
            if (response && response.status === 201){
                setToast("Profile is successfully created")
            }
        })
        .catch(error => console.log(error))
        .finally(() => setLoader(false));

    }
    return {error, isLoading, signup, toast};
}
