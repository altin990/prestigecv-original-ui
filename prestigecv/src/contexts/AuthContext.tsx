import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail,
  type User,
} from "firebase/auth";
import { doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";

interface UserProfile {
  uid: string;
  email: string;
  displayName?: string;
  isPro: boolean;
  createdAt: unknown;
}

interface AuthError { message: string; }
interface AuthResult { error: AuthError | null; }

interface AuthContextType {
  user: User | null;
  profile: UserProfile | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<AuthResult>;
  signUp: (email: string, password: string) => Promise<AuthResult>;
  signInWithGoogle: () => Promise<AuthResult>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<AuthResult>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  async function ensureProfile(firebaseUser: User) {
    const ref = doc(db, "users", firebaseUser.uid);
    const snap = await getDoc(ref);
    if (!snap.exists()) {
      const newProfile: UserProfile = {
        uid: firebaseUser.uid,
        email: firebaseUser.email ?? "",
        displayName: firebaseUser.displayName ?? "",
        isPro: false,
        createdAt: serverTimestamp(),
      };
      await setDoc(ref, newProfile);
      setProfile(newProfile);
    } else {
      setProfile(snap.data() as UserProfile);
    }
  }

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser);
      if (firebaseUser) await ensureProfile(firebaseUser);
      else setProfile(null);
      setLoading(false);
    });
    return unsub;
  }, []);

  async function signIn(email: string, password: string): Promise<AuthResult> {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      return { error: null };
    } catch (err: unknown) {
      return { error: { message: err instanceof Error ? err.message : "Sign in failed" } };
    }
  }

  async function signUp(email: string, password: string): Promise<AuthResult> {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      return { error: null };
    } catch (err: unknown) {
      return { error: { message: err instanceof Error ? err.message : "Sign up failed" } };
    }
  }

  async function signInWithGoogle(): Promise<AuthResult> {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      return { error: null };
    } catch (err: unknown) {
      return { error: { message: err instanceof Error ? err.message : "Google sign in failed" } };
    }
  }

  async function signOut() { await firebaseSignOut(auth); }

  async function resetPassword(email: string): Promise<AuthResult> {
    try {
      await sendPasswordResetEmail(auth, email);
      return { error: null };
    } catch (err: unknown) {
      return { error: { message: err instanceof Error ? err.message : "Reset failed" } };
    }
  }

  return (
    <AuthContext.Provider value={{ user, profile, loading, signIn, signUp, signInWithGoogle, signOut, resetPassword }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}
