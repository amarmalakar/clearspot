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
import { useAuthProvider } from "../provider/auth-provider";
import {
  doSignInWithEmailAndPassword,
  doSignInWithGoogle,
} from "@/lib/firebase/auth";
import { Icons } from "../ui/icons";
import { FirebaseError } from "firebase/app";

export default function Login() {
  const { userLoggedIn } = useAuthProvider();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    if (!isSigningIn) {
      setIsSigningIn(true);
      try {
        const user = await doSignInWithEmailAndPassword(email, password);
        console.log("🚀 ~ onSubmit ~ user:", user);
      } catch (err) {
        if (err instanceof FirebaseError) {
          switch (err.code) {
            case "auth/user-not-found":
              setError("No user found with this email.");
              break;
            case "auth/wrong-password":
              setError("Invalid password. Please try again.");
              break;
            case "auth/too-many-requests":
              setError(
                "Too many failed attempts. Please try again later or reset your password."
              );
              break;
            default:
              setError("An unexpected error occurred. Please try again later.");
          }
        } else {
          setError("An error occurred. Please check your internet connection.");
        }
      }
      setIsSigningIn(false);
    }
  };

  const onGoogleSignIn = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    setError(null);
    if (!isSigningIn) {
      setIsSigningIn(true);
      try {
        await doSignInWithGoogle();
      } catch (err) {
        console.log("🚀 ~ Login ~ err:", err);
        setError("Google sign-in failed. Please try again.");
      } finally {
        setIsSigningIn(false);
      }
    }
  };

  return (
    <>
      {userLoggedIn && <Navigate to={"/home"} replace={true} />}

      <Card className="max-w-96 m-auto mt-16">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">Login with your account</CardTitle>
          <CardDescription>
            Enter your email below to Login with your account
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <Button
            variant="outline"
            onClick={(e) => {
              onGoogleSignIn(e);
            }}
          >
            <Icons.Google className="mr-2 h-4 w-4" />
            Google
          </Button>
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>

          <form onSubmit={onSubmit} className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                required
              />
            </div>
            <Button className="w-full" disabled={isSigningIn}>
              {isSigningIn ? "Logging in..." : "Login"}
            </Button>
          </form>
          {error && (
            <div className="text-red-500 text-sm text-center">{error}</div>
          )}
        </CardContent>

        <p className="px-8 pb-6 text-center text-sm text-muted-foreground">
          Create an account?{" "}
          <Link
            to="/register"
            className="underline underline-offset-4 hover:text-primary"
          >
            Signup
          </Link>
        </p>
      </Card>
    </>
  );
}
