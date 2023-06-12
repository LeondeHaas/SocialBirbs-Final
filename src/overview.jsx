import { getDocs, collection, databaseDoc, doc } from "firebase/firestore";
import { db } from "../firebase-config";

const [getTitle, setTitle] = useState("");
const [getTask, setTask] = useState("");
const [getStatus, setStatus] = useState("");
const [getTaskList, setTaskList] = useState([]);
const jobCollectionRef = collection(db, "tasks");

useEffect(() => {
  const getTasks = async () => {
    const data = await getDocs(jobCollectionRef);
    setTaskList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };
  getTasks();
}, []);

const createJob = async () => {
  await addDoc(jocCollecionRef, {
    title: getTitle,
    task: getTask,
    date: getDate,
    status: getStatus,
    author: { name: auth.currentUser.displayName, id: auth.currentUser.uid },
  });
  navigate("/");
};

useEffect(() => {
  const getTasks = async () => {
    const data = await getDocs(jobCollectionRef);
    setTaskList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };
  getTasks();
}, []);

const deletePost = async (id) => {
  const postDoc = doc(db, "tasks", id);
  await deleteDoc(postDoc);
};

const like = async (postId) => {
  const docRef = doc(db, "psosts", postId);
  await updatedoc(docRef, { likes: arrayUnion[credentials.user.uid] });
  getPosts();
};

//<button onclick[() => like(post.id) .../>
