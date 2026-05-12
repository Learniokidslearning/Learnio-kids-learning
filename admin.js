import { getStorage, ref, uploadBytes, getDownloadURL } 
from "https://www.gstatic.com/firebasejs/10.7.1/firebase-storage.js";

import { getFirestore, addDoc, collection } 
from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const storage = getStorage();
const db = getFirestore();
