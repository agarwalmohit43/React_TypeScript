import React, { useEffect, useState } from "react";

export default function NestedDependency() {
  const [user, setUser] = useState({
    details: { city: "Mumbai" },
  });

  // 👇 Effect that depends on primitive city value
  useEffect(() => {
    console.log("Effect ran — city:", user.details.city);
  }, [user.details.city]);

  useEffect(() => {
    console.log("Effect ran — user:", JSON.stringify(user));
  }, [user]);

  const mutateAndSetSameRef = () => {
    console.log("Mutating same object...");
    user.details.city = "Pune"; // ❌ Mutate same reference
    setUser(user); // ❌ Same ref, React won't re-render
  };

  const updateWithNewObject = () => {
    console.log("Creating new object...");
    setUser({
      ...user,
      details: { ...user.details, city: "Pune" }, // ✅ New references
    });
  };

  console.log("Component rendered — city:", user.details.city);

  return (
    <div style={{ fontFamily: "monospace" }}>
      <h2>City: {user.details.city}</h2>
      <button onClick={mutateAndSetSameRef}>
        ❌ Mutate & set same reference
      </button>
      <button onClick={updateWithNewObject}>
        ✅ Create new object & update
      </button>
    </div>
  );
}
