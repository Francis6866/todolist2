import { createContext, useContext, useEffect, useState } from "react";
import supabase from "../supabase-client";



const AuthContext = createContext()

export const AuthContextProvider = ({ children }) => {
    const [isSignUp, setIsSignUp] = useState(false)
    const [session, setSession] = useState(null)
    const [error, setError] = useState(null)

    const signUpUser = async (email, password) => {
        try {
            const { data, error } = await supabase
            .auth
            .signUp({email, password})

            if(error) return setError(error.message)
            setIsSignUp(!isSignUp)
        } catch (error) {
            setError(error.message)
        }
    }

    const signInUser = async (email, password) => {
       try {
            const { data, error } = await supabase
            .auth
            .signInWithPassword({email, password})
            if(error) return setError(error.message)
            setSession(data.session)
       } catch (error) {
            setError(error.message)
       }
    }

    const signOutUser = async () => {
        try {
            const {error} = await supabase
            .auth
            .signOut()

            if(error) return setError(error.message)
        } catch (error) {
            setError(error.message)
        }
    }

    useEffect(() => {
        const {data: authenticationListener} = supabase
        .auth
        .onAuthStateChange((event, session) => {
            setSession(session)
        }) // update session whenever it changes

         // fetch initial session on mount
        supabase
        .auth
        .getSession()
        .then(({data}) => {
            setSession(data.session)
        })

        return () => {
            authenticationListener.subscription.unsubscribe()
        }

    }, [])

    return (
        <AuthContext.Provider value={{
            isSignUp, session, 
            error, setIsSignUp, 
            signUpUser, signInUser, 
            signOutUser
            }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)