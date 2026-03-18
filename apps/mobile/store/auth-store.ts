import { create } from "zustand";
import type { Session, User } from "@supabase/supabase-js";
import { supabase } from "@/services/supabase-adapter";
import { useExpenseStore } from "./expense-store";
import type { UserProfile, ProfileUpdateInput } from "@/domain/types";

type AuthStore = {
  session: Session | null;
  user: User | null;
  loading: boolean;
  initialize: () => () => void;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  updateProfile: (input: ProfileUpdateInput) => Promise<void>;
  uploadAvatar: (uri: string) => Promise<string>;
  getProfile: () => UserProfile;
};

export const useAuthStore = create<AuthStore>((set, get) => ({
  session: null,
  user: null,
  loading: true,

  initialize: () => {
    const { data } = supabase.auth.onAuthStateChange((_event, session) => {
      set({ session, user: session?.user ?? null, loading: false });
    });
    return () => data.subscription.unsubscribe();
  },

  signIn: async (email, password) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;
  },

  signUp: async (email, password) => {
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) throw error;
  },

  signOut: async () => {
    await supabase.auth.signOut();
    useExpenseStore.setState({ expenses: [] });
  },

  updateProfile: async (input: ProfileUpdateInput) => {
    const { error } = await supabase.auth.updateUser({
      data: {
        display_name: input.displayName,
        phone: input.phone,
        bio: input.bio,
      },
    });
    if (error) throw error;

    // Refresh session to get updated user
    const { data } = await supabase.auth.getSession();
    if (data.session) {
      set({ user: data.session.user });
    }
  },

  uploadAvatar: async (uri: string) => {
    const { user } = get();
    if (!user) throw new Error("Not authenticated");

    // Convert image URI to blob
    const response = await fetch(uri);
    const blob = await response.blob();
    const fileExt = uri.split(".").pop() || "jpg";
    const fileName = `${user.id}-${Date.now()}.${fileExt}`;
    const filePath = `avatars/${fileName}`;

    // Upload to Supabase storage
    const { error: uploadError } = await supabase.storage
      .from("profiles")
      .upload(filePath, blob, { contentType: `image/${fileExt}` });

    if (uploadError) throw uploadError;

    // Get public URL
    const { data } = supabase.storage.from("profiles").getPublicUrl(filePath);

    // Update user metadata with avatar URL
    const { error: updateError } = await supabase.auth.updateUser({
      data: { avatar_url: data.publicUrl },
    });

    if (updateError) throw updateError;

    // Refresh session
    const { data: sessionData } = await supabase.auth.getSession();
    if (sessionData.session) {
      set({ user: sessionData.session.user });
    }

    return data.publicUrl;
  },

  getProfile: (): UserProfile => {
    const { user } = get();
    return {
      displayName: user?.user_metadata?.display_name,
      phone: user?.user_metadata?.phone,
      bio: user?.user_metadata?.bio,
      avatarUrl: user?.user_metadata?.avatar_url,
    };
  },
}));
