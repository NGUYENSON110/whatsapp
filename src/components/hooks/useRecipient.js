import { useAuthState } from "react-firebase-hooks/auth"
import { auth, db } from "../config/firebase"
import { getRecipientEmail } from "../utils/getRecipientEmail"
import { collection, query, where } from "firebase/firestore"
import { useCollection } from "react-firebase-hooks/firestore"


export const useRecipient = (conversationUser) => {
    const [logginInUser, __loading, __error] = useAuthState(auth)

    // Lấy các email những người chat
    const recipientEmail = getRecipientEmail(conversationUser, logginInUser)
    console.log("ssss", recipientEmail)


    // Lấy avatar những người chat
    const queryGetRecipient = query(collection(db, 'users'), where('email', '==', recipientEmail || ""))
    const [recipientSnapshot, _loading, _error] = useCollection(queryGetRecipient)
    
    const recipient = recipientSnapshot?.docs[0]?.data() 
    // console.log("bbbb", queryGetRecipient)
    console.log("cccc", recipientSnapshot)

    return {
        recipient,
        recipientEmail
    }
}