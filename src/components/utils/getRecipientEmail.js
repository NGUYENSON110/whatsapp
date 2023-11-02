
export const getRecipientEmail = (conversation, logginInUser) => {
    console.log("aaaaaa",conversation )
    console.log("bbbbb",logginInUser )
    return  conversation.find(userEmail => userEmail !== logginInUser.email)
    // console.log("son1", aa)
}