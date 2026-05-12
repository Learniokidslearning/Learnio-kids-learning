// Firebase Imports
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    const user = userCredential.user;

    // Save additional information in Firestore
    await addDoc(collection(db, "users"), {
      uid: user.uid,
      name: name,
      email: email,
      createdAt: new Date().toISOString()
    });

    alert("Account created successfully!");
    window.location.href = "login.html";
  } catch (error) {
    alert("Signup Error: " + error.message);
    console.error(error);
  }
};

// =========================
// LOGIN FUNCTION
// =========================
window.loginUser = async function (event) {
  event.preventDefault();

  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;

  try {
    await signInWithEmailAndPassword(auth, email, password);

    alert("Login successful!");
    window.location.href = "index.html";
  } catch (error) {
    alert("Login Error: " + error.message);
    console.error(error);
  }
};

// =========================
// LOGOUT FUNCTION
// =========================
window.logoutUser = async function () {
  try {
    await signOut(auth);
    alert("Logged out successfully.");
    window.location.href = "index.html";
  } catch (error) {
    alert("Logout Error: " + error.message);
  }
};

// =========================
// SHOW USER NAME IN DASHBOARD
// =========================
onAuthStateChanged(auth, (user) => {
  const userInfo = document.getElementById("userInfo");

  if (userInfo) {
    if (user) {
      userInfo.textContent = `Welcome, ${user.email}`;
    } else {
      window.location.href = "login.html";
    }
  }
});
