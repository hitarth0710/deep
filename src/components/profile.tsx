import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog-with-cancel";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useToast } from "@/lib/use-toast";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/contexts/AuthContext";
import { Loader2, Camera, Trash2 } from "lucide-react";
import { BackButton } from "@/components/ui/back-button";
import Navbar from "./navbar";
import Footer from "./footer";

export default function Profile() {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState({
    username: "",
    full_name: "",
    avatar_url: "",
  });

  useEffect(() => {
    if (!user) {
      navigate("/sign-in");
      return;
    }
    loadProfile();
  }, [user]);

  const loadProfile = async () => {
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user?.id)
        .single();

      if (error) throw error;
      if (data) setProfile(data);
    } catch (error) {
      console.error("Error loading profile:", error);
    }
  };

  const updateProfile = async () => {
    if (!user) return;
    setLoading(true);

    try {
      const { error } = await supabase.from("profiles").upsert({
        id: user.id,
        ...profile,
        updated_at: new Date().toISOString(),
      });

      if (error) throw error;

      toast({
        title: "Profile updated",
        description: "Your profile has been updated successfully.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "There was an error updating your profile.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAvatarChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    try {
      setLoading(true);
      if (!event.target.files || event.target.files.length === 0) {
        throw new Error("You must select an image to upload.");
      }

      const file = event.target.files[0];
      const fileExt = file.name.split(".").pop();
      const filePath = `${user?.id}/avatar.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(filePath, file, { upsert: true });

      if (uploadError) throw uploadError;

      const avatarUrl = `${supabase.storage.from("avatars").getPublicUrl(filePath).data.publicUrl}`;
      setProfile({ ...profile, avatar_url: avatarUrl });

      toast({
        title: "Avatar updated",
        description: "Your avatar has been updated successfully.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "There was an error uploading your avatar.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const deleteAccount = async () => {
    setShowDeleteDialog(true);

    try {
      setLoading(true);
      const { error } = await supabase
        .from("profiles")
        .delete()
        .eq("id", user?.id);

      if (error) throw error;

      await supabase.auth.signOut();
      navigate("/");

      toast({
        title: "Account deleted",
        description: "Your account has been deleted successfully.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "There was an error deleting your account.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <BackButton />
      <div className="container max-w-2xl pt-32 pb-20">
        <Card className="p-8">
          <div className="flex flex-col items-center mb-8">
            <div className="relative">
              <Avatar className="h-24 w-24 mb-4">
                <AvatarImage src={profile.avatar_url} />
                <AvatarFallback>
                  {profile.username?.[0] || user?.email?.[0]}
                </AvatarFallback>
              </Avatar>
              <label
                htmlFor="avatar-upload"
                className="absolute bottom-0 right-0 p-2 bg-primary text-primary-foreground rounded-full cursor-pointer hover:opacity-90 transition-opacity"
              >
                <Camera className="h-4 w-4" />
              </label>
              <input
                id="avatar-upload"
                type="file"
                accept="image/*"
                onChange={handleAvatarChange}
                className="hidden"
              />
            </div>
            <h1 className="text-2xl font-bold mb-1">
              {profile.full_name || "Your Name"}
            </h1>
            <p className="text-muted-foreground">{user?.email}</p>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                value={profile.username}
                onChange={(e) =>
                  setProfile({ ...profile, username: e.target.value })
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="full_name">Full Name</Label>
              <Input
                id="full_name"
                value={profile.full_name}
                onChange={(e) =>
                  setProfile({ ...profile, full_name: e.target.value })
                }
              />
            </div>

            <div className="flex justify-between pt-4">
              <Button
                variant="destructive"
                onClick={deleteAccount}
                disabled={loading}
              >
                {loading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <>
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete Account
                  </>
                )}
              </Button>

              <Button onClick={updateProfile} disabled={loading}>
                {loading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  "Save Changes"
                )}
              </Button>
            </div>
          </div>
        </Card>
      </div>
      <Footer />

      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Account</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete your account? This action cannot
              be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowDeleteDialog(false)}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={async () => {
                await deleteAccount();
                setShowDeleteDialog(false);
              }}
              disabled={loading}
            >
              {loading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                "Delete Account"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
