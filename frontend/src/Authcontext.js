import React, { createContext, useState, useEffect } from "react";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  fetchSignInMethodsForEmail,
  signOut,
} from "firebase/auth";
import { auth, db } from "./firebase";
import { getDocs, query, where, collection } from "firebase/firestore";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setCurrentUser(user);
        const profile = await fetchUserProfile(user.email);
        setUserProfile(profile);
      } else {
        setCurrentUser(null);
        setUserProfile(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const fetchUserProfile = async (email) => {
    try {
      const usersCollection = collection(db, "Users");
      const q = query(usersCollection, where("email", "==", email));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        console.log("No such document!");
        return null;
      } else {
        const userDoc = querySnapshot.docs[0];
        return userDoc.data();
      }
    } catch (error) {
      console.error("Error fetching user profile:", error);
      return null;
    }
  };

  const login = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      const profile = await fetchUserProfile(email);

      setCurrentUser(user);
      setUserProfile(profile);
    } catch (error) {
      const profile = await fetchUserProfile(email);
      if (profile == null) {
        throw new Error("No user found with this email, try again.");
      } else {
        throw new Error("Invalid password, try again");
      }
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ currentUser, userProfile, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
