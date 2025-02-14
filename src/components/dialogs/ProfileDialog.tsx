import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/lib/use-toast";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/lib/supabase";
import { Camera, Loader2, LogOut } from "lucide-react";

export function ProfileDialog() {
  const { user, signOut } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState({
    username: "",
    full_name: "",
    avatar_url: "",
  });

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

      const avatarUrl = `${
        supabase.storage.from("avatars").getPublicUrl(filePath).data.publicUrl
      }`;
      setProfile({ ...profile, avatar_url: avatarUrl });

      toast({
        title: "Success",
        description: "Avatar updated successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Error updating avatar",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async () => {
    try {
      setLoading(true);
      const { error } = await supabase.from("profiles").upsert({
        id: user?.id,
        ...profile,
        updated_at: new Date().toISOString(),
      });

      if (error) throw error;

      toast({
        title: "Success",
        description: "Profile updated successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Error updating profile",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="hover:scale-105 transition-all duration-200"
        >
          Profile
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Your Profile</DialogTitle>
          <DialogDescription>
            Update your profile information and preferences.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Avatar Section */}
          <div className="flex flex-col items-center gap-4">
            <div className="relative">
              <Avatar className="h-24 w-24">
                <AvatarImage src={profile.avatar_url} />
                <AvatarFallback>
                  {user?.email?.[0].toUpperCase()}
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
            <div className="text-center">
              <p className="font-medium">{user?.email}</p>
              <p className="text-sm text-muted-foreground">
                Joined {new Date(user?.created_at || "").toLocaleDateString()}
              </p>
            </div>
          </div>

          {/* Form Fields */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                value={profile.username}
                onChange={(e) =>
                  setProfile({ ...profile, username: e.target.value })
                }
                placeholder="Enter your username"
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
                placeholder="Enter your full name"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-between">
            <Button variant="outline" onClick={signOut} className="gap-2">
              <LogOut className="h-4 w-4" />
              Sign Out
            </Button>
            <Button onClick={updateProfile} disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  Saving...
                </>
              ) : (
                "Save Changes"
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
