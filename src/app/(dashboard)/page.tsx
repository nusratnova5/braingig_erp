"use client"
import { useEffect, useState } from "react";

export default function Home() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = localStorage.getItem("erpUser");
    if (!user) {
      window.location.href = "/login"; // redirect if not logged in
    } else {
      setLoading(false); // user exists, stop loading
    }
  }, []);

  if (loading) {
    return null; // or a spinner/loading text
  }

  return (
    <div>
      Welcome to your ERP Dashboard
    </div>
  );
}
