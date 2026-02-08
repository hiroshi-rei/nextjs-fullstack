'use client'

import { signIn } from "next-auth/react";

export default function LoginPage() {
    async function handleSubmit(e: React.FormEvent<HTMLFormElement>){
        e.preventDefault();

        const form = e.currentTarget;

        await signIn("credentials", {
            email: form.email.value,
            password: form.password.value,
            callbackUrl: "/home",
        });
    }

    return(
        <form onSubmit={handleSubmit}>
            <h1>Login</h1>
            <input name="email" placeholder="Email" />
            <input name="password" type="password" placeholder="Password" />
            <button type="submit">Login</button>
        </form>
    );
}