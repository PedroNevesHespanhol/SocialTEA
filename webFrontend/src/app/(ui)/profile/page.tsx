"use client"
import { redirect } from "next/navigation";

export default function ProfilePage() {
   redirect("/" + sessionStorage.getItem('userSlug'));

   return null;
}
