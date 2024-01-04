import { gql, useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const LOGIN = gql`
mutation Mutation($password: String!, $email: String!) {
    signIn(password: $password, email: $email)
  }
`

export default function Login() {
    const router = useRouter();
    const [email, setEmail] = useState<String>();
    const [password, setPassword] = useState<String>();

    // const token = localStorage.getItem("token");
    const [loggedIn] = useMutation(LOGIN, {
        variables: {
            email: email,
            password: password
        },
        onCompleted(data: any) {
            console.log(data)
            localStorage.setItem("token", data.signIn)
            router.push('/');
        },
    })

    return (
        <div>
            <label>Email</label>
            <input type="email" onChange={(e) => setEmail(e.target.value)} />
            <br />
            <label>Mot de passe</label>
            <input type="password" onChange={(e) => setPassword(e.target.value)} />
            <br />
            <button onClick={() => loggedIn()}>Se connecter</button>
        </div>
    )

}