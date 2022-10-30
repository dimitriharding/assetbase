import {
    useQuery,
    hashQueryKey,
    QueryClient,
    QueryClientProvider as QueryClientProviderBase,
} from "react-query";
import {
    getFirestore,
    onSnapshot,
    doc,
    collection,
    query,
    where,
    orderBy,
    getDoc,
    setDoc,
    updateDoc,
    addDoc,
    deleteDoc,
    serverTimestamp,
} from "firebase/firestore";
import { firebaseApp } from "./firebase";
import { uploadFile } from './storage'

// Initialize Firestore
const db = getFirestore(firebaseApp);

// React Query client
const client = new QueryClient();

/**** USERS ****/

// Subscribe to user data
// Note: This is called automatically in `auth.js` and data is merged into `auth.user`
export function useUser(uid) {
    // Manage data fetching with React Query: https://react-query.tanstack.com/overview
    return useQuery(
        // Unique query key: https://react-query.tanstack.com/guides/query-keys
        ["user", { uid }],
        // Query function that subscribes to data and auto-updates the query cache
        createQuery(() => doc(db, "users", uid)),
        // Only call query function if we have a `uid`
        { enabled: !!uid }
    );
}

// Fetch user data once (non-hook)
// Useful if you need to fetch data from outside of a component
export function getUser(uid) {
    return getDoc(doc(db, "users", uid)).then(format);
}

// Create a new user
export function createUser(uid, data) {
    return setDoc(doc(db, "users", uid), data, { merge: true });
}

// Update an existing user
export function updateUser(uid, data) {
    return updateDoc(doc(db, "users", uid), data);
}

/**** ITEMS ****/
/* Example query functions (modify to your needs) */

// Subscribe to item data
export function useItem(id) {
    return useQuery(
        ["item", { id }],
        createQuery(() => doc(db, "items", id)),
        { enabled: !!id }
    );
}

// Fetch item data once
export function useItemOnce(id) {
    return useQuery(
        ["item", { id }],
        // When fetching once there is no need to use `createQuery` to setup a subscription
        // Just fetch normally using `getDoc` so that we return a promise
        () => getDoc(doc(db, "items", id)).then(format),
        { enabled: !!id }
    );
}

// Subscribe to all items by owner
export function useItemsByOwner(owner) {
    return useQuery(
        ["items", { owner }],
        createQuery(() =>
            query(
                collection(db, "items"),
                where("owner", "==", owner),
                orderBy("createdAt", "desc")
            )
        ),
        { enabled: !!owner }
    );
}

// Create a new item
export function createItem(data) {
    return addDoc(collection(db, "items"), {
        ...data,
        createdAt: serverTimestamp(),
    });
}

// Update an item
export function updateItem(id, data) {
    return updateDoc(doc(db, "items", id), data);
}

// Delete an item
export function deleteItem(id) {
    return deleteDoc(doc(db, "items", id));
}

/** Manage Assets */
export function createAsset(data) {
    return addDoc(collection(db, "assets"), {
        ...data,
        createdAt: serverTimestamp(),
        createdBy: "admin",
    });
}

export function updateAsset(id, data) {
    return updateDoc(doc(db, "assets", id), data);
}

export function deleteAsset(id) {
    return deleteDoc(doc(db, "assets", id));
}

/** Subscribe to assets */
export function useAssets() {
    return useQuery(
        ["assets"],
        createQuery(() => collection(db, "assets")),
        { enabled: true }
    );
}

/** Manage Models */

export function createModel(data) {
    if (data.image) {
        return uploadFile(data.image).then((url) => {
            return addDoc(collection(db, "models"), {
                ...data,
                image: url,
                createdAt: serverTimestamp(),
                createdBy: "admin",
            });
        });
    } else {
        return addDoc(collection(db, "models"), {
            ...data,
            createdAt: serverTimestamp(),
            createdBy: "admin",
        });
    }
}

export function updateModel(id, data) {
    return updateDoc(doc(db, "models", id), data);
}

export function deleteModel(id) {
    return deleteDoc(doc(db, "models", id));
}

/** Subscribe to models */
export function useModels() {
    return useQuery(
        ["models"],
        createQuery(() => collection(db, "models")),
        { enabled: true }
    );
}

// Subscribe to a single model
export function useModel(id) {
    return useQuery(
        ["model", { id }],
        createQuery(() => doc(db, "models", id)),
        { enabled: !!id }
    );
}

/** Manage Manufactures */

export function createManufacture(data) {
    return addDoc(collection(db, "manufactures"), {
        ...data,
        createdAt: serverTimestamp(),
        createdBy: "admin",
    });
}

export function updateManufacture(id, data) {
    return updateDoc(doc(db, "manufactures", id), data);
}

export function deleteManufacture(id) {
    return deleteDoc(doc(db, "manufactures", id));
}

/** Subscribe to manufactures */
export function useManufactures() {
    return useQuery(
        ["manufactures"],
        createQuery(() => collection(db, "manufactures")),
        { enabled: true }
    );
}

// Subscribe to a single manufacture
export function useManufacture(id) {
    return useQuery(
        ["manufacture", { id }],
        createQuery(() => doc(db, "manufactures", id)),
        { enabled: !!id }
    );
}



/**** HELPERS ****/

export function useDocument(documentName) {
    return {
        create: (data) => addDoc(collection(db, documentName), {
            ...data,
            createdAt: serverTimestamp(),
            createdBy: "admin",
        }),
        update: (id, data) => updateDoc(doc(db, documentName, id), {
            ...data,
            updatedAt: serverTimestamp(),
            updatedBy: "admin",
        }),
        delete: (id) => deleteDoc(doc(db, documentName, id)),
        useList: () => useQuery(
            [documentName],
            createQuery(() => collection(db, documentName)),
            { enabled: true }
        ),
        useById: (id) => useQuery(
            [documentName, { id }],
            createQuery(() => doc(db, documentName, id)),
            { enabled: !!id }
        ),
    }
};

// Store Firestore unsubscribe functions
const unsubs = {};

function createQuery(getRef) {
    // Create a query function to pass to `useQuery`
    return async ({ queryKey }) => {
        let unsubscribe;
        let firstRun = true;
        // Wrap `onSnapshot` with a promise so that we can return initial data
        const data = await new Promise((resolve, reject) => {
            unsubscribe = onSnapshot(
                getRef(),
                // Success handler resolves the promise on the first run.
                // For subsequent runs we manually update the React Query cache.
                (response) => {
                    const data = format(response);
                    if (firstRun) {
                        firstRun = false;
                        resolve(data);
                    } else {
                        client.setQueryData(queryKey, data);
                    }
                },
                // Error handler rejects the promise on the first run.
                // We can't manually trigger an error in React Query, so on a subsequent runs we
                // invalidate the query so that it re-fetches and rejects if error persists.
                (error) => {
                    if (firstRun) {
                        firstRun = false;
                        reject(error);
                    } else {
                        client.invalidateQueries(queryKey);
                    }
                }
            );
        });

        // Unsubscribe from an existing subscription for this `queryKey` if one exists
        // Then store `unsubscribe` function so it can be called later
        const queryHash = hashQueryKey(queryKey);
        unsubs[queryHash] && unsubs[queryHash]();
        unsubs[queryHash] = unsubscribe;

        return data;
    };
}

// Automatically remove Firestore subscriptions when all observing components have unmounted
client.queryCache.subscribe(({ type, query }) => {
    if (
        type === "observerRemoved" &&
        query.getObserversCount() === 0 &&
        unsubs[query.queryHash]
    ) {
        // Call stored Firestore unsubscribe function
        unsubs[query.queryHash]();
        delete unsubs[query.queryHash];
    }
});

// Format Firestore response
function format(response) {
    // Converts doc into object that contains data and `doc.id`
    const formatDoc = (doc) => ({ id: doc.id, ...doc.data() });
    if (response.docs) {
        // Handle a collection of docs
        return response.docs.map(formatDoc);
    } else {
        // Handle a single doc
        return response.exists() ? formatDoc(response) : null;
    }
}

// React Query context provider that wraps our app
export function QueryClientProvider(props) {
    return (
        <QueryClientProviderBase client={client}>
            {props.children}
        </QueryClientProviderBase>
    );
}
