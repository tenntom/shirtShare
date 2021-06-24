



useEffect(() => {
    const  theseOffers = trades.filter(trade => trade.shirt.userId === currentUserId)
    const theseAcceptedOffers = theseOffers.filter(trade => trade.timeAccepted !== 0)
    const theseOpenOffers = theseOffers.filter(trade => trade.timeAccepted === 0)
    setAcceptedOffers(theseAcceptedOffers)
    setOpenOffers(theseOpenOffers)
}, [trades])


useEffect(() => {
    const currentUserId = parseInt(localStorage.getItem("shirtshare_user"))
    getUserById(currentUserId)
    .then(() => {
    const currentUserShirts = user.shirts
    const  theseOffers = trades.filter(trade => {
        (currentUserShirts.find(shirt => shirt.id === trade.offerShirtId))
    })
    const theseAcceptedOffers = theseOffers.filter(trade => trade.timeAccepted !== 0)
    const theseOpenOffers = theseOffers.filter(trade => trade.timeAccepted === 0)
    setAcceptedOffers(theseAcceptedOffers)
    setOpenOffers(theseOpenOffers)
    )
}, [trades])

currentUserShirts = user.currentUserShirts