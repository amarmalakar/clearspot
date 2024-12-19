import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Link, Navigate } from "react-router-dom";
import { doCreateUserWithEmailAndPassword } from "@/lib/firebase/auth";
import { useAuthProvider } from "../provider/auth-provider";
import { FirebaseError } from "firebase/app";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { userLoggedIn } = useAuthProvider();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      setIsRegistering(true);
      await doCreateUserWithEmailAndPassword(email, password);
    } catch (err) {
      if (err instanceof FirebaseError) {
        const firebaseError = err.code;

        switch (firebaseError) {
          case "auth/email-already-in-use":
            setError("This email is already in use. Please try another.");
            break;
          case "auth/invalid-email":
            setError(
              "The email address is invalid. Please enter a valid email."
            );
            break;
          case "auth/weak-password":
            setError(
              "Password is too weak. Please choose a stronger password."
            );
            break;
          default:
            setError("An unexpected error occurred. Please try again later.");
        }
      }
    } finally {
      setIsRegistering(false);
    }
  };

  return (
    <>
      {userLoggedIn && <Navigate to={"/home"} replace={true} />}
      <Card className="max-w-96 m-auto mt-16">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">Create your account</CardTitle>
          <CardDescription>
            Enter your email below to create your account
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          {error && <div className="text-red-600">{error}</div>}
          <form onSubmit={onSubmit} className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="confirmPassword">Confirm password</Label>
              <Input
                id="confirmPassword"
                type="password"
                autoComplete="off"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
            <Button type="submit" disabled={isRegistering} className="w-full">
              {isRegistering ? "Signing Up..." : "Sign Up"}
            </Button>
          </form>
        </CardContent>
        <p className="px-8 pb-6 text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link
            to="/login"
            className="underline underline-offset-4 hover:text-primary"
          >
            Login
          </Link>
        </p>
      </Card>
    </>
  );
}
