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
    // Log in with Firebase Authentication
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );

    const user = userCredential.user;

    // Find the user's name from Firestore
    const usersSnapshot = await getDocs(collection(db, "users"));

    let userName = "User";

    usersSnapshot.forEach((doc) => {
      const data = doc.data();
      if (data.uid === user.uid) {
        userName = data.name;
      }
    });

    // Personalized welcome message
    alert(`Welcome, ${userName}! Login successful.`);

    // Redirect to homepage
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
// =========================
// UPDATE HOMEPAGE NAVIGATION BASED ON LOGIN STATUS
// =========================
onAuthStateChanged(auth, (user) => {
  const loginNav = document.getElementById("loginNav");
  const signupNav = document.getElementById("signupNav");
  const welcomeNav = document.getElementById("welcomeNav");
  const logoutNav = document.getElementById("logoutNav");
  const userEmail = document.getElementById("userEmail");
  const adminNav = document.getElementById("adminNav");

  // Replace this with your own admin email
  const adminEmail = "learniokidslearning@gmail.com";

  if (loginNav && signupNav && welcomeNav && logoutNav && userEmail) {
    if (user) {
      // User is logged in
      loginNav.style.display = "none";
      signupNav.style.display = "none";
      welcomeNav.style.display = "inline-block";
      logoutNav.style.display = "inline-block";
      userEmail.textContent = user.email;

      // Show Admin link only for your email
      if (adminNav) {
        if (user.email === adminEmail) {
          adminNav.style.display = "inline-block";
        } else {
          adminNav.style.display = "none";
        }
      }
    } else {
      // User is logged out
      loginNav.style.display = "inline-block";
      signupNav.style.display = "inline-block";
      welcomeNav.style.display = "none";
      logoutNav.style.display = "none";
      userEmail.textContent = "";

      // Hide Admin link
      if (adminNav) {
        adminNav.style.display = "none";
      }
    }
  }
});
